import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../Auth/SignUp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebase";
import GoogleSignIn from "../hooks/GoogleSignIn";
import { toast } from "react-toastify";
import { Blog } from "../Context/Context";

// Mock external dependencies
jest.mock("../hooks/GoogleSignIn");
jest.mock("firebase/auth");
jest.mock("firebase/firestore");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));
jest.mock("../components/Loading", () => () => <div>Loading...</div>);
jest.mock("../Context/Context");

const mockGoogleSignIn = GoogleSignIn as jest.Mock;
const mockBlog = Blog as jest.Mock;

const renderComponent = () =>
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

describe("SignUp", () => {
  beforeEach(() => {
    mockGoogleSignIn.mockReturnValue({
      googleAuth: jest.fn(),
      googleLoading: false,
    });
    mockBlog.mockReturnValue({
      currentUser: null,
    });
  });

  it("should render the sign-up page", () => {
    renderComponent();

    expect(screen.getByText("Register as a Writer/Reader")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("johndoe@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("**********")).toBeInTheDocument();
  });

  it("should show error when fields are empty", async () => {
    renderComponent();

    fireEvent.submit(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("All fields are required");
    });
  });

  it("should show error when passwords do not match", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("**********"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("confirmPassword"), {
      target: { value: "differentPassword" },
    });

    fireEvent.submit(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Your passwords do not match");
    });
  });

  it("should call createUserWithEmailAndPassword on valid form submission", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("**********"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("confirmPassword"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "johndoe@gmail.com",
        "password123"
      );
    });
  });

  it("should handle Firebase errors correctly", async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
      message: "Firebase error",
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("John"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("johndoe@gmail.com"), {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("**********"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("confirmPassword"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Firebase error");
    });
  });
});
