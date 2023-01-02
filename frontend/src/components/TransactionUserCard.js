import { Col, Container, Image, Row } from "react-bootstrap";
import React from "react";

export default function TransactionUserCard(props) {
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
                  {props.splitUser?.destination__username}
                </Row>
                <Row>
                  {props.splitUser?.total_amount > 0
                    ? "owes you " + props.splitUser.total_amount
                    : "You owe " + -parseInt(props.splitUser.total_amount)}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
