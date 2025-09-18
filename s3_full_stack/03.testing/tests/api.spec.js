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
    const { count, total: totalAll, items } = await res.json();
    expect(count).toBe(totalAll);
    expect(items.length).toBe(totalAll);
    expect(totalAll).toBe(15);

    const resFiltered = await request.get('/api/companies/count?name=Microsoft');
    expect(resFiltered.status()).toBe(200);
    const { total: totalFiltered } = await resFiltered.json();
    expect(totalFiltered).toBeLessThanOrEqual(totalAll);

    const resNotFound = await request.get('/api/companies/count?name=DoesNotExist123');
    expect(resNotFound.status()).toBe(200);
    const { total: totalNotFound } = await resNotFound.json();
    expect(totalNotFound).toBe(0);
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

  test('GET /api/companies/top-paid validation', async ({ request }) => {

    const resDefault = await request.get('/api/companies/top-paid');
    expect(resDefault.status()).toBe(200);
    const { items: defaultItems } = await resDefault.json();
    expect(defaultItems.length).toBeLessThanOrEqual(5);

    const resLimit10 = await request.get('/api/companies/top-paid?limit=10');
    expect(resLimit10.status()).toBe(200);
    const { items: limit10Items } = await resLimit10.json();
    expect(limit10Items.length).toBeLessThanOrEqual(10);

    const bases = limit10Items.map(it => it.salaryBand?.base ?? 0);
    for (let i = 0; i < bases.length - 1; i++) {
      expect(bases[i]).toBeGreaterThanOrEqual(bases[i + 1]);
    }

    const resLimit3 = await request.get('/api/companies/top-paid?limit=3');
    expect(resLimit3.status()).toBe(200);
    const { items: limit3Items } = await resLimit3.json();
    expect(limit3Items.length).toBeLessThanOrEqual(3);
  });

  test('GET /api/companies/by-skill/:skill works correctly', async ({ request }) => {
    // 1️⃣ Positive case: valid skill
    const res1 = await request.get('/api/companies/by-skill/DSA');
    expect(res1.status()).toBe(200);
    const body1 = await res1.json();
    expect(body1.count).toBeGreaterThan(0);
    body1.items.forEach(it => {
      expect(it.hiringCriteria.skills).toEqual(
        expect.arrayContaining([expect.stringMatching(/dsa/i)])
      );
    });

    // 2️⃣ Case-insensitive check
    const res2 = await request.get('/api/companies/by-skill/dsa');
    expect(res2.status()).toBe(200);
    const body2 = await res2.json();
    expect(body2.count).toBe(body1.count); // should match case-insensitively

    // 3️⃣ Negative case: non-existing skill
    const res3 = await request.get('/api/companies/by-skill/NoSuchSkillXYZ');
    expect(res3.status()).toBe(200);
    const body3 = await res3.json();
    expect(body3.count).toBe(0);
    expect(body3.items).toEqual([]);
  });


  // optional negative tests (invalid id / not found)
  test('GET /api/companies/:id with invalid id returns 400', async ({ request }) => {
    const r = await request.get('/api/companies/invalid-id-123');
    expect(r.status()).toBe(400);
    const body = await r.json();
    expect(body).toHaveProperty('error');
  });
});
