const base = 'http://localhost:3001';

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

  const loginResult = await fetchJson(base + '/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: adminUser, password: adminPassword }),
    credentials: 'include',
  });

  const cookie = (loginResult.response.headers.get('set-cookie') || '').split(';')[0] || '';
  console.log('LOGIN_STATUS', loginResult.response.status, 'COOKIE', cookie || 'none');

  if (!cookie) {
    throw new Error('No auth cookie returned');
  }

  const headers = { Cookie: cookie, 'Content-Type': 'application/json' };
  const contentResult = await fetchJson(base + '/api/admin/content', {
    headers,
    credentials: 'include',
  });

  console.log('CONTENT_STATUS', contentResult.response.status, 'BLOG_COUNT', Array.isArray(contentResult.data?.blog) ? contentResult.data.blog.length : 'n/a');

  if (!contentResult.response.ok || !Array.isArray(contentResult.data?.blog)) {
    throw new Error(`Unable to read admin content: ${JSON.stringify(contentResult.data)}`);
  }

  const target = contentResult.data.blog.find((post) => post.published !== false) || contentResult.data.blog[0];
  if (!target) {
    console.log('NO_POSTS_AVAILABLE');
    return;
  }

  const toggle = async (published) => {
    const result = await fetchJson(base + '/api/admin/content', {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify({ type: 'blog', id: target.id, published }),
    });
    console.log('TOGGLE', published, 'STATUS', result.response.status, 'BODY', typeof result.data === 'string' ? result.data.slice(0, 180) : JSON.stringify(result.data).slice(0, 180));
  };

  const beforePage = await fetch(base + '/blog', { headers, credentials: 'include' });
  const beforeHtml = await beforePage.text();
  console.log('BEFORE_VISIBLE', beforeHtml.includes(target.title));

  await toggle(false);
  const hiddenPage = await fetch(base + '/blog', { headers, credentials: 'include' });
  const hiddenHtml = await hiddenPage.text();
  console.log('AFTER_UNPUBLISH_VISIBLE', hiddenHtml.includes(target.title));

  await toggle(true);
  const restoredPage = await fetch(base + '/blog', { headers, credentials: 'include' });
  const restoredHtml = await restoredPage.text();
  console.log('AFTER_REPUBLISH_VISIBLE', restoredHtml.includes(target.title));
})();
