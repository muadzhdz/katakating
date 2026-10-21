/**
 * KATAKATING — Cloudflare Pages Functions API
 * Route: /api/*
 * Edge backend connected directly to Cloudflare D1 (SQLite)
 */

interface Env {
  DB: D1Database;
  ADMIN_KEY?: string;
}

function corsHeaders(origin: string = '*'): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data: any, status: number = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(),
      ...headers,
    },
  });
}

function errorResponse(message: string, status: number = 400): Response {
  return jsonResponse({ error: message, success: false }, status);
}

function isAdmin(request: Request, env: Env): boolean {
  const expectedKey = (env.ADMIN_KEY || '').trim();
  if (!expectedKey) return false;
  const adminHeader = (request.headers.get('x-admin-key') || '').trim();
  const authHeader = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  return adminHeader === expectedKey || authHeader === expectedKey;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  const pathname = url.pathname.replace(/\/+$/, '') || '/';

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request.headers.get('Origin') || '*'),
    });
  }

  try {
    // 1. Health Check
    if (pathname === '/api/health' || pathname === '/api') {
      return jsonResponse({ status: 'ok', service: 'katakating-pages-api', time: new Date().toISOString() });
    }

    // 2. Auth Login (Admin credentials verification)
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as any;
      const email = (body.email || '').trim().toLowerCase();
      const password = (body.password || '').trim();
      const expectedKey = (env.ADMIN_KEY || '').trim();

      if (email === 'katakating@gmail.com' && expectedKey && password === expectedKey) {
        return jsonResponse({
          success: true,
          user: {
            id: 'admin-katakating',
            email: 'katakating@gmail.com',
            role: 'admin',
            full_name: 'Admin KataKating',
          },
          token: expectedKey,
        });
      }
      return errorResponse('Kredensial admin tidak valid', 401);
    }

    // 3. GET /api/guides — List all approved guides
    if (pathname === '/api/guides' && method === 'GET') {
      const category = url.searchParams.get('category');
      let query = 'SELECT id, title, summary, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at FROM guides';
      const params: any[] = [];

      if (category && category !== 'all') {
        query += ' WHERE category = ?';
        params.push(category);
      }
      query += ' ORDER BY created_at DESC';

      const { results } = await env.DB.prepare(query).bind(...params).all();
      const parsed = (results || []).map((row: any) => {
        let tags = [];
        try {
          tags = typeof row.prodi_tags === 'string' ? JSON.parse(row.prodi_tags) : row.prodi_tags;
        } catch {
          tags = [row.category || 'praktikum'];
        }
        return {
          ...row,
          prodi_tags: Array.isArray(tags) ? tags : [tags],
          tags: Array.isArray(tags) ? tags : [tags],
          author: row.author_name,
          views: row.views_count,
          copies: row.copy_count,
          date: row.created_at ? row.created_at.split(' ')[0] : '2026-10-19',
        };
      });

      return jsonResponse(parsed, 200, {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      });
    }

    // 4. GET /api/guides/:id — Single guide with full markdown content
    if (pathname.startsWith('/api/guides/') && method === 'GET') {
      const id = pathname.replace('/api/guides/', '').trim();
      const row = await env.DB.prepare('SELECT * FROM guides WHERE id = ?').bind(id).first();

      if (!row) {
        return errorResponse('Naskah catatan tidak ditemukan', 404);
      }

      let tags = [];
      try {
        tags = typeof row.prodi_tags === 'string' ? JSON.parse(row.prodi_tags as string) : row.prodi_tags;
      } catch {
        tags = [row.category || 'praktikum'];
      }

      return jsonResponse({
        ...row,
        prodi_tags: Array.isArray(tags) ? tags : [tags],
        tags: Array.isArray(tags) ? tags : [tags],
        author: row.author_name,
        views: row.views_count,
        copies: row.copy_count,
        date: typeof row.created_at === 'string' ? row.created_at.split(' ')[0] : '2026-10-19',
      }, 200, {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      });
    }

    // 5. POST /api/guides/:id/view — Increment view counter
    if (pathname.startsWith('/api/guides/') && pathname.endsWith('/view') && method === 'POST') {
      const id = pathname.replace('/api/guides/', '').replace('/view', '').trim();
      await env.DB.prepare('UPDATE guides SET views_count = views_count + 1 WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true });
    }

    // 6. POST /api/guides/:id/copy — Increment copy counter
    if (pathname.startsWith('/api/guides/') && pathname.endsWith('/copy') && method === 'POST') {
      const id = pathname.replace('/api/guides/', '').replace('/copy', '').trim();
      await env.DB.prepare('UPDATE guides SET copy_count = copy_count + 1 WHERE id = ?').bind(id).run();
      return jsonResponse({ success: true });
    }

    // 7. Submissions: POST /api/submissions (Student Submission)
    if (pathname === '/api/submissions' && method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as any;
      const {
        title,
        author_name,
        author_npm,
        author_email,
        category,
        prodi_tags,
        semester,
        summary,
        content,
      } = body;

      if (!title || !author_name || !content) {
        return errorResponse('Judul, nama penulis, dan naskah konten wajib diisi');
      }

      const id = 'sub-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
      const tagsJson = JSON.stringify(Array.isArray(prodi_tags) ? prodi_tags : [prodi_tags || 'praktikum']);

      await env.DB.prepare(`
        INSERT INTO submissions (
          id, title, author_name, author_npm, author_email, category, prodi_tags, semester, summary, content, status, submitted_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', datetime('now'), datetime('now'))
      `).bind(
        id,
        title.trim(),
        author_name.trim(),
        (author_npm || '').trim(),
        (author_email || '').trim(),
        category || 'Umum',
        tagsJson,
        Number(semester) || 1,
        (summary || title).trim(),
        content.trim()
      ).run();

      return jsonResponse({ success: true, id, message: 'Draf naskah berhasil dikirim ke antrean redaksi' }, 201);
    }

    // 8. Submissions: GET /api/submissions (List Submissions for Admin)
    if (pathname === '/api/submissions' && method === 'GET') {
      const status = url.searchParams.get('status');
      let query = 'SELECT * FROM submissions';
      const params: any[] = [];

      if (status && status !== 'all') {
        query += ' WHERE status = ?';
        params.push(status);
      }
      query += ' ORDER BY submitted_at DESC';

      const { results } = await env.DB.prepare(query).bind(...params).all();
      const parsed = (results || []).map((row: any) => {
        let tags = [];
        try {
          tags = typeof row.prodi_tags === 'string' ? JSON.parse(row.prodi_tags) : row.prodi_tags;
        } catch {
          tags = [];
        }
        return {
          ...row,
          prodi_tags: tags,
          tags,
        };
      });

      return jsonResponse(parsed);
    }

    // 9. Submissions: POST /api/submissions/:id/approve (Admin Approve & Publish to Guides)
    if (pathname.startsWith('/api/submissions/') && pathname.endsWith('/approve') && method === 'POST') {
      if (!isAdmin(request, env)) {
        return errorResponse('Akses ditolak: Dibutuhkan kredensial administrator', 401);
      }

      const subId = pathname.replace('/api/submissions/', '').replace('/approve', '').trim();
      const sub = await env.DB.prepare('SELECT * FROM submissions WHERE id = ?').bind(subId).first() as any;

      if (!sub) {
        return errorResponse('Draf submission tidak ditemukan', 404);
      }

      let slug = slugify(sub.title);
      if (!slug) slug = 'catatan-' + Date.now().toString(36);

      const words = sub.title.trim().split(/\s+/);
      const initials = words.length >= 2
        ? (words[0][0] + words[1][0]).toUpperCase()
        : sub.title.substring(0, 3).toUpperCase();

      await env.DB.prepare(`
        INSERT INTO guides (
          id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, views_count, copy_count, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '#00ff66', 1, 0, datetime('now'), datetime('now'))
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          summary = excluded.summary,
          content = excluded.content,
          author_name = excluded.author_name,
          author_npm = excluded.author_npm,
          category = excluded.category,
          prodi_tags = excluded.prodi_tags,
          semester = excluded.semester,
          updated_at = datetime('now')
      `).bind(
        slug,
        sub.title,
        sub.summary || sub.title,
        sub.content,
        sub.author_name,
        sub.author_npm || '',
        sub.category || 'Praktikum',
        sub.prodi_tags || '[]',
        sub.semester || 1,
        initials
      ).run();

      await env.DB.prepare(`
        UPDATE submissions SET status = 'approved', updated_at = datetime('now') WHERE id = ?
      `).bind(subId).run();

      return jsonResponse({
        success: true,
        guide_id: slug,
        message: 'Draf naskah berhasil disetujui dan dipublikasikan',
      });
    }

    // 10. Submissions: POST /api/submissions/:id/reject (Admin Reject)
    if (pathname.startsWith('/api/submissions/') && pathname.endsWith('/reject') && method === 'POST') {
      if (!isAdmin(request, env)) {
        return errorResponse('Akses ditolak: Dibutuhkan kredensial administrator', 401);
      }

      const subId = pathname.replace('/api/submissions/', '').replace('/reject', '').trim();
      const body = (await request.json().catch(() => ({}))) as any;
      const notes = (body.notes || 'Draf belum memenuhi standar kurasi naskah').trim();

      await env.DB.prepare(`
        UPDATE submissions SET status = 'rejected', admin_notes = ?, updated_at = datetime('now') WHERE id = ?
      `).bind(notes, subId).run();

      return jsonResponse({ success: true, message: 'Draf berhasil ditolak dengan catatan' });
    }

    // 11. Submissions: DELETE /api/submissions/:id (Admin Delete)
    if (pathname.startsWith('/api/submissions/') && method === 'DELETE') {
      if (!isAdmin(request, env)) {
        return errorResponse('Akses ditolak: Dibutuhkan kredensial administrator', 401);
      }

      const subId = pathname.replace('/api/submissions/', '').trim();
      await env.DB.prepare('DELETE FROM submissions WHERE id = ?').bind(subId).run();
      return jsonResponse({ success: true, message: 'Draf berhasil dihapus dari antrean' });
    }

    // 12. Likes: GET /api/likes & POST /api/likes & DELETE /api/likes
    if (pathname === '/api/likes') {
      if (method === 'GET') {
        const guideId = url.searchParams.get('guide_id');
        const userId = url.searchParams.get('user_id');

        let count = 0;
        let userLiked = false;

        if (guideId) {
          const countRow = await env.DB.prepare('SELECT COUNT(*) as c FROM guide_likes WHERE guide_id = ?').bind(guideId).first() as any;
          count = countRow?.c || 0;

          if (userId) {
            const uRow = await env.DB.prepare('SELECT id FROM guide_likes WHERE guide_id = ? AND user_id = ?').bind(guideId, userId).first();
            userLiked = Boolean(uRow);
          }
        }
        return jsonResponse({ count, userLiked });
      }

      if (method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as any;
        const { guide_id, user_id } = body;
        if (!guide_id || !user_id) return errorResponse('guide_id dan user_id diperlukan');

        const id = `like-${user_id}-${guide_id}`;
        await env.DB.prepare(`
          INSERT INTO guide_likes (id, user_id, guide_id, created_at)
          VALUES (?, ?, ?, datetime('now'))
          ON CONFLICT(user_id, guide_id) DO NOTHING
        `).bind(id, user_id, guide_id).run();

        return jsonResponse({ success: true });
      }

      if (method === 'DELETE') {
        const guideId = url.searchParams.get('guide_id');
        const userId = url.searchParams.get('user_id');
        if (!guideId || !userId) return errorResponse('guide_id dan user_id diperlukan');

        await env.DB.prepare('DELETE FROM guide_likes WHERE guide_id = ? AND user_id = ?').bind(guideId, userId).run();
        return jsonResponse({ success: true });
      }
    }

    // 13. Bookmarks: GET /api/bookmarks & POST /api/bookmarks & DELETE /api/bookmarks
    if (pathname === '/api/bookmarks') {
      if (method === 'GET') {
        const userId = url.searchParams.get('user_id');
        if (!userId) return errorResponse('user_id diperlukan');

        const { results } = await env.DB.prepare(`
          SELECT g.id, g.title, g.summary, g.category, g.author_name, b.created_at as saved_at
          FROM bookmarks b
          JOIN guides g ON b.guide_id = g.id
          WHERE b.user_id = ?
          ORDER BY b.created_at DESC
        `).bind(userId).all();

        return jsonResponse(results || []);
      }

      if (method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as any;
        const { guide_id, user_id } = body;
        if (!guide_id || !user_id) return errorResponse('guide_id dan user_id diperlukan');

        const id = `bm-${user_id}-${guide_id}`;
        await env.DB.prepare(`
          INSERT INTO bookmarks (id, user_id, guide_id, created_at)
          VALUES (?, ?, ?, datetime('now'))
          ON CONFLICT(user_id, guide_id) DO NOTHING
        `).bind(id, user_id, guide_id).run();

        return jsonResponse({ success: true });
      }

      if (method === 'DELETE') {
        const guideId = url.searchParams.get('guide_id');
        const userId = url.searchParams.get('user_id');
        if (!guideId || !userId) return errorResponse('guide_id dan user_id diperlukan');

        await env.DB.prepare('DELETE FROM bookmarks WHERE guide_id = ? AND user_id = ?').bind(guideId, userId).run();
        return jsonResponse({ success: true });
      }
    }

    // 14. Profiles: GET /api/profiles/:id & PUT /api/profiles/:id
    if (pathname.startsWith('/api/profiles/')) {
      const profileId = pathname.replace('/api/profiles/', '').trim();
      if (method === 'GET') {
        const row = await env.DB.prepare('SELECT * FROM profiles WHERE id = ? OR email = ?').bind(profileId, profileId).first();
        if (!row) return errorResponse('Profil tidak ditemukan', 404);
        return jsonResponse(row);
      }

      if (method === 'PUT') {
        const body = (await request.json().catch(() => ({}))) as any;
        await env.DB.prepare(`
          INSERT INTO profiles (id, email, full_name, avatar_url, github_username, nim, prodi, bio, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
          ON CONFLICT(id) DO UPDATE SET
            full_name = coalesce(excluded.full_name, profiles.full_name),
            avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url),
            github_username = coalesce(excluded.github_username, profiles.github_username),
            nim = coalesce(excluded.nim, profiles.nim),
            prodi = coalesce(excluded.prodi, profiles.prodi),
            bio = coalesce(excluded.bio, profiles.bio),
            updated_at = datetime('now')
        `).bind(
          profileId,
          body.email || `${profileId}@katakating.id`,
          body.full_name || '',
          body.avatar_url || '',
          body.github_username || '',
          body.nim || '',
          body.prodi || '',
          body.bio || ''
        ).run();
        return jsonResponse({ success: true });
      }
    }

    return errorResponse('Endpoint API tidak ditemukan', 404);
  } catch (err: any) {
    console.error('[Pages API Error]:', err);
    return errorResponse(err.message || 'Terjadi kesalahan internal pada Pages Function', 500);
  }
};
