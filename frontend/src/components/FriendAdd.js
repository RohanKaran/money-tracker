import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCreativeCommonsSamplingPlus } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { baseURL } from "../utils/constants";

export default function FriendAdd() {
  const api = useAxios();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api
      .post(baseURL + "/friend/add/", {
        email: e.target.email.value,
      })
      .then((res) => {
        handleClose();
        navigate("/friends");
        window.location.reload();
      })
      .catch((e) => alert(e));
  };
  return (
    <>
      <Modal
        contentClassName="custom-modal"
        show={show}
        onHide={handleClose}
        align="center"
        centered
        size="lg"
        style={{ fontFamily: "Montserrat" }}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              Send Friend Request
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div align="left">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="email"
                  placeholder="Enter email address of the user"
                  required
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" style={{ marginLeft: 20 }}>
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div
        className="header-home"
        style={{ paddingTop: "2rem", width: "15rem" }}
      >
        <Button onClick={handleShow} style={{ width: "10rem" }}>
          <FaCreativeCommonsSamplingPlus style={{ marginBottom: 3 }} /> Add
          Friend
        </Button>
      </div>
    </>
  );
}
