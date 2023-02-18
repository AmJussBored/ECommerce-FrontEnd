import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

import "../styles/userlist.css"
import PopUpAddUser from '../components/UI/PopUpAddUser';
import PopUpEditUser from '../components/UI/PopUpEditUser';

const Userlist = () => {
  const url = "https://localhost:7282/api/GetUsers";
  const [users, setUsers] = useState([]);
  const [addPopup, setPopup] = useState(false);

  useEffect(() => {
    axios.get(url).then(function (user) {
      const getUsers = user.data;
      setUsers(getUsers);
    })
    
  },[users])




  return (
    <Helmet title = "User list">
      <section>
        <Container>
          <Row>
            <Col>
              <table className='table bordered'>
                <thead>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  {
                    users.map((item) => (<Tr user={item}/>))
                  }
                  <tr>
                    <i
                      class="ri-add-circle-line"
                      onClick={() => setPopup(true)}
                    ></i>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
        <PopUpAddUser trigger={addPopup} setTrigger={setPopup}/>
      </section>
    </Helmet>
  )
}


const Tr = ({ user }) => {

  const deleteProduct = () => {
    const DeleteUrl =
      "https://localhost:7282/api/DeleteUser/" + user.userID;
    axios.delete(DeleteUrl);
    toast.success("Product deleted successfully!");
  };

  const [editPopup, setEditPopup] = useState(false);

  return (
    <tr>
      <td>{user.userID}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.userType}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={() => setEditPopup(true)}
          class="ri-edit-line"
        ></motion.i>
        <PopUpEditUser
        data={user}
        trigger={editPopup}
        setTrigger={setEditPopup}/>
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};



export default Userlist


