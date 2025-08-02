const request = require("supertest");
const app = require("../server"); // Import the app from server.js

describe("User Login API", () => {
  it("should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "John@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
