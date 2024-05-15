import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PostApiCall } from "../../utils/Axios";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  // Initialize state variables
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(false); // State variable for loading spinner
  const [formData, setFormData] = useState({
    // State variable for form data
    email: "",
    password: "",
  });

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate form inputs
  const validateForm = () => {
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid Email");
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true); // Start loading spinner
    const data = await PostApiCall("/api/auth/login", formData); // Make API call
    if (data.success) {
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      toast.success("Login Successful"); // Display success message
      navigate("/"); // Redirect to home page
    }
    setLoading(false); // Stop loading spinner
  };

  // JSX for login form
  return (
    <>
      <div className="container h-75 d-flex justify-content-center align-content-center">
        <form className="d-flex flex-column justify-content-center align-content-center">
          <h3 className="text-white w-100 text-center">Log In</h3>
          <div className="mb-3">
            <label className="text-white mb-2">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <div className="w-100 text-center">
                  <Spinner className="" animation="border" variant="light" />
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
