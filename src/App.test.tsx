import { fireEvent, render } from "@testing-library/react";
import LoginPage from "./Auth/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { secretEmail } from "./utils/helper";
import HomePage from "./Pages/HomePage/HomePage";
import Feed from "./Pages/HomePage/Feed/Feed";

describe("unit testing for chatter App", () => {
  test("renders login page correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <LoginPage />
      </Router>
    );
    expect(getByText("LOGIN")).toBeInTheDocument();
    expect(getByPlaceholderText("johndoe@gmail.com")).toBeInTheDocument();
    expect(getByPlaceholderText("**********")).toBeInTheDocument();
  });
  
  test('returns an encoded email', () => {
      const result = secretEmail("balogunkehinde3@gmail.com")
      const expected = "ba*************@gmail.com"
      expect(result).toEqual(expected)
  });
 
  test("renders homepage", async () => {
   const { getByText, getByPlaceholderText } = render(
      <Router>
        <Feed />
      </Router>
    )

    const Write = getByText(/Write/i);
    fireEvent.click(Write)

    expect(await getByPlaceholderText(/Title/i)).toBeInTheDocument();

  })
  
});
