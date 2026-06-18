-- ════════════════════════════════════════════════════════
--  Portfolio DB — single-row JSONB table
--  Run this in Supabase Dashboard → SQL Editor
-- ════════════════════════════════════════════════════════

-- 1. Create the table
create table if not exists public.portfolio (
  id       integer primary key default 1,
  data     jsonb   not null,
  updated_at timestamptz not null default now(),
  -- enforce exactly one row
  constraint single_row check (id = 1)
);

-- 2. Row-Level Security
alter table public.portfolio enable row level security;

-- Public can READ (anon key is safe)
create policy "public_read"
  on public.portfolio
  for select
  using (true);

-- Only service-role / authenticated can WRITE
-- (our Netlify Function uses service_role key which bypasses RLS,
--  so this policy covers Supabase client with user sessions if needed)
create policy "service_write"
  on public.portfolio
  for all
  using (auth.role() = 'service_role');

-- 3. Seed with the initial data
-- Replace the JSON below with your actual db.json content if different
insert into public.portfolio (id, data) values (1, '{
  "hero": {
    "name": "Shahzad",
    "badge": "Open for new AI opportunities",
    "roles": [
      "Full-Stack AI Engineer",
      "LLM Specialist",
      "Computer Vision Expert",
      "Django Backend Developer",
      "React Frontend Engineer"
    ],
    "description": "Architecting the future with Autonomous Agents, Generative AI, and Scalable Web Architectures.",
    "highlightWords": ["Autonomous Agents", "Generative AI", "Scalable Web Architectures"]
  },
  "about": {
    "photo": "/shahzad_image.jpg",
    "title": "Full-Stack AI Engineer",
    "bio": "I am a dedicated Full-Stack AI Engineer passionate about bridging sophisticated AI models with user-centric web applications. My expertise spans autonomous multi-agent systems, real-time computer vision pipelines, and scalable backends using Django and DRF.",
    "email": "shahzad.abdulmajeed4894@gmail.com",
    "phone": "+92 320 6236425",
    "location": "Pakistan",
    "availability": "Available for Freelance",
    "yearsExp": "2",
    "projectsCount": "9",
    "cvUrl": "",
    "githubUrl": "https://github.com/MShahzadAbdulmajeed",
    "linkedinUrl": "https://www.linkedin.com/in/shahzad-abdulmajeed-618887220/",
    "huggingfaceUrl": "https://huggingface.co/its-shezi",
    "twitterUrl": "",
    "skillGroups": [
      {"label": "AI / ML",    "items": ["TensorFlow","PyTorch","OpenCV","YOLOv5","LangChain","CrewAI"]},
      {"label": "Frontend",   "items": ["React","TypeScript","Tailwind CSS","Framer Motion"]},
      {"label": "Backend",    "items": ["Django","DRF","PostgreSQL","Firebase","JWT"]}
    ]
  },
  "categories": [
    {"id": "all", "name": "All Work"},
    {"id": "cv",  "name": "Computer Vision"},
    {"id": "nlp", "name": "NLP & LLMs"},
    {"id": "web", "name": "Web Dev"}
  ],
  "projects": []
}'::jsonb)
on conflict (id) do nothing;

-- 4. Helper function to update the portfolio atomically
create or replace function update_portfolio(new_data jsonb)
returns void
language plpgsql
security definer   -- runs as table owner, bypasses RLS
as $$
begin
  insert into public.portfolio (id, data, updated_at)
  values (1, new_data, now())
  on conflict (id) do update
    set data = excluded.data,
        updated_at = now();
end;
$$;
