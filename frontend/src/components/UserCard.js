import { Button, Col, Container, Image, Row } from "react-bootstrap";
import React from "react";
import { baseURL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";

export default function UserCard(props) {
  const api = useAxios();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api
      .put(baseURL + `/friend/${props.id}/accept/`)
      .then((res) => {
        navigate("/friends");
        window.location.reload();
      })
      .catch((e) => alert(e));
  };
  return (
    <div className="custom-card">
      <br />
      <br />
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
                  {props.user.username}
                </Row>
                {props.user.email ? (
                  <Row>{props.user.email}</Row>
                ) : (
                  <Row align={"right"}>
                    <Button onClick={handleSubmit}>Accept</Button>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
