/**
 * ══════════════════════════════════════════════════════════════════
 * [>] KATAKATING — THE BRAIN COCKPIT
 * Pure Vanilla 2D Canvas Knowledge Graph (Hermes Star Map Architecture)
 * Luminous Celestial Particles Engine, Radial-Time Orbits, 0% CPU Idle
 * ══════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── 1. Hermes Star Map Constants & Layout State ──
  var R_ORGAN = 0.34;
  var R_IN = 0.52;
  var R_OUT = 0.92;

  var L = {
    pos: {},
    rings: [],
    targetAngle: {},
    sectorWidth: {},
    adj: {},
    edgesByNode: {},
    minT: 0,
    maxT: 0,
    phase: 0,
    maxSpeed: 1,
    seeded: false,
    replaySeed: false,
    width: 0,
    height: 0
  };

  // Graph Data
  var rawArticles = [];
  var allNodes = [];
  var allEdges = [];

  // Interaction & Filter States
  var hoverId = '';
  var selectedId = '';
  var hiddenKinds = {
    cortex: false,
    organ: false,
    memory: false,
    author: false
  };
  var searchQuery = '';
  var activeWorkspaceCategory = '';

  // Animation & Replay Growth
  var revealT = 1.0;
  var playing = false;
  var layoutLive = true;
  var animFrameId = null;
  var lastFrameTime = performance.now();

  // Quantum Spiral Unfurl Animation (Galactic Fibonacci Spiral)
  var bloomActive = true;
  var bloomStartTime = 0;
  var BLOOM_DURATION = 3000;

  // Canvas & Camera State (Pan & Zoom)
  var canvas = null;
  var ctx = null;
  var dpr = window.devicePixelRatio || 1;
  var camera = {
    panX: 0,
    panY: 0,
    zoom: 1.0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    hasMoved: false
  };

  // ── 2. Mathematical & Hash Helpers ──
  function stableUnit(text) {
    var hash = 2166136261;
    var str = String(text || '');
    for (var i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    hash += hash << 13;
    hash ^= hash >>> 7;
    hash += hash << 3;
    hash ^= hash >>> 17;
    hash += hash << 5;
    return (hash >>> 0) / 4294967295;
  }

  function angleDelta(target, current) {
    var delta = target - current;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    return delta;
  }

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isLightTheme() {
    return document.documentElement.classList.contains('light') ||
      document.documentElement.getAttribute('data-theme') === 'light';
  }

  function getPalette() {
    var light = isLightTheme();
    return {
      light: light,
      bg: light ? '#ffffff' : '#0e1011',
      fg: light ? '#0f172a' : '#e5e7eb',
      muted: light ? '#64748b' : '#9ca3af',
      line: light ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)',
      ringLine: light ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.045)',
      ringText: light ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.22)',
      
      // Cyber Terminal Accent: 100% Emerald Green in Light Mode, Neon Green in Dark Mode
      accent: light ? '#16a34a' : '#00ff66',
      accentGlow: light ? 'rgba(22, 163, 74, 0.50)' : 'rgba(0, 255, 102, 0.60)',
      
      // Option A: Pure Monochrome Base (White in Dark Mode, Deep Slate in Light Mode)
      nodeBase: light ? '#0f172a' : '#ffffff',
      nodeAura: light ? 'rgba(15, 23, 42, ' : 'rgba(255, 255, 255, ',
      
      edgeIdle: light ? 'rgba(15, 23, 42, 0.085)' : 'rgba(255, 255, 255, 0.075)',
      edgeActive: light ? '#16a34a' : '#00ff66',
      edgeDimmed: light ? 'rgba(0, 0, 0, 0.025)' : 'rgba(255, 255, 255, 0.02)'
    };
  }

  function getEdgeColor(edgeType, pal) {
    return pal.edgeIdle;
  }

  function nodeRadius(n) {
    if (n.id === 'katakating/core') return 16;
    if (n.t === 'organ') return 11;
    if (n.t === 'author') return 7.5;
    return Math.max(5.5, Math.min(8.5, 5 + (n.deg || 0) * 0.4));
  }

  function isNodeVisible(n) {
    if (hiddenKinds[n.t]) return false;
    if (activeWorkspaceCategory && n.category !== activeWorkspaceCategory && n.id !== 'katakating/core') {
      return false;
    }
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      var match = (n.title && n.title.toLowerCase().indexOf(q) !== -1) ||
                  (n.author && n.author.toLowerCase().indexOf(q) !== -1) ||
                  (n.category && n.category.toLowerCase().indexOf(q) !== -1) ||
                  (n.tags && n.tags.some(function(t) { return t.toLowerCase().indexOf(q) !== -1; }));
      if (!match) return false;
    }
    if (playing && n.t === 'memory') {
      return (n.tsNorm || 0) <= revealT;
    }
    return true;
  }

  // ── 3. Data Loading & Graph Construction ──
  async function loadData() {
    try {
      var res = await fetch('articles/articles.json');
      if (!res.ok) throw new Error('Gagal memuat catalog artikel');
      rawArticles = await res.json();

      var auth = window.KataKatingAuth || window.ReadmeAuth;
      var sb = auth ? auth.client : null;
      if (sb) {
        try {
          var dbRes = await sb
            .from('guides')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

          var dbGuides = dbRes.data;
          if (dbGuides && dbGuides.length > 0) {
            var existingSlugs = new Set(rawArticles.map(function(a) { return a.id; }));
            dbGuides.forEach(function(g) {
              if (!existingSlugs.has(g.slug)) {
                rawArticles.push({
                  id: g.slug,
                  title: g.title,
                  category: g.category || 'Sains & Teknologi',
                  author: g.author || 'Mahasiswa Boash',
                  date: g.created_at ? g.created_at.slice(0, 10) : '2026-09-20',
                  excerpt: g.summary || g.excerpt || '',
                  readTime: (g.reading_time || 5) + ' mnt',
                  tags: Array.isArray(g.tags) ? g.tags : ['jurnal']
                });
              }
            });
          }
        } catch (dbErr) {
          console.warn('[>] Supabase guides fallback:', dbErr.message);
        }
      }

      buildGraph();
      initCockpitUI();
      resizeCanvas();
      syncGraph(L.width, L.height);
      triggerBloom();
      startLoop();

    } catch (err) {
      console.error('[>] Error loading graph data:', err);
      var hud = document.getElementById('brain-canvas-hud');
      if (hud) hud.textContent = 'GAGAL MEMUAT DATA: ' + err.message;
    }
  }

  function buildGraph() {
    var nodes = [];
    var edges = [];
    var categoryMap = new Map();
    var authorMap = new Map();

    // Core Knowledge Hub Root
    nodes.push({
      id: 'katakating/core',
      t: 'cortex',
      title: 'KATAKATING',
      author: 'Core Brain',
      category: 'Root Knowledge Hub',
      excerpt: 'Pusat integrasi jejaring memori keilmuan dan repositori naskah akademik Universitas Boash.',
      tags: ['core', 'root', 'knowledge-hub'],
      ts: '2026-09-01T00:00:00Z',
      deg: 0
    });

    rawArticles.forEach(function(a) {
      var cat = a.category || 'Teknologi Informasi';
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat).push(a);

      var auth = a.author || 'Mahasiswa Boash';
      if (!authorMap.has(auth)) authorMap.set(auth, []);
      authorMap.get(auth).push(a);
    });

    // Organs (Categories)
    categoryMap.forEach(function(arts, catName) {
      var organId = 'organ/' + slugify(catName);
      nodes.push({
        id: organId,
        t: 'organ',
        title: catName,
        name: catName,
        category: catName,
        articleCount: arts.length,
        excerpt: 'Klaster rumpun keilmuan ' + catName + ' mengindeks ' + arts.length + ' publikasi.',
        tags: [slugify(catName), 'rumpun'],
        ts: '2026-09-02T00:00:00Z',
        deg: arts.length + 1
      });

      edges.push({
        s: 'katakating/core',
        d: organId,
        t: 'organ',
        why: 'Rumpun keilmuan primer dalam repositori Katakating'
      });
    });

    // Memories (Articles)
    rawArticles.forEach(function(a) {
      var articleId = 'article/' + a.id;
      var catId = 'organ/' + slugify(a.category || 'Teknologi Informasi');
      var authorId = 'author/' + slugify(a.author || 'Mahasiswa Boash');

      nodes.push({
        id: articleId,
        t: 'memory',
        title: a.title,
        author: a.author || 'Anonim',
        category: a.category || 'Teknologi Informasi',
        excerpt: a.excerpt || '',
        tags: Array.isArray(a.tags) ? a.tags : [],
        readTime: a.readTime || '5 mnt',
        slug: a.id,
        ts: (a.date || '2026-09-20') + 'T12:00:00Z',
        deg: 0
      });

      edges.push({
        s: catId,
        d: articleId,
        t: 'category',
        why: 'Artikel resmi di bawah rumpun ' + a.category
      });

      edges.push({
        s: articleId,
        d: authorId,
        t: 'authored',
        why: 'Dipublikasikan dan diverifikasi oleh ' + a.author
      });
    });

    // Authors
    authorMap.forEach(function(arts, authName) {
      var authorId = 'author/' + slugify(authName);
      nodes.push({
        id: authorId,
        t: 'author',
        title: authName,
        name: authName,
        author: authName,
        articleCount: arts.length,
        excerpt: 'Kontributor aktif dengan ' + arts.length + ' naskah publikasi terindeks.',
        tags: ['kontributor', slugify(authName)],
        ts: '2026-09-03T00:00:00Z',
        deg: arts.length
      });
    });

    // Shared tags between articles
    for (var i = 0; i < rawArticles.length; i++) {
      for (var j = i + 1; j < rawArticles.length; j++) {
        var a1 = rawArticles[i];
        var a2 = rawArticles[j];
        if (!a1.tags || !a2.tags) continue;
        var common = a1.tags.filter(function(t) { return a2.tags.indexOf(t) !== -1; });
        if (common.length > 0) {
          edges.push({
            s: 'article/' + a1.id,
            d: 'article/' + a2.id,
            t: 'shares_tag',
            why: 'Korelasi topik riset: #' + common.join(', #')
          });
        }
      }
    }

    allNodes = nodes;
    allEdges = edges;
  }

  // ── 4. SIA Hermes Star Map Layout Engine ──
  function targetRadius(n, half) {
    if (n.id === 'katakating/core') return 0;
    if (n.t === 'organ') return R_ORGAN * half;
    if (n.t === 'author') return (R_OUT + 0.06) * half;
    return (R_IN + (R_OUT - R_IN) * (n.tsNorm || 0)) * half;
  }

  function triggerBloom() {
    bloomActive = true;
    bloomStartTime = performance.now();
    layoutLive = true;
  }

  // Quantum Spiral Unfurl: Elegant logarithmic swirl expanding from core singularity
  function getVisualPos(id, now) {
    var p = L.pos[id];
    if (!p) return null;
    if (!bloomActive) return p;

    var curTime = now || performance.now();
    var elapsed = curTime - bloomStartTime;
    var tNorm = Math.max(0, elapsed / BLOOM_DURATION);
    if (tNorm >= 1.0) {
      return p;
    }

    var w = L.width || (canvas ? canvas.width / dpr : 1200);
    var h = L.height || (canvas ? canvas.height / dpr : 800);
    var cx = w / 2, cy = h / 2;

    if (id === 'katakating/core') {
      return { x: cx, y: cy, alpha: 1.0, scale: 1.0 };
    }

    var dx = p.x - cx;
    var dy = p.y - cy;
    var targetDist = Math.sqrt(dx * dx + dy * dy);
    var targetAngle = Math.atan2(dy, dx);

    // Hierarchical stagger: core -> organ -> author -> memory
    var node = getNodeById(id);
    var delay = 0.04;
    if (node && node.t === 'organ') {
      delay = 0.02 + stableUnit('blmO:' + id) * 0.08;
    } else if (node && node.t === 'author') {
      delay = 0.10 + stableUnit('blmA:' + id) * 0.12;
    } else {
      delay = 0.06 + stableUnit('blmM:' + id) * 0.22;
    }

    // Nodes reach target orbit around tNorm = 0.85 (1700ms), giving 300ms calm lock
    var endT = 0.85;
    var denom = Math.max(0.12, endT - delay);
    var localT = Math.max(0, Math.min(1.0, (tNorm - delay) / denom));

    if (localT <= 0) {
      return { x: cx, y: cy, alpha: 0, scale: 0 };
    }

    // Physical motion:
    // 1. Radius expands with smooth cubic deceleration
    var easedR = 1.0 - Math.pow(1.0 - localT, 3.2);
    var curDist = targetDist * easedR;

    // 2. Angular swirl (Fibonacci Galactic Spiral): ~207 deg arc gently unwinding to 0
    var spinAmount = 1.15 * Math.PI;
    var angleOffset = spinAmount * Math.pow(1.0 - localT, 2.2);
    var curAngle = targetAngle - angleOffset;

    return {
      x: cx + Math.cos(curAngle) * curDist,
      y: cy + Math.sin(curAngle) * curDist,
      alpha: Math.min(1.0, localT * 2.5),
      scale: 0.35 + 0.65 * (1.0 - Math.pow(1.0 - localT, 2.0))
    };
  }

  function syncGraph(w, h) {
    if (!allNodes.length || w <= 0 || h <= 0) return;
    var cx = w / 2, cy = h / 2, half = Math.min(w, h) / 2;
    var i, n;

    if (L.seeded && L.width > 0 && L.height > 0 && (L.width !== w || L.height !== h)) {
      var oldCx = L.width / 2, oldCy = L.height / 2;
      var oldHalf = Math.min(L.width, L.height) / 2;
      var scale = oldHalf > 0 ? half / oldHalf : 1;
      for (var oldId in L.pos) {
        L.pos[oldId].x = cx + (L.pos[oldId].x - oldCx) * scale;
        L.pos[oldId].y = cy + (L.pos[oldId].y - oldCy) * scale;
        L.pos[oldId].vx *= scale;
        L.pos[oldId].vy *= scale;
      }
    }
    L.width = w; L.height = h;

    // Normalize timestamps
    var minT = Infinity, maxT = -Infinity;
    for (i = 0; i < allNodes.length; i++) {
      n = allNodes[i];
      if (n.t === 'organ' || n.id === 'katakating/core') continue;
      var t = Date.parse(n.ts);
      if (t > 0) { if (t < minT) minT = t; if (t > maxT) maxT = t; }
    }
    if (!isFinite(minT)) { minT = Date.now() - 86400000; maxT = Date.now(); }
    if (maxT - minT < 60000) minT = maxT - 60000;
    L.minT = minT; L.maxT = maxT;

    for (i = 0; i < allNodes.length; i++) {
      n = allNodes[i];
      if (n.t === 'organ' || n.id === 'katakating/core') { n.tsNorm = 0; continue; }
      var tt = Date.parse(n.ts);
      n.tsNorm = tt > 0 ? (tt - minT) / (maxT - minT) : 0;
    }

    // Concentric day rings
    L.rings = [];
    var DAY = 86400000;
    var firstDay = Math.ceil(minT / DAY) * DAY;
    var days = [];
    for (var d = firstDay; d <= maxT; d += DAY) days.push(d);
    var step = Math.max(1, Math.ceil(days.length / 7));
    for (i = 0; i < days.length; i += step) {
      var frac = (days[i] - minT) / (maxT - minT);
      L.rings.push({
        r: (R_IN + (R_OUT - R_IN) * frac) * half,
        label: new Date(days[i]).toISOString().substring(5, 10)
      });
    }

    // Adjacency and edges by node
    L.adj = {}; L.edgesByNode = {};
    for (i = 0; i < allEdges.length; i++) {
      var e = allEdges[i];
      if (!L.adj[e.s]) L.adj[e.s] = {};
      if (!L.adj[e.d]) L.adj[e.d] = {};
      L.adj[e.s][e.d] = true;
      L.adj[e.d][e.s] = true;
      if (!L.edgesByNode[e.s]) L.edgesByNode[e.s] = [];
      if (!L.edgesByNode[e.d]) L.edgesByNode[e.d] = [];
      L.edgesByNode[e.s].push({ other: e.d, type: e.t, why: e.why || '', out: true });
      L.edgesByNode[e.d].push({ other: e.s, type: e.t, why: e.why || '', out: false });
    }

    // Degree calculation
    for (i = 0; i < allNodes.length; i++) {
      allNodes[i].deg = L.edgesByNode[allNodes[i].id] ? L.edgesByNode[allNodes[i].id].length : 0;
    }

    // Source sectors for organs
    var organs = allNodes.filter(function(x) {
      return x.t === 'organ' && x.id !== 'katakating/core';
    }).sort(function(a, b) {
      return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
    });

    var branchNodes = {};
    for (i = 0; i < organs.length; i++) branchNodes[organs[i].id] = [];
    var unownedNodes = [];

    for (i = 0; i < allNodes.length; i++) {
      n = allNodes[i];
      if (n.id === 'katakating/core' || n.t === 'organ') continue;
      var organNbrs = [];
      var linked = L.edgesByNode[n.id] || [];
      for (var ni = 0; ni < linked.length; ni++) {
        var otherNode = getNodeById(linked[ni].other);
        if (otherNode && otherNode.t === 'organ') organNbrs.push(otherNode.id);
      }
      organNbrs.sort();
      if (organNbrs.length) branchNodes[organNbrs[0]].push(n);
      else unownedNodes.push(n);
    }

    var organWeight = {}, totalWeight = 0;
    for (i = 0; i < organs.length; i++) {
      var oId = organs[i].id;
      organWeight[oId] = branchNodes[oId].length + 1;
      totalWeight += organWeight[oId];
    }

    var sectorCursor = -Math.PI / 2;
    for (i = 0; i < organs.length; i++) {
      oId = organs[i].id;
      var ownedWidth = totalWeight > 0 ? (2 * Math.PI * organWeight[oId] / totalWeight) : (2 * Math.PI / organs.length);
      L.sectorWidth[oId] = ownedWidth;
      L.targetAngle[oId] = sectorCursor + ownedWidth / 2;
      sectorCursor += ownedWidth;
    }

    function stableOrder(a, b) {
      var ah = stableUnit('order:' + a.id);
      var bh = stableUnit('order:' + b.id);
      if (ah !== bh) return ah - bh;
      return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
    }

    for (i = 0; i < organs.length; i++) {
      oId = organs[i].id;
      var branch = branchNodes[oId];
      branch.sort(stableOrder);
      if (!branch.length) continue;
      var branchWidth = L.sectorWidth[oId] * 0.88;
      var branchStart = L.targetAngle[oId] - branchWidth / 2;
      var branchSlot = branchWidth / branch.length;
      for (var bi = 0; bi < branch.length; bi++) {
        var jitter = (stableUnit('jitter:' + branch[bi].id) - 0.5) * branchSlot * 0.30;
        L.targetAngle[branch[bi].id] = branchStart + branchSlot * (bi + 0.5) + jitter;
      }
    }

    unownedNodes.sort(stableOrder);
    var unownedSlot = 2 * Math.PI / Math.max(1, unownedNodes.length);
    for (i = 0; i < unownedNodes.length; i++) {
      var freeJitter = (stableUnit('free:' + unownedNodes[i].id) - 0.5) * unownedSlot * 0.30;
      L.targetAngle[unownedNodes[i].id] = -Math.PI / 2 + unownedSlot * (i + 0.5) + freeJitter;
    }

    var live = {};
    for (i = 0; i < allNodes.length; i++) {
      n = allNodes[i];
      live[n.id] = true;
      if (L.pos[n.id]) continue;
      var x, y;
      if (n.id === 'katakating/core') {
        x = cx; y = cy;
      } else if (n.t === 'organ') {
        var ang = L.targetAngle[n.id];
        x = cx + Math.cos(ang) * R_ORGAN * half;
        y = cy + Math.sin(ang) * R_ORGAN * half;
      } else {
        var a2 = L.targetAngle[n.id] || 0;
        var r0 = L.replaySeed ? (R_ORGAN * half + (stableUnit('radius:' + n.id) - 0.5) * 18) : targetRadius(n, half);
        x = cx + Math.cos(a2) * r0;
        y = cy + Math.sin(a2) * r0;
      }
      L.pos[n.id] = { x: x, y: y, vx: 0, vy: 0 };
    }

    for (var k in L.pos) if (!live[k]) delete L.pos[k];
    L.replaySeed = false;
    L.seeded = true;
    layoutLive = true;
  }

  function getNodeById(id) {
    for (var i = 0; i < allNodes.length; i++) {
      if (allNodes[i].id === id) return allNodes[i];
    }
    return null;
  }

  // Physics Simulation Step
  function step(w, h, dtMs) {
    var total = (typeof dtMs === 'number' && dtMs > 0) ? Math.min(6.25, dtMs / 40) : 1;
    var parts = Math.max(1, Math.ceil(total - 1e-9));
    L.maxSpeed = 0;
    for (var k = 0; k < parts; k++) {
      var peak = stepOnce(w, h, total / parts);
      if (peak > L.maxSpeed) L.maxSpeed = peak;
    }
  }

  function stepOnce(w, h, s) {
    var damp = Math.pow(0.82, s);
    var maxSpeed = 0;
    if (!allNodes.length || !L.seeded) return 0;
    var cx = w / 2, cy = h / 2, half = Math.min(w, h) / 2;
    var i, j, a, b, dx, dy, d2, d, f;
    var K_REP = 760, K_SPRING = 0.009, REST = 44;
    var K_RAD = 0.085, K_ANGLE = 0.032, K_ORGAN = 0.16;

    var count = allNodes.length;
    var active = new Array(count), pos = new Array(count);
    var index = {};

    for (i = 0; i < count; i++) {
      var n = allNodes[i];
      index[n.id] = i;
      pos[i] = L.pos[n.id] || null;
      active[i] = isNodeVisible(n);
    }

    // Repulsion
    for (i = 0; i < count; i++) {
      if (!active[i]) continue;
      a = pos[i]; if (!a) continue;
      for (j = i + 1; j < count; j++) {
        if (!active[j]) continue;
        b = pos[j]; if (!b) continue;
        dx = a.x - b.x; dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 > 26000) continue;
        if (d2 < 1) {
          d2 = 1;
          var nudge = stableUnit(allNodes[i].id + '|' + allNodes[j].id) * 2 * Math.PI;
          dx = Math.cos(nudge); dy = Math.sin(nudge);
        }
        f = K_REP / d2;
        d = Math.sqrt(d2);
        a.vx += (dx / d) * f * s; a.vy += (dy / d) * f * s;
        b.vx -= (dx / d) * f * s; b.vy -= (dy / d) * f * s;
      }
    }

    // Springs
    for (i = 0; i < allEdges.length; i++) {
      var e = allEdges[i];
      var si = index[e.s], di = index[e.d];
      if (si === undefined || di === undefined || !active[si] || !active[di]) continue;
      a = pos[si]; b = pos[di];
      if (!a || !b) continue;
      dx = b.x - a.x; dy = b.y - a.y;
      d = Math.sqrt(dx * dx + dy * dy) || 1;
      f = K_SPRING * (d - REST);
      a.vx += (dx / d) * f * s; a.vy += (dy / d) * f * s;
      b.vx -= (dx / d) * f * s; b.vy -= (dy / d) * f * s;
    }

    // Tethers & bounds
    for (i = 0; i < count; i++) {
      n = allNodes[i];
      a = pos[i]; if (!a) continue;
      if (!active[i]) { a.vx = 0; a.vy = 0; continue; }

      if (n.id === 'katakating/core') {
        a.x = cx; a.y = cy; a.vx = 0; a.vy = 0;
        continue;
      } else if (n.t === 'organ') {
        var organAngle = L.targetAngle[n.id] || 0;
        var organX = cx + Math.cos(organAngle) * R_ORGAN * half;
        var organY = cy + Math.sin(organAngle) * R_ORGAN * half;
        a.vx += (organX - a.x) * K_ORGAN * s;
        a.vy += (organY - a.y) * K_ORGAN * s;
      } else {
        dx = a.x - cx; dy = a.y - cy;
        var r = Math.sqrt(dx * dx + dy * dy) || 1;
        var want = targetRadius(n, half);
        a.vx += (dx / r) * (want - r) * K_RAD * s;
        a.vy += (dy / r) * (want - r) * K_RAD * s;
        var turn = angleDelta(L.targetAngle[n.id] || 0, Math.atan2(dy, dx)) * r * K_ANGLE;
        a.vx += (-dy / r) * turn * s;
        a.vy += (dx / r) * turn * s;
      }

      a.vx *= damp; a.vy *= damp;
      var vm = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      if (vm > 6) { a.vx *= 6 / vm; a.vy *= 6 / vm; }
      if (vm > maxSpeed) maxSpeed = vm;
      a.x += a.vx * s; a.y += a.vy * s;

      var m = Math.max(12, nodeRadius(n) + 6);
      if (a.x < m) a.x = m; if (a.x > w - m) a.x = w - m;
      if (a.y < m) a.y = m; if (a.y > h - m) a.y = h - m;
    }

    L.phase += 0.03 * s;
    return maxSpeed;
  }

  function breathe(dtMs) {
    L.phase += 0.03 * ((typeof dtMs === 'number' && dtMs > 0) ? dtMs / 40 : 1);
  }

  function settled() {
    return (L.maxSpeed || 0) < 0.2;
  }

  // ── 5. Label Candidates & Collision Avoidance ──
  function labelCandidates(x, y, cx, cy, nodeR, labelW, labelH) {
    var dx = x - cx, dy = y - cy;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var ux = distance > 0 ? dx / distance : 0;
    var uy = distance > 0 ? dy / distance : -1;
    var tx = -uy, ty = ux;
    var radial = nodeR + labelH * 0.5 + 7;
    var diagonal = labelW * 0.30 + nodeR + 5;
    var side = labelW * 0.5 + nodeR + 7;

    return [
      { x: x + ux * radial, y: y + uy * radial },
      { x: x + ux * radial + tx * diagonal, y: y + uy * radial + ty * diagonal },
      { x: x + ux * radial - tx * diagonal, y: y + uy * radial - ty * diagonal },
      { x: x + tx * side, y: y + ty * side },
      { x: x - tx * side, y: y - ty * side },
      { x: x - ux * radial, y: y - uy * radial },
      { x: x, y: y - nodeR - labelH * 0.5 - 6 },
      { x: x, y: y + nodeR + labelH * 0.5 + 6 }
    ];
  }

  function overlaps(left, right, top, bottom, rect, padding) {
    return !(right + padding < rect.left ||
             left - padding > rect.right ||
             bottom + padding < rect.top ||
             top - padding > rect.bottom);
  }

  // ── 6. Luminous Celestial Particles Canvas Painting (Option A: Pure Sia Monochrome) ──
  function render(now) {
    if (!ctx || !canvas) return;
    now = now || performance.now();
    var w = canvas.width / dpr;
    var h = canvas.height / dpr;
    var pal = getPalette();

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Apply Camera Transform
    var cx = w / 2, cy = h / 2;
    ctx.translate(camera.panX + cx, camera.panY + cy);
    ctx.scale(camera.zoom, camera.zoom);
    ctx.translate(-cx, -cy);

    // 0. Ambient Cosmic Stardust Particles
    var dustCount = 50;
    for (var sIdx = 0; sIdx < dustCount; sIdx++) {
      var dAngle = stableUnit('dustA:' + sIdx) * 2 * Math.PI;
      var dRadius = (0.2 + 0.8 * stableUnit('dustR:' + sIdx)) * Math.min(w, h) * 0.55;
      var dx = cx + Math.cos(dAngle) * dRadius;
      var dy = cy + Math.sin(dAngle) * dRadius;
      var dSize = 0.8 + stableUnit('dustS:' + sIdx) * 1.4;
      var shimmer = 0.2 + 0.25 * Math.sin(L.phase * 1.5 + sIdx);
      ctx.fillStyle = pal.light ? 'rgba(0, 0, 0, ' + (shimmer * 0.3) + ')' : 'rgba(255, 255, 255, ' + shimmer + ')';
      ctx.beginPath();
      ctx.arc(dx, dy, dSize, 0, 2 * Math.PI);
      ctx.fill();
    }

    var eff = hoverId || selectedId;
    var nbrs = eff ? (L.adj[eff] || {}) : null;

    // 1. Concentric Day Rings
    var rings = L.rings;
    ctx.lineWidth = 1;
    for (var rIdx = 0; rIdx < rings.length; rIdx++) {
      ctx.strokeStyle = pal.ringLine;
      ctx.beginPath();
      ctx.arc(cx, cy, rings[rIdx].r, 0, 2 * Math.PI);
      ctx.stroke();
    }
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = pal.ringText;
    for (rIdx = 0; rIdx < rings.length; rIdx++) {
      ctx.fillText(rings[rIdx].label, cx, cy - rings[rIdx].r - 4);
    }

    // 2. Synaptic Edges (Laser Filaments with Simultaneous Smooth Bloom Fade-In)
    var bloomElapsed = bloomActive ? ((now || performance.now()) - bloomStartTime) : BLOOM_DURATION;
    var bloomEdgeFade = bloomActive ? Math.max(0, Math.min(1.0, (bloomElapsed - 1000) / 1500)) : 1.0;

    if (bloomEdgeFade > 0.001) {
      for (var eIdx = 0; eIdx < allEdges.length; eIdx++) {
        var e = allEdges[eIdx];
        var sNode = getNodeById(e.s), dNode = getNodeById(e.d);
        if (!sNode || !dNode || !isNodeVisible(sNode) || !isNodeVisible(dNode)) continue;
        var p = getVisualPos(e.s, now), q = getVisualPos(e.d, now);
        if (!p || !q) continue;

        var touching = eff !== '' && (e.s === eff || e.d === eff);
        if (eff !== '' && !touching) {
          ctx.strokeStyle = pal.edgeDimmed;
          ctx.lineWidth = 0.8;
        } else if (touching) {
          ctx.strokeStyle = pal.edgeActive;
          ctx.lineWidth = 1.8;
        } else {
          ctx.strokeStyle = pal.edgeIdle;
          ctx.lineWidth = 1.0;
        }

        ctx.save();
        if (bloomEdgeFade < 1.0) ctx.globalAlpha = bloomEdgeFade;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 3. Luminous Celestial Particles (Nodes)
    var nodeObstacles = [];
    for (var nIdx = 0; nIdx < allNodes.length; nIdx++) {
      var n = allNodes[nIdx];
      if (!isNodeVisible(n)) continue;
      p = getVisualPos(n.id, now);
      if (!p) continue;
      if (bloomActive && p.alpha !== undefined && p.alpha <= 0.005) continue;

      var r = nodeRadius(n);
      if (bloomActive && p.scale !== undefined) {
        r *= p.scale;
      }
      nodeObstacles.push({
        id: n.id,
        left: p.x - r - 4,
        right: p.x + r + 4,
        top: p.y - r - 4,
        bottom: p.y + r + 4
      });

      var isEff = n.id === eff;
      var isNbr = nbrs && nbrs[n.id];
      var dimmed = eff !== '' && !isEff && !isNbr;

      ctx.save();
      if (bloomActive && p.alpha !== undefined && p.alpha < 1.0) {
        ctx.globalAlpha = p.alpha;
      }

      // ── Central Cortex Node: Luminous Pulsar Star ──
      if (n.id === 'katakating/core') {
        var radCore = r;
        var isCoreEff = isEff || isNbr;
        
        // Multi-layer nebula aura (Pure monochrome, or accent if active)
        var gradCore = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radCore * 3.8);
        if (isCoreEff) {
          gradCore.addColorStop(0, pal.light ? 'rgba(22, 163, 74, 0.95)' : 'rgba(0, 255, 102, 0.95)');
          gradCore.addColorStop(0.25, pal.light ? 'rgba(22, 163, 74, 0.45)' : 'rgba(0, 255, 102, 0.5)');
          gradCore.addColorStop(0.6, pal.light ? 'rgba(22, 163, 74, 0.12)' : 'rgba(0, 255, 102, 0.18)');
        } else {
          gradCore.addColorStop(0, pal.nodeAura + '0.95)');
          gradCore.addColorStop(0.25, pal.nodeAura + '0.40)');
          gradCore.addColorStop(0.6, pal.nodeAura + '0.12)');
        }
        gradCore.addColorStop(1, 'transparent');
        ctx.fillStyle = gradCore;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radCore * 3.8, 0, 2 * Math.PI);
        ctx.fill();

        // Pulsar Ripple Wave expanding outward
        var waveFrac = (L.phase * 0.35) % 1.0;
        var waveR = radCore + waveFrac * 36;
        var waveAlpha = (1.0 - waveFrac) * (pal.light ? 0.35 : 0.55);
        ctx.strokeStyle = isCoreEff ? 
          (pal.light ? 'rgba(22, 163, 74, ' + waveAlpha + ')' : 'rgba(0, 255, 102, ' + waveAlpha + ')') :
          (pal.nodeAura + waveAlpha + ')');
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, waveR, 0, 2 * Math.PI);
        ctx.stroke();

        // Solid brilliant core
        ctx.fillStyle = isCoreEff ? pal.accent : pal.nodeBase;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radCore, 0, 2 * Math.PI);
        ctx.fill();

      // ── Organ Nodes: Luminous Celestial Particle ──
      } else if (n.t === 'organ') {
        var isOrgEff = isEff || isNbr;
        var gOrgan = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.0);
        if (isOrgEff) {
          gOrgan.addColorStop(0, pal.accentGlow);
          gOrgan.addColorStop(0.35, pal.light ? 'rgba(22, 163, 74, 0.2)' : 'rgba(0, 255, 102, 0.25)');
        } else {
          var a0 = dimmed ? 0.12 : (pal.light ? 0.35 : 0.65);
          var a1 = dimmed ? 0.03 : (pal.light ? 0.10 : 0.20);
          gOrgan.addColorStop(0, pal.nodeAura + a0 + ')');
          gOrgan.addColorStop(0.35, pal.nodeAura + a1 + ')');
        }
        gOrgan.addColorStop(1, 'transparent');
        ctx.fillStyle = gOrgan;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.0, 0, 2 * Math.PI);
        ctx.fill();

        // Pinpoint Core
        ctx.fillStyle = isOrgEff ? pal.accent : (dimmed ? (pal.nodeAura + '0.35)') : pal.nodeBase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
        ctx.fill();

        // Inner pinpoint aperture dot
        ctx.fillStyle = isOrgEff ? (pal.light ? '#ffffff' : '#000000') : (pal.light ? '#ffffff' : '#0a0a0c');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();

      // ── Author Nodes: Radiant Diamond Particles ──
      } else if (n.t === 'author') {
        var isAuthEff = isEff || isNbr;
        var gAuth = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.8);
        if (isAuthEff) {
          gAuth.addColorStop(0, pal.accentGlow);
          gAuth.addColorStop(0.35, pal.light ? 'rgba(22, 163, 74, 0.18)' : 'rgba(0, 255, 102, 0.22)');
        } else {
          var a0A = dimmed ? 0.10 : (pal.light ? 0.30 : 0.60);
          var a1A = dimmed ? 0.02 : (pal.light ? 0.08 : 0.18);
          gAuth.addColorStop(0, pal.nodeAura + a0A + ')');
          gAuth.addColorStop(0.35, pal.nodeAura + a1A + ')');
        }
        gAuth.addColorStop(1, 'transparent');
        ctx.fillStyle = gAuth;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = isAuthEff ? pal.accent : (dimmed ? (pal.nodeAura + '0.3)') : pal.nodeBase);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - r);
        ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x - r, p.y);
        ctx.closePath();
        ctx.fill();

      // ── Memory Nodes: Celestial Star Particles ──
      } else {
        var isMemEff = isEff || isNbr;
        var gMem = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.6);
        if (isMemEff) {
          gMem.addColorStop(0, pal.accentGlow);
          gMem.addColorStop(0.35, pal.light ? 'rgba(22, 163, 74, 0.18)' : 'rgba(0, 255, 102, 0.22)');
        } else {
          var a0M = dimmed ? 0.10 : (pal.light ? 0.30 : 0.60);
          var a1M = dimmed ? 0.02 : (pal.light ? 0.08 : 0.18);
          gMem.addColorStop(0, pal.nodeAura + a0M + ')');
          gMem.addColorStop(0.35, pal.nodeAura + a1M + ')');
        }
        gMem.addColorStop(1, 'transparent');
        ctx.fillStyle = gMem;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = isMemEff ? pal.accent : (dimmed ? (pal.nodeAura + '0.3)') : pal.nodeBase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
        ctx.fill();

        // Glistening center pinpoint
        ctx.fillStyle = isMemEff ? (pal.light ? '#ffffff' : '#052e16') : (pal.light ? '#ffffff' : '#d1d5db');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Selection indicator ring
      if (isEff) {
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 4, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 4. Collision-Free Labels (Smooth Fade-In as Nodes Settle)
    var labelFade = bloomActive ? Math.max(0, Math.min(1.0, (bloomElapsed - 1800) / 800)) : 1.0;
    if (labelFade > 0.001) {
      var labelNodes = [];
      for (nIdx = 0; nIdx < allNodes.length; nIdx++) {
        n = allNodes[nIdx];
        if (!isNodeVisible(n)) continue;
        isEff = n.id === eff;
        isNbr = nbrs && nbrs[n.id];
        var anchorLbl = n.t === 'organ' || n.id === 'katakating/core';
        if (!anchorLbl && !isEff && !isNbr) continue;
        p = getVisualPos(n.id, now);
        if (!p) continue;

        labelNodes.push({
          node: n,
          point: p,
          effective: isEff,
          neighbor: isNbr,
          priority: n.id === 'katakating/core' ? 400 : isEff ? 350 : n.t === 'organ' ? 200 + (n.deg || 0) : 100 + (n.deg || 0)
        });
      }

      labelNodes.sort(function(a, b) {
        if (a.priority !== b.priority) return b.priority - a.priority;
        return a.node.id < b.node.id ? -1 : (a.node.id > b.node.id ? 1 : 0);
      });

      var placedLabels = [];
      var labelHeight = 15;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.save();
      if (labelFade < 1.0) ctx.globalAlpha = labelFade;

      for (var lIdx = 0; lIdx < labelNodes.length; lIdx++) {
        var item = labelNodes[lIdx];
        n = item.node;
        p = item.point;
        var label = (n.title || n.name || n.id);
        if (n.t === 'memory' && label.length > 24) label = label.substring(0, 22) + '..';

        var labelWidth = ctx.measureText(label).width + 8;
        var candidates = labelCandidates(p.x, p.y, cx, cy, nodeRadius(n), labelWidth, labelHeight);
        var chosen = null;

        for (var cIdx = 0; cIdx < candidates.length; cIdx++) {
          var cand = candidates[cIdx];
          var left = cand.x - labelWidth / 2;
          var right = cand.x + labelWidth / 2;
          var top = cand.y - labelHeight / 2;
          var bottom = cand.y + labelHeight / 2;

          var blocked = false;
          for (var pi = 0; pi < placedLabels.length && !blocked; pi++) {
            blocked = overlaps(left, right, top, bottom, placedLabels[pi], 3);
          }
          for (var oi = 0; oi < nodeObstacles.length && !blocked; oi++) {
            if (nodeObstacles[oi].id === n.id) continue;
            blocked = overlaps(left, right, top, bottom, nodeObstacles[oi], 2);
          }
          if (!blocked) {
            chosen = { x: cand.x, y: cand.y, left: left, right: right, top: top, bottom: bottom };
            break;
          }
        }

        if (!chosen) continue;
        placedLabels.push(chosen);

        ctx.strokeStyle = pal.light ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(chosen.x, chosen.y);
        ctx.stroke();

        ctx.fillStyle = pal.light ? 'rgba(255, 255, 255, 0.92)' : 'rgba(14, 16, 17, 0.88)';
        ctx.fillRect(chosen.left - 2, chosen.top - 1, labelWidth + 4, labelHeight + 2);

        ctx.fillStyle = pal.light ? (item.effective ? '#16a34a' : '#0f172a') : (item.effective ? '#00ff66' : '#e5e7eb');
        ctx.fillText(label, chosen.x, chosen.y);
      }

      ctx.restore();
    }

    ctx.restore();
  }

  // ── 7. Animation Loop & Breathing ──
  function loop(now) {
    var dtMs = now - lastFrameTime;
    lastFrameTime = now;
    if (dtMs > 250) dtMs = 250;
    if (dtMs <= 0) dtMs = 16;

    if (bloomActive) {
      var prog = (now - bloomStartTime) / BLOOM_DURATION;
      if (prog >= 1.0) {
        bloomActive = false;
      }
      layoutLive = true;
    }

    if (playing) {
      revealT = Math.min(1.0, revealT + dtMs / 12000);
      if (revealT >= 1.0) playing = false;
      layoutLive = true;
    }

    if (layoutLive) {
      step(L.width, L.height, dtMs);
      render(now);
      if (!playing && !bloomActive && settled()) {
        layoutLive = false;
        updateFooterStatus('Simpul stabil &middot; 0% idle CPU');
      }
    } else {
      breathe(dtMs);
      render(now);
    }

    animFrameId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    lastFrameTime = performance.now();
    animFrameId = requestAnimationFrame(loop);
  }

  function wakePhysics() {
    layoutLive = true;
  }

  // ── 8. Camera Transforms & Pointer Coordinates ──
  function getPointerWorldPos(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    var screenX = (clientX - rect.left);
    var screenY = (clientY - rect.top);
    var w = canvas.width / dpr, h = canvas.height / dpr;
    var cx = w / 2, cy = h / 2;

    var centeredX = screenX - (camera.panX + cx);
    var centeredY = screenY - (camera.panY + cy);
    var worldX = centeredX / camera.zoom + cx;
    var worldY = centeredY / camera.zoom + cy;

    return { x: worldX, y: worldY };
  }

  function findNearestNode(worldX, worldY) {
    var best = null, bestDist2 = 400; // 20px hit radius
    for (var i = 0; i < allNodes.length; i++) {
      var n = allNodes[i];
      if (!isNodeVisible(n)) continue;
      var p = getVisualPos(n.id);
      if (!p) continue;
      var dx = p.x - worldX, dy = p.y - worldY;
      var d2 = dx * dx + dy * dy;
      var r = nodeRadius(n) + 8;
      if (d2 < r * r && d2 < bestDist2) {
        bestDist2 = d2;
        best = n;
      }
    }
    return best;
  }

  function zoomAt(screenX, screenY, factor) {
    var w = canvas.width / dpr, h = canvas.height / dpr;
    var cx = w / 2, cy = h / 2;
    var oldZoom = camera.zoom;
    var newZoom = Math.min(Math.max(oldZoom * factor, 0.35), 4.0);

    // Zoom centered around screenX, screenY
    var wx = (screenX - (camera.panX + cx)) / oldZoom;
    var wy = (screenY - (camera.panY + cy)) / oldZoom;

    camera.panX = screenX - cx - wx * newZoom;
    camera.panY = screenY - cy - wy * newZoom;
    camera.zoom = newZoom;
    wakePhysics();
  }

  function zoomFit() {
    camera.panX = 0;
    camera.panY = 0;
    camera.zoom = 1.0;
    wakePhysics();
  }

  // ── 9. User Interaction & Event Handlers ──
  function setupEvents() {
    var wrap = document.getElementById('brain-canvas-wrapper');
    if (!wrap || !canvas) return;

    // Multi-Touch & Pointer Tracking for Desktop Pan & Mobile Pinch-Zoom
    var activePointers = new Map();
    var lastPinchDist = 0;

    wrap.addEventListener('pointerdown', function(e) {
      activePointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });
      if (activePointers.size === 1) {
        camera.isDragging = true;
        camera.hasMoved = false;
        camera.dragStartX = e.clientX;
        camera.dragStartY = e.clientY;
      } else if (activePointers.size === 2) {
        camera.isDragging = false;
        var pts = Array.from(activePointers.values());
        lastPinchDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
      }
      try { wrap.setPointerCapture(e.pointerId); } catch (_) {}
    });

    wrap.addEventListener('pointermove', function(e) {
      if (!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

      // Touchscreen Two-Finger Pinch to Zoom
      if (activePointers.size === 2) {
        var pts = Array.from(activePointers.values());
        var currentDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
        if (lastPinchDist > 0 && currentDist > 0) {
          var factor = currentDist / lastPinchDist;
          var midX = (pts[0].clientX + pts[1].clientX) / 2;
          var midY = (pts[0].clientY + pts[1].clientY) / 2;
          var rect = canvas.getBoundingClientRect();
          zoomAt(midX - rect.left, midY - rect.top, factor);
        }
        lastPinchDist = currentDist;
        camera.hasMoved = true;
        return;
      }

      // Single Pointer Pan Drag
      if (camera.isDragging) {
        var dx = e.clientX - camera.dragStartX;
        var dy = e.clientY - camera.dragStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) camera.hasMoved = true;
        camera.panX += dx;
        camera.panY += dy;
        camera.dragStartX = e.clientX;
        camera.dragStartY = e.clientY;
        wakePhysics();
        return;
      }

      // Pointer Hover
      var pos = getPointerWorldPos(e.clientX, e.clientY);
      var hit = findNearestNode(pos.x, pos.y);
      var newHoverId = hit ? hit.id : '';

      if (newHoverId !== hoverId) {
        hoverId = newHoverId;
        wrap.style.cursor = hoverId ? 'pointer' : 'grab';
        if (hoverId) {
          var hoveredNode = getNodeById(hoverId);
          updateInspector(hoveredNode, false);
          updateFooterStatus('Inspeksi: ' + (hoveredNode.title || hoveredNode.id));
        } else if (!selectedId) {
          resetInspector();
          updateFooterStatus('Arahkan kursor atau klik simpul untuk inspeksi');
        }
        wakePhysics();
      }
    });

    function handlePointerEnd(e) {
      var wasPinching = activePointers.size >= 2;
      activePointers.delete(e.pointerId);
      try { wrap.releasePointerCapture(e.pointerId); } catch (_) {}

      if (activePointers.size === 0) {
        camera.isDragging = false;
        lastPinchDist = 0;

        if (!camera.hasMoved && !wasPinching) {
          var pos = getPointerWorldPos(e.clientX, e.clientY);
          var hit = findNearestNode(pos.x, pos.y);
          if (hit) {
            selectedId = (selectedId === hit.id) ? '' : hit.id;
            if (selectedId) {
              updateInspector(hit, true);
              updateFooterStatus('Terkunci pada: ' + (hit.title || hit.id));
            } else {
              resetInspector();
              updateFooterStatus('Pilihan dilepas');
            }
          } else {
            selectedId = '';
            resetInspector();
            updateFooterStatus('Pilihan dilepas');
          }
          wakePhysics();
        }
      } else if (activePointers.size === 1) {
        var remaining = Array.from(activePointers.values())[0];
        camera.dragStartX = remaining.clientX;
        camera.dragStartY = remaining.clientY;
      }
    }

    wrap.addEventListener('pointerup', handlePointerEnd);
    wrap.addEventListener('pointercancel', handlePointerEnd);

    // Mouse Wheel Zoom
    wrap.addEventListener('wheel', function(e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var factor = e.deltaY < 0 ? 1.15 : 0.85;
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, factor);
    }, { passive: false });

    // Replay Growth Buttons
    function triggerReplay() {
      playing = true;
      revealT = 0.0;
      L.replaySeed = true;
      syncGraph(L.width, L.height);
      triggerBloom();
      wakePhysics();
      updateFooterStatus('Replay pertumbuhan memori aktif (quantum spiral unfurl & chrono reveal)');
    }

    var btnReplay = document.getElementById('btn-replay-growth');
    if (btnReplay) btnReplay.onclick = triggerReplay;

    var btnReplayTop = document.getElementById('btn-replay-top');
    if (btnReplayTop) btnReplayTop.onclick = triggerReplay;

    // Search Box
    var searchBox = document.getElementById('brain-search');
    if (searchBox) {
      searchBox.addEventListener('input', function(e) {
        searchQuery = e.target.value.trim();
        updateHUD();
        wakePhysics();
      });
      searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          for (var i = 0; i < allNodes.length; i++) {
            if (isNodeVisible(allNodes[i])) {
              selectedId = allNodes[i].id;
              updateInspector(allNodes[i], true);
              wakePhysics();
              break;
            }
          }
        }
      });
    }

    // Legend Pill Filters
    var pills = document.querySelectorAll('.brain-pill');
    pills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        var kind = pill.getAttribute('data-kind');
        hiddenKinds[kind] = !hiddenKinds[kind];
        if (hiddenKinds[kind]) {
          pill.classList.remove('active');
          pill.classList.add('inactive');
        } else {
          pill.classList.remove('inactive');
          pill.classList.add('active');
        }
        updateHUD();
        wakePhysics();
      });
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'r' || e.key === 'R') triggerReplay();
      else if (e.key === '+' || e.key === '=') {
        var w = canvas.width / dpr, h = canvas.height / dpr;
        zoomAt(w / 2, h / 2, 1.25);
      } else if (e.key === '-' || e.key === '_') {
        var w2 = canvas.width / dpr, h2 = canvas.height / dpr;
        zoomAt(w2 / 2, h2 / 2, 0.8);
      } else if (e.key === '0') {
        zoomFit();
      } else if (e.key === 'Escape') {
        if (selectedId) {
          selectedId = '';
          resetInspector();
          wakePhysics();
        } else {
          window.location.href = 'index.html';
        }
      }
    });

    // Theme toggle live listener
    window.addEventListener('katakating-theme-change', function() {
      wakePhysics();
    });

    window.addEventListener('resize', function() {
      resizeCanvas();
      syncGraph(L.width, L.height);
      wakePhysics();
    });
  }

  function resizeCanvas() {
    var wrap = document.getElementById('brain-canvas-wrapper');
    if (!wrap || !canvas) return;
    dpr = window.devicePixelRatio || 1;
    var w = wrap.clientWidth;
    var h = wrap.clientHeight;
    if (w <= 0 || h <= 0) return;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    L.width = w;
    L.height = h;
  }

  // ── 10. UI Injections & Inspector ──
  function initCockpitUI() {
    canvas = document.getElementById('brain-canvas');
    if (canvas) ctx = canvas.getContext('2d');

    // Live Clock
    function updateClock() {
      var clockEl = document.getElementById('brain-clock');
      if (clockEl) {
        var d = new Date();
        var hh = String(d.getHours()).padStart(2, '0');
        var mm = String(d.getMinutes()).padStart(2, '0');
        var ss = String(d.getSeconds()).padStart(2, '0');
        clockEl.textContent = hh + ':' + mm + ':' + ss;
      }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Vitals Rail
    var vm = document.getElementById('vital-memories');
    if (vm) vm.textContent = rawArticles.length;
    var vl = document.getElementById('vital-links');
    if (vl) vl.textContent = allEdges.length;

    var orgCount = allNodes.filter(function(n) { return n.t === 'organ'; }).length;
    var vo = document.getElementById('vital-organs');
    if (vo) vo.textContent = orgCount;

    var authCount = allNodes.filter(function(n) { return n.t === 'author'; }).length;
    var va = document.getElementById('vital-authors');
    if (va) va.textContent = authCount;

    var tagSet = new Set();
    rawArticles.forEach(function(a) {
      if (a.tags) a.tags.forEach(function(t) { tagSet.add(t); });
    });
    var vt = document.getElementById('vital-tags');
    if (vt) vt.textContent = tagSet.size;

    // Sparkline Activity Bars
    var sparkWrap = document.getElementById('brain-sparkline');
    if (sparkWrap) {
      sparkWrap.innerHTML = '';
      for (var s = 0; s < 32; s++) {
        var bar = document.createElement('div');
        bar.className = 'brain-sparkline-bar' + (s > 22 ? ' active' : '');
        var barH = 4 + Math.floor(stableUnit('spark:' + s) * 22);
        bar.style.height = barH + 'px';
        sparkWrap.appendChild(bar);
      }
    }

    // Workspaces / Rumpun List
    var wsList = document.getElementById('brain-workspace-list');
    if (wsList) {
      wsList.innerHTML = '';
      var organs = allNodes.filter(function(n) { return n.t === 'organ'; });
      
      // All topics item
      var allItem = document.createElement('button');
      allItem.className = 'brain-workspace-item active';
      allItem.innerHTML = '<span class="brain-workspace-dot"></span><span>// SEMUA RUMPUN (' + rawArticles.length + ')</span>';
      allItem.onclick = function() {
        activeWorkspaceCategory = '';
        document.querySelectorAll('.brain-workspace-item').forEach(function(b) { b.classList.remove('active'); });
        allItem.classList.add('active');
        wakePhysics();
      };
      wsList.appendChild(allItem);

      organs.forEach(function(o) {
        var item = document.createElement('button');
        item.className = 'brain-workspace-item';
        item.innerHTML = '<span class="brain-workspace-dot"></span><span>' + escapeHtml(o.title) + ' (' + (o.articleCount || 0) + ')</span>';
        item.onclick = function() {
          activeWorkspaceCategory = (activeWorkspaceCategory === o.title) ? '' : o.title;
          document.querySelectorAll('.brain-workspace-item').forEach(function(b) { b.classList.remove('active'); });
          if (activeWorkspaceCategory) item.classList.add('active');
          else allItem.classList.add('active');
          wakePhysics();
        };
        wsList.appendChild(item);
      });
    }

    // Thought Stream Entries
    var streamList = document.getElementById('brain-stream-list');
    if (streamList) {
      streamList.innerHTML = '';
      var recent = rawArticles.slice(0, 6);
      recent.forEach(function(r, idx) {
        var el = document.createElement('div');
        el.className = 'brain-stream-item' + (idx === 0 ? ' active' : '');
        el.innerHTML = '<span class="brain-stream-glyph">&sigma;</span> Publikasi terindeks: "' + escapeHtml(r.title) + '" &middot; ' + (r.date || 'baru');
        streamList.appendChild(el);
      });
      var syncEl = document.createElement('div');
      syncEl.className = 'brain-stream-item';
      syncEl.innerHTML = '<span class="brain-stream-glyph">&bull;</span> Integrasi corpus Katakating &middot; ledger signed debt clear';
      streamList.appendChild(syncEl);
    }

    updateHUD();
    setupEvents();
  }

  function updateHUD() {
    var hud = document.getElementById('brain-canvas-hud');
    if (!hud) return;
    var visCount = allNodes.filter(isNodeVisible).length;
    hud.textContent = visCount + ' of ' + allNodes.length + ' memories \u00B7 ' + allEdges.length + ' links \u00B7 complete';
  }

  function updateFooterStatus(text) {
    var el = document.getElementById('footer-status-text');
    if (el) el.innerHTML = text;
  }

  function updateInspector(node, isLocked) {
    var body = document.getElementById('brain-inspector-body');
    if (!body || !node) return;

    var typeBadge = '// SIMPUL ' + node.t.toUpperCase();
    var tagsHtml = '';
    if (node.tags && node.tags.length) {
      tagsHtml = '<div class="brain-node-tags">' +
        node.tags.map(function(t) { return '<span class="brain-node-tag">#' + escapeHtml(t) + '</span>'; }).join('') +
        '</div>';
    }

    // Related edges
    var edges = L.edgesByNode[node.id] || [];
    var edgesHtml = '';
    if (edges.length) {
      edgesHtml = '<div class="brain-card-title" style="margin-top: 8px;">RELASI TERHUBUNG (' + edges.length + ')</div>' +
        '<div class="brain-edges-list">' +
        edges.slice(0, 8).map(function(e) {
          var other = getNodeById(e.other);
          var otherName = other ? (other.title || other.name || other.id) : e.other;
          return '<div class="brain-edge-item">' +
            '<span class="brain-edge-type">[type: ' + escapeHtml(e.type) + '] &rarr; ' + escapeHtml(otherName) + '</span>' +
            '<span class="brain-edge-why">' + escapeHtml(e.why) + '</span>' +
            '</div>';
        }).join('') +
        '</div>';
    }

    var readBtnHtml = '';
    if (node.t === 'memory' && node.slug) {
      readBtnHtml = '<a href="article.html?id=' + encodeURIComponent(node.slug) + '" class="brain-read-btn">[ BACA JURNAL LENGKAP &nearr; ]</a>';
    }

    body.innerHTML = '' +
      '<div class="brain-node-badge">' + typeBadge + (isLocked ? ' [TERKUNCI]' : '') + '</div>' +
      '<h2 class="brain-node-title">' + escapeHtml(node.title || node.name || node.id) + '</h2>' +
      '<div class="brain-node-meta">Oleh ' + escapeHtml(node.author || 'Tim') + ' &bull; ' + escapeHtml(node.category || 'Umum') + '</div>' +
      '<div class="brain-node-excerpt">' + escapeHtml(node.excerpt || 'Tidak ada deskripsi rinci.') + '</div>' +
      tagsHtml +
      edgesHtml +
      readBtnHtml;
  }

  function resetInspector() {
    var body = document.getElementById('brain-inspector-body');
    if (!body) return;
    body.innerHTML = '<div class="brain-empty-hint">' +
      'Arahkan kursor ke sebuah memori untuk inspeksi &mdash; klik untuk mengunci pilihan. Setiap relasi menampilkan tipe dan konteks keterhubungannya.' +
      '</div>';
  }

  // ── 11. Boot Initialization ──
  document.addEventListener('DOMContentLoaded', loadData);

})();
