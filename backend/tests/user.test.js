const request = require("supertest");
const app = require("../server");

describe("User API Tests", () => {
  const token = loginRes.body.token;
  const userId = loginRes.body.user._id;

  beforeAll(async () => {
    const email = "marom@example.com";
    const password = "123456";

    // try to register the user first
    // This is to ensure the user exists before testing login
    try {
      const registerRes = await request(app).post("/api/users/register").send({
        name: "Marom",
        email,
        password,
      });

      if (registerRes.statusCode === 201) {
        console.log("✅ User registered");
      } else {
        console.log("ℹ️ User might already exist");
      }
    } catch (error) {
      console.log("⚠️ Register failed (possibly user exists):", error.message);
    }

    // login
    const loginRes = await request(app).post("/api/users/login").send({
      email,
      password,
    });
    console.log("🔐 login response body:", loginRes.body);

    token = loginRes.body.token;
    userId = loginRes.body._id;

    expect(loginRes.statusCode).toBe(200);
    expect(token).toBeDefined();
  });

  test("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "marom@example.com",
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
