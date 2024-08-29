import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout";
import { Blog } from "../Context/Context"; // Mock the Blog context
/* import Loading from "../components/Loading";  */

jest.mock("../Context/Context");  // Mock the entire Context module
jest.mock("../components/Loading", () => () => <div>Loading...</div>);

const mockBlog = Blog as jest.Mock;  // Cast Blog as a jest.Mock

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <AuthLayout />
    </BrowserRouter>
  );
};

describe("AuthLayout", () => {
  it("should show loading component when loading is true", () => {
    mockBlog.mockReturnValue({ currentUser: null, loading: true });

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should navigate to /HomePage when currentUser exists", () => {
    mockBlog.mockReturnValue({ currentUser: {}, loading: false });

    renderComponent();

    // Navigate doesn't render anything, so you can't check its output directly
    // You would use an assertion like this to check if navigation happened:
    expect(window.location.pathname).toBe("/HomePage");
  });

  it("should render outlet when there is no currentUser and loading is false", () => {
    mockBlog.mockReturnValue({ currentUser: null, loading: false });

    renderComponent();

    // Outlet content is usually populated by the route, so for simplicity, we check the presence of div
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
