import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Signup = () => {
  const navigate = useNavigate();
  const url = "https://localhost:7282/api/AddUsers";
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(url, {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        email: email,
        password: password,
      });
      toast.success("User added successfully!");
      navigate(`/login`);
    } catch (error) {console.log(error)}
  };


  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold fs-4 mb-4">Signup</h3>

              <Form className="auth_form">
                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="file"
                    value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <button
                  type="submit"
                  className="buy_btn auth_btn"
                  
                  onClick={handleSignup}
                >
                  Sign up
                </button>
                <p>
                  Alread have an account? <Link to="/login">Login</Link>{" "}
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
