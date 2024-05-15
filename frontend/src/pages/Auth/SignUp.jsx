import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { PostApiCall } from "../../utils/Axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required");
      return false;
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = await PostApiCall("/api/auth/signUp", formData);
    if (data.success) {
      toast.success("Verify Your Email and than proceed to login");
      setLoading(false);
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container h-75 d-flex justify-content-center align-content-center">
        <form className="d-flex flex-column justify-content-center align-content-center">
          <h3 className="text-white w-100 text-center">Sign Up</h3>
          <div className="mb-3">
            <label className="text-white mb-2">Full name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="First name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <div className="w-100 text-center">
                  <Spinner className="" animation="border" variant="light" />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
