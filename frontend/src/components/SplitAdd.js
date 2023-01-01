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
      .catch((e) => alert(e.response.data.detail || e));
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
                  className="textarea"
                  type="text"
                  placeholder="Enter description"
                  as={"textarea"}
                  rows={2}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="form-label">Selected Users</Form.Label>
                {selectedUsers?.length > 0 ? (
                  <div>
                    <Table>
                      <thead>
                        <tr>
                          <th>Usernames</th>
                          <th>Amounts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedUsers.map((selectedUser) => (
                          <tr>
                            <td>{selectedUser.username}</td>
                            <td>
                              <FormControl
                                type={"number"}
                                defaultValue={0}
                                onChange={(e) => {
                                  const re = /^[0-9\b]+$/;
                                  if (
                                    e.target.value === "" ||
                                    re.test(e.target.value)
                                  ) {
                                    selectedUser.amount = parseInt(
                                      e.target.value
                                    );
                                    let ta = 0;
                                    for (let i in selectedUsers) {
                                      if (!isNaN(selectedUsers[i].amount))
                                        ta += selectedUsers[i].amount;
                                    }
                                    setTotalAmount(ta);
                                  }
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div>You have not selected any users yet</div>
                )}
              </Form.Group>
              <Tabs
                className="mb-3"
                fill
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab title={"Friends"} eventKey={"friends"}>
                  <SelectFriends
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </Tab>
                <Tab title={"All Users"} eventKey={"all-users"}>
                  <SelectUsers
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </Tab>
              </Tabs>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>Total Amount : {totalAmount}</div>
            <Button variant="success" type="submit" style={{ marginLeft: 20 }}>
              Create
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
