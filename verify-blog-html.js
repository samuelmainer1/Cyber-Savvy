const base = 'http://localhost:3000';

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { response, data };
}

(async () => {
  const adminUser = process.env.ADMIN_USER || '';
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (!adminUser || !adminPassword) {
    throw new Error('Set ADMIN_USER and ADMIN_PASSWORD in your environment (e.g. from .env.local) before running this script.');
  }

  const login = await fetchJson(base + '/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: adminUser, password: adminPassword }),
    credentials: 'include',
  });
  const cookie = (login.response.headers.get('set-cookie') || '').split(';')[0] || '';
  console.log('LOGIN_STATUS', login.response.status, 'COOKIE', cookie ? 'yes' : 'none');
  if (!cookie) throw new Error('No auth cookie');

  const headers = { Cookie: cookie, 'Content-Type': 'application/json' };
  const before = await fetchJson(base + '/api/admin/content', { headers });
  if (!before.response.ok || !Array.isArray(before.data?.blog)) throw new Error('content read failed');

  const target = before.data.blog.find((p) => p.slug === 'mpesa-daraja-api-integration-guide');
  if (!target) throw new Error('target article not found');
  const snapshot = { content: target.content, title: target.title, summary: target.summary };
  console.log('LOADED', target.slug, 'bytes', target.content.length);

  // Simulate the admin editor saving the article unchanged (same merge path the UI uses)
  const put = await fetchJson(base + '/api/admin/content', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      type: 'blog',
      id: target.id,
      title: target.title,
      summary: target.summary,
      content: target.content,
      category: target.category,
      readTime: target.readTime,
      author: target.author,
      image: target.image,
      imageAlt: target.imageAlt,
      published: target.published,
    }),
  });
  console.log('PUT_STATUS', put.response.status, JSON.stringify(put.data));

  const after = await fetchJson(base + '/api/admin/content', { headers });
  const saved = after.data.blog.find((p) => p.id === target.id);
  const intact =
    !!saved &&
    saved.content === snapshot.content &&
    saved.title === snapshot.title &&
    saved.summary === snapshot.summary;
  console.log('CONTENT_INTACT', intact, 'bytes', saved ? saved.content.length : 0);

  const page = await fetch(base + '/blog/' + target.slug);
  const html = await page.text();
  console.log(
    'PAGE_STATUS', page.status,
    'HAS_H2', html.includes('<h2'),
    'HAS_TABLE', html.includes('<table'),
    'HAS_JSONLD', html.includes('BlogPosting'),
    'HAS_EXT_LINK', html.includes('target="_blank"')
  );
  const pass = intact && page.status === 200 && html.includes('<table');
  console.log(pass ? 'ROUND_TRIP_PASS' : 'ROUND_TRIP_FAIL');
  process.exit(pass ? 0 : 1);
})().catch((e) => {
  console.error('ERROR', e);
  process.exit(1);
});
