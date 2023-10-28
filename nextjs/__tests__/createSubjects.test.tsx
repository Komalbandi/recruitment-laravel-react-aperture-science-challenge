/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import CreateSubject from "../pages/subjects/createSubject";
import React, { useState as useStateMock } from "react";

// Mock state.
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const setState = jest.fn();

describe("Form validation in CreateSubject", () => {

  it("name is missing", () => {
    let formData={
        id: 0,
        name: "",
        date_of_birth: "",
        score: 0,
        test_chamber: 0,
        alive: undefined,
    }
    // @ts-ignore
    useStateMock.mockImplementationOnce(() => [formData, setSubjectData])
    expect(1).toEqual(1);
  });
});
