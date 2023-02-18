import React from "react";
import { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import "../../styles/popupadduser.css";
import axios from "axios";
import { toast } from "react-toastify";

const PopUpAddUser = (props) => {
  const url = "https://localhost:7282/api/AdminAddUsers";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");

  const closePopup = () => {
    props.setTrigger(false);
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setUserType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        email: email,
        password: password,
        userType: usertype,
      });
      closePopup();
      toast.success("User added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return props.trigger ? (
    <div className="AddUser-main">
      <div className="AddUser-inner">
        <i class="ri-close-circle-line" onClick={closePopup}></i>
        <Form className="prod_form">
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
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form_group">
            <input
              type="text"
              placeholder="User Type"
              value={usertype}
              onChange={(e) => setUserType(e.target.value)}
            />
          </FormGroup>

          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUpAddUser;
