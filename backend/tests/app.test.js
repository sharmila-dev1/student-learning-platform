import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("LearnHub API", () => {
  it("should return 200 from the root endpoint", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Learnhub API is running",
    });
  });

  it("should return JSON from the root endpoint", async () => {
    const response = await request(app).get("/");

    expect(response.headers["content-type"]).toContain("application/json");
  });

  it("should return 404 for an unknown endpoint", async () => {
    const response = await request(app).get("/api/unknown-test-route");

    expect(response.status).toBe(404);
  });

  it("should reject registration when required fields are missing", async () => {
    const response = await request(app).post("/api/auth/register").send({});

    expect([400, 422]).toContain(response.status);
  });

  it("should reject login when email and password are missing", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({});

  expect([400, 401, 422]).toContain(response.status);
});
});
