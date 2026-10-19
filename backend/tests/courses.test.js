import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../app.js";
import Course from "../models/Course.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  await Course.deleteMany({});

  await Course.create({
    title: "JavaScript Basics",
    description: "Learn JavaScript fundamentals",
    instructor: "Test Instructor",
    category: "Programming",
    duration: "4 weeks",
    level: "Beginner",
    modules: [
      {
        title: "Introduction",
        lessons: ["Variables", "Functions"],
      },
    ],
  });
});

afterAll(async () => {
  await mongoose.disconnect();

  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("Courses API", () => {
  it("should return all courses with a count", async () => {
    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(Array.isArray(response.body.courses)).toBe(true);
    expect(response.body.courses[0].title).toBe("JavaScript Basics");
  });

  it("should reject course creation without authentication", async () => {
    const response = await request(app).post("/api/courses").send({
      title: "React Basics",
      description: "Learn React fundamentals",
      instructor: "Test Instructor",
      category: "Programming",
      duration: "4 weeks",
    });

    expect([401, 403]).toContain(response.status);
  });

  it("should reject course creation without required fields", async () => {
    const response = await request(app)
      .post("/api/courses")
      .set("Authorization", "Bearer invalid-token")
      .send({
        title: "",
        description: "",
      });

    expect([400, 401, 403]).toContain(response.status);
  });

  it("should handle a request with an invalid course ID", async () => {
    const response = await request(app).get("/api/courses/invalid-id");

    expect([400, 404]).toContain(response.status);
  });

  it("should reject course updates without authentication", async () => {
    const response = await request(app)
      .put("/api/courses/507f1f77bcf86cd799439011")
      .send({
        title: "Updated JavaScript Course",
      });

    expect([401, 403]).toContain(response.status);
  });

  it("should reject course deletion without authentication", async () => {
    const response = await request(app).delete(
      "/api/courses/507f1f77bcf86cd799439011",
    );

    expect([401, 403]).toContain(response.status);
  });
});
