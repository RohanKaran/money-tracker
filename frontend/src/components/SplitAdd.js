import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCut } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import SelectUsers from "./SelectUsers";

export default function SplitAdd() {
  const api = useAxios();
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("friends");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await api
    //   .post("/password/add-password/", {
    //     title: e.target.title.value,
    //     username: e.target.username.value,
    //     password: encryptedPassword.password,
    //     iv: encryptedPassword.iv,
    //     website: e.target.website.value,
    //   })
    //   .then(() => {
    //     handleClose();
    //     history.push("/");
    //     window.location.reload();
    //   })
    //   .catch((err) => alert(err.data));
  };
  console.log(selectedUsers);
  return (
    <>
      <Modal
        contentClassName="custom-modal"
        id="modal"
        show={show}
        onHide={handleClose}
        align="center"
        centered
        size="lg"
        style={{ fontFamily: "Montserrat" }}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Create New Split</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div align="left">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  className="text-area"
                  placeholder="Enter a name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="form-label">
                  Description (optional)
                </Form.Label>
                <Form.Control
                  className="text-area"
                  type="text"
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username" required>
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control
                  type="text"
                  className="text-area"
                  placeholder="Enter username/email/phone no"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Label />
                <Form.Control
                  className="text-area1"
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
              </Form.Group>
              <Tabs
                className="mb-3"
                fill
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab title={"Friends"} eventKey={"friends"}>
                  <SelectUsers
                    url={"/friend/"}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </Tab>
                <Tab title={"All Users"} eventKey={"all-users"}>
                  <SelectUsers
                    url={"/user/"}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </Tab>
              </Tabs>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div
        className="header-home"
        style={{ paddingTop: "2rem", width: "15rem" }}
      >
        <Button onClick={handleShow} style={{ width: "10rem" }}>
          <FaCut style={{ marginBottom: 3 }} /> Split
        </Button>
      </div>
    </>
  );
}
