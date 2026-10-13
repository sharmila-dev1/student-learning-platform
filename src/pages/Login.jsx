import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      // Store user information
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful!");
      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Welcome Back</h2>

                    <p className="text-muted">Login to continue learning.</p>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>

                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>

                  <p className="text-center text-muted mt-4 mb-0">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;
