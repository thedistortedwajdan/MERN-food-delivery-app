import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // "http://localhost:5000/api/login";
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem("email", credentials.email);
        localStorage.setItem("authtoken", json.authtoken);
        // console.log(localStorage.getItem("authtoken"));
        navigate("/");
      } else {
        alert(json.success);
      }
    } catch (error) {
      //   console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <>
      <div>
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="email"
                              id="email"
                              className="form-control form-control-lg"
                              name="email"
                              value={credentials.email}
                              onChange={handleChange}
                            />
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="password"
                              className="form-control form-control-lg"
                              name="password"
                              value={credentials.password}
                              onChange={handleChange}
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <input
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?
                        <Link to="/signup" className="fw-bold text-body">
                          Signup
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
