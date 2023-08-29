import React from "react";
import { Link } from "react-router-dom";
export default function Footer(props) {
  return (
    <>
      <nav
        className={
          props.isSticky
            ? "navbar fixed-bottom navbar-expand-lg bg-success navbar-dark custom-footer "
            : "navbar navbar-expand-lg bg-success navbar-dark custom-footer"
        }
      >
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></Link>
          <span className="text-white">© 2023 doofie!, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex"></ul>
      </nav>
    </>
  );
}
