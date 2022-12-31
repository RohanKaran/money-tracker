import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Row } from "react-bootstrap";
import SplitAdd from "./SplitAdd";
import NoteModal from "./NoteModal";

export default function HeaderHome() {
  return (
    <Row>
      <Col xs="auto">
        <SplitAdd />
      </Col>
      <Col xs="auto">
        <NoteModal />
      </Col>
    </Row>
  );
}
