import React, { useContext, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FaEraser, FaSignInAlt } from "react-icons/fa";
import { Logo } from "../components/Logo";
import AuthContext from "../context/AuthContext";

function LoginPage() {
  const { loginUser, loading } = useContext(AuthContext);
  const [value, setValue] = useState({});
  return (
    <div align="center" id="login">
      <Logo />
      <Card>
        <Form
          onSubmit={loginUser}
          onChange={() => setValue(value)}
          onReset={() => setValue({})}
        >
          <div align="left">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="username"
                autoComplete="username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                required
              />
            </Form.Group>
          </div>

          <Button variant="success" type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
                <FaSignInAlt style={{ marginBottom: 4 }} /> Login
              </>
            )}
          </Button>
          <Button variant="outline-secondary" type="reset">
            <FaEraser style={{ marginBottom: 4 }} /> Reset
          </Button>
        </Form>
        <div>
          <Link to="/register">Don&apos;t have an account? Sign up.</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
