import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEraser, FaPaperPlane } from "react-icons/fa";
import { baseURL } from "../utils/constants";

function RegisterPage() {
  const [alert, setAlert] = useState(null);
  const [variant, setVariant] = useState("danger");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(e.target.formUsername.value && e.target.formBasicEmail.value)) {
      setVariant("success");
      setAlert("Invalid username or email");
      return;
    }
    if (e.target.formPassword.value !== e.target.formConfirmPassword.value) {
      setVariant("success");
      setAlert("Passwords do not match");
      return;
    }
    await axios
      .post(`${baseURL}/user/register/`, {
        username: e.target.formUsername.value,
        email: e.target.formBasicEmail.value,
        password: e.target.formPassword.value,
      })
      .then(() => {
        e.target.formUsername.value = null;
        e.target.formBasicEmail.value = null;
        e.target.formPassword.value = null;
        e.target.formConfirmPassword.value = null;
        setVariant("success");
        setAlert("Check your email to complete registration");
      })
      .catch((err) => {
        setVariant("danger");
        setAlert(err.response.data.detail.toString());
      });
  };

  return (
    <div align="center" id="register">
      {/*<Logo />*/}
      <Card style={{ width: "20rem" }}>
        {alert ? <Alert variant={variant}>{alert}</Alert> : null}
        <Form onSubmit={handleSubmit}>
          <div align="left">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a unique username"
                name="username"
                autoComplete="username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                autoComplete="email"
                required
              />
              <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                name="confirm-password"
                required
              />
            </Form.Group>
          </div>

          <Button variant="success" type="submit">
            <FaPaperPlane style={{ marginBottom: 4 }} /> Signup
          </Button>
          <Button variant="outline-secondary" type="reset">
            <FaEraser style={{ marginBottom: 4 }} /> Reset
          </Button>
        </Form>
        <Link to="/login">Already have an account? Sign in.</Link>
      </Card>
    </div>
  );
}

export default RegisterPage;
