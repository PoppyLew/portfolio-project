const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET categories api", () => {
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

describe("GET reviews by id", () => {
  it("responds with a review object with the correct properties", () => {
    return request(app)
      .get("/api/reviews/4")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toBeInstanceOf(Object);

        expect(review).toEqual(
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
          })
        );
      });
  });
  it('400: if passed any data type other than number in the review_id parameter responds with an "Invalid Input" message', () => {
    return request(app)
      .get("/api/reviews/hi")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });
  it('404: if passed a valid review id that does not exist in the review table responds with an "ID does not exist" message', () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID does not exist");
      });
  });
});

describe("PATCH on api/review:review id", () => {
  it("take an object containing voting information and update the review with the matching review id passed in and respond with the updated review object with the correct new votes total, increasing the votes with a posative value", () => {
    const newVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/4")
      .send(newVote)
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toBeInstanceOf(Object);
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 4,
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: 8,
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });
  it("take an object containing voting information and update the review with the matching review id passed in and respond with the updated review object with the correct new votes total, decreasing the votes with a negative value", () => {
    const newVote = { inc_votes: -1 };
    return request(app)
      .patch("/api/reviews/4")
      .send(newVote)
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toBeInstanceOf(Object);
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 4,
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: 6,
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });
  it('400: if passed any data type other than number in the review_id parameter responds with an "Invalid Input" message', () => {
    const newVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/hi")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
    })
    it('404: if passed a valid review id that does not exist in the review table responds with an "ID does not exist" message', () => {
      const newVote = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/9999")
        .send(newVote)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("ID does not exist");
        });
    });
    it('400: if passed an object missing inc_votes key returns message "Bad Request"', () => {
      const newVote = { };
      return request(app)
        .patch("/api/reviews/4")
        .send(newVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    it('400: if passed an object with and invalid data type in the key inc_votes value returns message "Invalid Input"', () => {
      const newVote = { inc_votes: 'hi'};
      return request(app)
        .patch("/api/reviews/4")
        .send(newVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid Input");
        });
    });
    it('400: if passed an object with additional properties outsode of inc_votes returns message "Bad Request"', () => {
      const newVote = { inc_votes: 1, another_thing: 'hello'};
      return request(app)
        .patch("/api/reviews/4")
        .send(newVote)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
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

// No inc_votes on request body
// Invalid inc_votes (e.g. { inc_votes : "cat" })
// Some other property on request body (e.g. { inc_votes : 1, name: 'Mitch' })



