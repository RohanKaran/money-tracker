import {
  Button,
  Form,
  FormControl,
  Modal,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCut } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import SelectUsers from "./SelectUsers";
import SelectFriends from "./SelectFriends";
import { baseURL } from "../utils/constants";

export default function SplitAdd() {
  const api = useAxios();
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("friends");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let dest = [];
    let amount = [];
    for (let i in selectedUsers) {
      if (selectedUsers[i].amount >= 1) {
        dest.push(selectedUsers[i].id);
        amount.push(parseInt(selectedUsers[i].amount));
      }
    }
    await api
      .post(baseURL + "/split/create/", {
        transaction: {
          name: e.target.name.value,
          description: e.target.description.value,
        },
        destination: dest,
        amount: amount,
      })
      .then((res) => {
        handleClose();
        navigate("/");
        window.location.reload();
      })
      .catch((e) => alert(e));
  };
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
            <Modal.Title className="modal-title">Add Balance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div align="left">
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="number"
                  className="number"
                  placeholder="Enter amount"
                  required
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" style={{ marginLeft: 20 }}>
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
          <FaCut style={{ marginBottom: 3 }} /> Add Balance
        </Button>
      </div>
    </>
  );
}
