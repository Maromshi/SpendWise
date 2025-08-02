const request = require("supertest");
const app = require("../server");

describe("User API Tests", () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create a test user
    await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "123456",
    });

    // Login to get the token
    // This assumes the login endpoint returns a token in the response
    const loginRes = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "123456",
    });

    token = loginRes.body.token;
    userId = loginRes.body.user._id;
  });

  test("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "testuser@example.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("should get budget with valid token", async () => {
    const res = await request(app)
      .get(`/api/users/budget/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("budget");
  });

  test("should not get budget without token", async () => {
    const res = await request(app).get(`/api/users/budget/${userId}`);
    expect(res.statusCode).toBe(401);
  });
});
