const request = require("supertest");
const app = require("../server");

describe("User API Tests", () => {
  let token;
  let userId;

  beforeAll(async () => {
    // ניסיון לרשום את המשתמש
    await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    // התחברות
    const loginRes = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "123456",
    });

    console.log("Login Response Body:", loginRes.body);

    token = loginRes.body.token;
    userId = loginRes.body.userId;

    if (!userId) {
      throw new Error("User ID not found in login response");
    }
  });

  test("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("userId");
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
