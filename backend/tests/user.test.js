const request = require("supertest");
const app = require("../server");

let token;
let userId;

beforeAll(async () => {
  const res = await request(app).post("/api/users/login").send({
    email: "marom@example.com",
    password: "123456",
  });
  token = res.body.token;
  userId = res.body._id;
});

describe("User Login API", () => {
  it("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "marom@example.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("User Budget API", () => {
  it("should get budget with valid token", async () => {
    const res = await request(app)
      .get(`/api/users/budget/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("budget");
  });

  it("should not get budget without token", async () => {
    const res = await request(app).get(`/api/users/budget/${userId}`);
    expect(res.statusCode).toBe(401);
  });
});
