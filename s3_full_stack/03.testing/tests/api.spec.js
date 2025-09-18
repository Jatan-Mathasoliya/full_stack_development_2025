// tests/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Next.js (App Router) workbook API', () => {

  test('GET /api/companies returns a list', async ({ request }) => {
    const res = await request.get('/api/companies');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('count');
    expect(body).toHaveProperty('items');
    expect(Array.isArray(body.items)).toBeTruthy();
    expect(body.count).toBeGreaterThan(0);
  });

  test('GET /api/companies/search?name=Microsoft returns Microsoft', async ({ request }) => {
    const res = await request.get('/api/companies/search?name=Microsoft');
    expect(res.status()).toBe(200);
    const { count, items } = await res.json();
    if (count === 0) {
      console.log('No results for search term "Microsoft". Full response:', { count, items });
    }

    // Ensure count is greater than 0
    expect(count).toBeGreaterThan(0);

    const found = items.find(it => it.name && it.name.toLowerCase().includes('microsoft'));
    expect(found).toBeTruthy();
  });

  test('GET /api/companies/:id returns the company document', async ({ request }) => {
    const listRes = await request.get('/api/companies?limit=1');
    expect(listRes.status()).toBe(200);
    const listBody = await listRes.json();
    expect(listBody.items.length).toBeGreaterThan(0);

    const id = listBody.items[0]._id;
    const singleRes = await request.get(`/api/companies/${id}`);
    expect(singleRes.status()).toBe(200);
    const doc = await singleRes.json();
    expect(doc).toHaveProperty('_id');
    expect(doc._id).toBe(id);
    expect(doc).toHaveProperty('name');
  });

  test.describe('Companies API Pagination', () => {
    test('GET /api/companies?limit=5&skip=5 returns page 2 correctly', async ({ request }) => {
      // Page 1
      const res1 = await request.get('/api/companies?limit=5&skip=0');
      expect(res1.status()).toBe(200);
      const { count: count1, items: page1 } = await res1.json();
      expect(count1).toBe(5);

      // Page 2
      const res2 = await request.get('/api/companies?limit=5&skip=5');
      expect(res2.status()).toBe(200);
      const { count: count2, items: page2 } = await res2.json();
      expect(count2).toBe(5);

      // Ensure no overlap between page 1 and page 2
      const idsPage1 = page1.map(it => it._id.toString());
      const idsPage2 = page2.map(it => it._id.toString());
      idsPage1.forEach(id => {
        expect(idsPage2).not.toContain(id);
      });
    });
  });

  test('GET /api/companies/search?location=Hyderabad returns Hyderabad companies', async ({ request }) => {
    const res = await request.get('/api/companies/search?location=Hyderabad');
    expect(res.status()).toBe(200);
    const { count, items } = await res.json();
    if (count === 0) {
      console.log('No results for search term "Hyderabad". Full response:', { count, items });
    }

    expect(count).toBeGreaterThan(0);

    const found = items.find(it => it.location && it.location.toLowerCase().includes('hyderabad'));
    expect(found).toBeTruthy();
  });

  test('GET /api/companies/search?skill=DSA returns DSA required companies', async ({ request }) => {
    const res = await request.get('/api/companies/search?skill=DSA');
    expect(res.status()).toBe(200);
    const { count, items } = await res.json();
    if (count === 0) {
      console.log('No results for search term "DSA". Full response:', { count, items });
    }

    expect(count).toBeGreaterThan(0);

    const found = items.find(it =>
      Array.isArray(it.hiringCriteria?.skills) &&
      it.hiringCriteria.skills.some(skill => skill.toLowerCase() === 'dsa')
    );
    expect(found).toBeTruthy();
  });

  test('GET /api/companies?limit=0 returns all companies with correct total', async ({ request }) => {
    const res = await request.get('/api/companies?limit=0');

    expect(res.status()).toBe(200);

    const { count, total, items } = await res.json();

    expect(count).toBe(total);

    expect(items.length).toBe(total);

    expect(total).toBe(15);
  });

  test('GET /api/companies?name=Microsoft&location=Hyderabad returns matching companies', async ({ request }) => {
    const res = await request.get('/api/companies?name=Microsoft&location=Hyderabad');
    expect(res.status()).toBe(200);

    const { count, items } = await res.json();
    if (count === 0) {
      console.log('No results for Microsoft in Hyderabad. Full response:', { count, items });
    }

    expect(count).toBeGreaterThan(0);

    // ✅ Ensure all returned items match both conditions
    items.forEach(it => {
      expect(it.name.toLowerCase()).toContain('microsoft');
      expect(it.location.toLowerCase()).toContain('hyderabad');
    });
  });

  // optional negative tests (invalid id / not found)
  test('GET /api/companies/:id with invalid id returns 400', async ({ request }) => {
    const r = await request.get('/api/companies/invalid-id-123');
    expect(r.status()).toBe(400);
    const body = await r.json();
    expect(body).toHaveProperty('error');
  });
});
