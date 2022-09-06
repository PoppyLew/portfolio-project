
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe("get categories api", () => {
  it("responds with an array of all categories as objects with correct keys", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories: categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories.length).toBe(4);
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  it("404: responds with correct err and status code when passed a pathway that does not exist", () => {
    return request(app)
      .get("/api/catagories")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Not Found" });
      });
  });
});

describe("get reviews by id", () => {
  it("responds with a review object with the correct properties", () => {
    return request(app)
      .get('/api/reviews/4')
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toBeInstanceOf(Array);
        expect(review.length).toBe(1);

        expect.objectContaining({
          review_id: 4,
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
        });
      });
  });
  it('400: if passed any data type other than number in the review_id parameter responds with an "invalid input" message', () => {
    return request(app)
    .get('/api/reviews/hi')
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('invalid input')
    })
  })
  it('404: if passed a valid review id that does not exist in the review table responds with an "id does not exist" message', () => {
    return request(app)
    .get('/api/reviews/9999')
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe('id does not exist')
    })
  })
});

describe('get users api', () => {
  it('responds with an array of all users as objects with correct keys', () => {

    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String)
            })
          );
        });
      });
  })
  it("404: responds with correct err and status code when passed a pathway that does not exist", () => {
    return request(app)
      .get("/api/usesr")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Not Found" });
      });
  });
})

       
