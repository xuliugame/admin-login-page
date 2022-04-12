import React from "react";
import Upload from "../compontents/Upload";
import Files from "../compontents/Files";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function Home(props) {
  const navigate = useNavigate();
  function loginOut() {
    window.localStorage.clear();
    navigate("/login", { replace: true });
  }
  function scrollTop() {
    window.scrollTo(0, 0);
  }
  return (
    <div>
      <div className="d-flex w-75 m-0-a justify-content-center position-relative">
        <h1 className="text-center" style={{ fontSize: 42 }}>
          Files System
        </h1>
        <div className="float-end position-absolute name">
          <Link className="float-end ms-3" to="/login" onClick={loginOut}>
            login out
          </Link>
          <span className="float-end text-uppercase me-2 fw-bold">
            {window.localStorage.getItem("name") || ""}
          </span>
        </div>
      </div>
      <Upload />
      <Files />
      <div className="scroll-top" onClick={scrollTop} />
    </div>
  );
}

export default Home;
