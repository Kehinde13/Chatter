import {  render } from "@testing-library/react";
import LoginPage from "./Auth/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { secretEmail } from "./utils/helper";
import { BlogContext } from "./Context/Context";
import ForYou from "./Pages/HomePage/Feed/ForYou";



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
 
  test('renders Loading component when postLoading is true', () => {
    const mockBlogContext = {
      posts: [],
      postLoading: true,
    };

    const { getByTestId } = render(
      <BlogContext.Provider value={mockBlogContext}>
        <ForYou />
      </BlogContext.Provider>
    );

    expect(getByTestId('loading')).toBeInTheDocument();
  });
 
  
});

