import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { faker } from "@faker-js/faker";
import Bookshelf from "./Bookshelf";

describe("Bookshelf", () => {
  test("inputs update on user typing", async () => {
    //arrange
    render(<Bookshelf />);
    const user = userEvent.setup();
    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const titleFake = faker.lorem.words({ min: 1, max: 10 });
    const authorFake = faker.person.fullName();

    //act
    await user.type(titleInput, titleFake);
    await user.type(authorInput, authorFake);

    //assert
    expect(titleInput).toHaveValue(titleFake);
    expect(authorInput).toHaveValue(authorFake);
  });
  test("submitting form adds a new book", async () => {
    //arrange
    render(<Bookshelf />);
    const user = userEvent.setup();
    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const addButton = screen.getByRole("button", { name: /add book/i });
    const titleFake = faker.lorem.words({ min: 1, max: 10 });
    const authorFake = faker.person.fullName();

    //act
    await user.type(titleInput, titleFake);
    await user.type(authorInput, authorFake);
    await user.click(addButton);

    expect(screen.getByText(titleFake)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(authorFake, "i"))).toBeInTheDocument();
  });
  test("form inputs are cleared after submit", async () => {
    //arrange
    render(<Bookshelf />);
    const user = userEvent.setup();
    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const addButton = screen.getByRole("button", { name: /add book/i });
    const titleFake = faker.lorem.words({ min: 1, max: 10 });
    const authorFake = faker.person.fullName();

    //act
    await user.type(titleInput, titleFake);
    await user.type(authorInput, authorFake);
    await user.click(addButton);

    //assert
    expect(titleInput).toHaveValue("");
    expect(authorInput).toHaveValue("");
  });
});
