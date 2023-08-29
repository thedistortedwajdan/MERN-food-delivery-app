import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top custom-navbar ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            doofie!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="btn btn-sm bg-white text-success rounded-pill m-1 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authtoken") ? (
                <li className="nav-item">
                  <Link
                    className="btn btn-sm bg-white text-success rounded-pill m-1 "
                    aria-current="page"
                    to="/myOrders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            {localStorage.getItem("authtoken") ? (
              <div className="d-flex">
                <div
                  className="btn btn-sm bg-white text-success rounded-pill m-1 "
                  onClick={() => {
                    setCartView(true);
                  }}
                  // to="/"
                >
                  Cart{"  "}
                  {data.length ? (
                    <Badge pill bg="success">
                      {data.length}
                    </Badge>
                  ) : null}
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                {/* </li> */}

                <div
                  className="btn btn-sm bg-danger text-white m-1"
                  // to="/login"
                  onClick={logout}
                >
                  Logout
                </div>
                {/* </li> */}
              </div>
            ) : (
              <div className="d-flex">
                <Link
                  className="btn btn-sm bg-white text-success rounded-pill m-1 "
                  to="/login"
                >
                  Login
                </Link>
                {/* </li> */}

                <Link
                  className="btn btn-sm bg-white text-success rounded-pill m-1"
                  to="/signup"
                >
                  Signup
                </Link>
                {/* </li> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
