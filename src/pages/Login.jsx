import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export let userID;

const Login = () => {
  const navigate = useNavigate();
  const url = "https://localhost:7282/api/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(url, { params: { email: email, userPass: password } })
      .then((response) => {
        const getData = response.data;
        
        setUserInfo(getData.data);
      });
    console.log(userInfo);
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold fs-4 mb-4">Login</h3>

              <Form className="auth_form">
                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                {/*Get email and pass pag ininput na ni user */}
                <FormGroup className="form_group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <button
                  type="submit"
                  className="buy_btn auth_btn"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span>Create an account</span>
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
