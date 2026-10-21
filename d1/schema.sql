-- ====================================================================
-- KATAKATING D1 DATABASE SCHEMA
-- Serverless SQLite on Cloudflare D1
-- ====================================================================

-- 1. Guides Table (Master Catalog of Published Guides)
CREATE TABLE IF NOT EXISTS guides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_npm TEXT,
  category TEXT NOT NULL,
  prodi_tags TEXT NOT NULL DEFAULT '[]',
  semester INTEGER NOT NULL DEFAULT 1,
  initials TEXT NOT NULL DEFAULT 'DOC',
  accent TEXT DEFAULT '#00ff66',
  video_url TEXT DEFAULT '',
  diagram_url TEXT DEFAULT '',
  views_count INTEGER NOT NULL DEFAULT 0,
  copy_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Submissions Table (Staging queue for student drafts)
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_npm TEXT,
  author_email TEXT,
  category TEXT NOT NULL,
  prodi_tags TEXT NOT NULL DEFAULT '[]',
  semester INTEGER NOT NULL DEFAULT 1,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  admin_notes TEXT DEFAULT '',
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Profiles Table (Contributor and Student Profiles)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  github_username TEXT,
  nim TEXT,
  prodi TEXT,
  bio TEXT,
  role TEXT DEFAULT 'student',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Guide Likes Table (Likes counter and tracking)
CREATE TABLE IF NOT EXISTS guide_likes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  guide_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, guide_id)
);

-- 5. Bookmarks Table (Saved guides per student/user)
CREATE TABLE IF NOT EXISTS bookmarks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  guide_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, guide_id)
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);
CREATE INDEX IF NOT EXISTS idx_guides_created_at ON guides(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_guide_likes_guide ON guide_likes(guide_id);
CREATE INDEX IF NOT EXISTS idx_guide_likes_user ON guide_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
