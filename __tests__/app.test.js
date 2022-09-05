const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("get categories api", () => {
  it("responds with all categories with correct keys", () => {
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
      .get("/api/review/4")
      .expect(200)
      .then(({ body }) => {
        const { review: review } = body;
        expect(review).objectContaining({
          review_id: 4,
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(String),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String)

        });
      });
  });
});

// Responds with:

// - a review object, which should have the following properties:

//   - `review_id` which is the primary key
//   - `title`
//   - `review_body`
//   - `designer`
//   - `review_img_url`
//   - `votes`
//   - `category` field which references the `slug` in the categories table
//   -  `owner` field that references a user's primary key (`username`)
//   - `created_at`
