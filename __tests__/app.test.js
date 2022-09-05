const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('get categories api', () => {
    it('responds with all categories with correct keys', () => {
        return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({ body }) => {
        const {categories: categories} = body;
        expect(categories).toBeInstanceOf(Array);
        categories.forEach((category) => {
            expect(category).toEqual(
                expect.objectContaining({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
            )

        })

      })
    })
})
