import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../Auth/LoginPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebase";
import GoogleSignIn from "../hooks/GoogleSignIn";
import { toast } from "react-toastify";

// Mock external dependencies
jest.mock("../hooks/GoogleSignIn");
jest.mock("firebase/auth");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));
jest.mock("../components/Loading", () => () => <div>Loading...</div>);

const mockGoogleSignIn = GoogleSignIn as jest.Mock;

const renderComponent = () =>
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

describe("LoginPage", () => {
  beforeEach(() => {
    mockGoogleSignIn.mockReturnValue({
      googleAuth: jest.fn(),
      googleLoading: false,
    });
  });

  it("should render the login page", () => {
    renderComponent();

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("johndoe@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("**********")).toBeInTheDocument();
  });


  it("should show error when inputs are empty", async () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId("login"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Input email and password");
    });
  });

  it("should call signInWithEmailAndPassword on form submit with correct inputs", async () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const passwordInput = screen.getByPlaceholderText("**********");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.submit(screen.getByTestId("login"));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(toast.success).toHaveBeenCalledWith("User has been logged in");
    });
  });
});
