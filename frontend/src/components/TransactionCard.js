import {
  Button,
  Col,
  Container,
  DropdownButton,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEllipsisH,
} from "react-icons/fa";
import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import DropdownItem from "react-bootstrap/DropdownItem";
import { baseURL } from "../utils/constants";

export default function TransactionCard(props) {
  const [show, setShow] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [details, setDetails] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowupdate(false);
  const handleShowUpdate = () => setShowupdate(true);
  const handleClosePay = () => setShowPay(false);
  const handleShowPay = () => setShowPay(true);
  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);
  const api = useAxios();
  const Update = async (e) => {
    e.preventDefault();
    await api
      .put(
        baseURL + `/transaction/${props.transaction.transaction__id}/update/`,
        {
          name: e.target.name.value,
          description: e.target.description.value,
        }
      )
      .then(() => {
        handleCloseUpdate();
        window.location.reload();
      })
      .catch((err) => console.log(err.data));
  };
  const Delete = async () => {
    await api
      .delete(
        baseURL + `/transaction/${props.transaction.transaction__id}/delete/`
      )
      .then(() => {
        handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const Pay = async () => {
    await api
      .post(
        baseURL + `/split/${props.transaction.transaction__id}/pay/`
      )
      .then(() => {
        handleClosePay();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  const getDetails = async () => {
    await api
      .get(baseURL + `/split/${props.transaction.transaction__id}/details/`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="password-card">
      <div>
        <Modal
          contentClassName="custom-modal"
          id="modal"
          show={showupdate}
          onHide={handleCloseUpdate}
          align="center"
          centered
          size="lg"
          style={{ fontFamily: "Montserrat" }}
        >
          <Form onSubmit={Update}>
            <Modal.Header closeButton>
              <Modal.Title>Update Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div align="left">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a name"
                    defaultValue={props.transaction.transaction__name}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Enter description"
                    as="textarea"
                    defaultValue={props.transaction.transaction__description}
                    rows={6}
                  />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <Modal
        contentClassName="custom-modal"
        show={show}
        onHide={handleClose}
        align="center"
        centered
        size="md"
        style={{ fontFamily: "Montserrat" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "2rem" }}>Are you sure?</div>
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={Delete}>
            Yes
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        contentClassName="custom-modal"
        id="modal"
        show={showPay}
        onHide={handleClosePay}
        align="center"
        centered
        size="md"
        style={{ fontFamily: "Montserrat" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "2rem" }}>Are you sure?</div>
          You will pay {-parseInt(props.transaction.total_amount)} to {props.transaction.transaction__created_by__username}.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={Pay}>
            Yes
          </Button>
          <Button variant="outline-secondary" onClick={handleClosePay}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        contentClassName="custom-modal"
        id="modal"
        show={showDetails}
        onHide={handleCloseDetails}
        align="center"
        centered
        size="md"
        style={{ fontFamily: "Montserrat" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.transaction.transaction__name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div align={"left"}>
            {props.transaction.total_amount > 0
              ? "You have split " + props.transaction.total_amount
              : props.transaction.transaction__created_by__username +
                " have split " +
                parseInt(
                  details.reduce((partialSum, a) => partialSum + a.amount, 0)
                )}
          </div>
          {details.map((detail) => (
            <div>
              <div>
                <b>{detail.destination.username}</b> will pay {detail.total_amount}.{" "}
                <b>Status:</b> {detail.completed ? "Paid" : "Not Paid"}
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>

      <Container>
        <Row>
          <Col>
            <Row>
              <Col xs="auto">
                <div style={{ paddingRight: 0, marginRight: 0 }}>
                  <Image
                    src="favicon.ico"
                    width="20rem"
                    style={{ paddingRight: 0, marginRight: 0 }}
                  />
                </div>
              </Col>
              <Col>
                <Row style={{ fontSize: "large", fontWeight: "500" }}>
                  {props.transaction.transaction__name}
                </Row>
                <Row>
                  {props.transaction.total_amount > 0
                    ? "You have split " + props.transaction.total_amount
                    : props.transaction.transaction__created_by__username +
                      " have asked for " +
                      -parseInt(props.transaction.total_amount)}
                </Row>
              </Col>
              <Col>
                <DropdownButton
                  style={{ float: "right" }}
                  className="bg-transparent"
                  key={"start"}
                  drop={"start"}
                  variant="outline-secondary"
                  title={<FaEllipsisH />}
                >
                  {props.transaction?.total_amount > 0 ? (
                    <div>
                      <DropdownItem onClick={handleShowUpdate}>
                        Edit
                      </DropdownItem>
                      <DropdownItem onClick={handleShow}>Delete</DropdownItem>
                    </div>
                  ) : (
                    <DropdownItem onClick={handleShowPay}>Pay</DropdownItem>
                  )}

                  <DropdownItem
                    onClick={() => {
                      getDetails().then(() => handleShowDetails());
                    }}
                  >
                    Details
                  </DropdownItem>
                </DropdownButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
