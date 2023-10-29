/**
 * @jest-environment jsdom
 */

import { validateForm } from "../pages/subjects/common";

describe("Test Subject common", () => {
  it("Name is required", () => {
    let formData = {
      id: 0,
      name: "",
      date_of_birth: "1984-01-01",
      score: 10,
      test_chamber: 10,
      alive: true,
    };

    expect(validateForm(formData)[0]).toEqual("Name is required");
  });

  it("DOB right format", () => {
    let formData = {
      id: 0,
      name: "John doe",
      date_of_birth: "",
      score: 10,
      test_chamber: 10,
      alive: true,
    };

    expect(validateForm(formData)[0]).toEqual(
      "Dob must be in YYYY-MM-DD format"
    );
  });

  it("Alive is required", () => {
    let formData = {
      id: 0,
      name: "John doe",
      date_of_birth: "1984-01-01",
      score: 10,
      test_chamber: 10,
      alive: undefined,
    };

    expect(validateForm(formData)[0]).toEqual("Alive is required");
  });

  it("Score is required", () => {
    let formData = {
      id: 0,
      name: "John doe",
      date_of_birth: "1984-01-01",
      score: undefined,
      test_chamber: 10,
      alive: true,
    };

    expect(validateForm(formData)[0]).toEqual("score is required");
  });

  it("Test chamber is required", () => {
    let formData = {
      id: 0,
      name: "John doe",
      date_of_birth: "1984-01-01",
      score: 25,
      test_chamber: undefined,
      alive: true,
    };

    expect(validateForm(formData)[0]).toEqual("test chamber is required");
  });
});
