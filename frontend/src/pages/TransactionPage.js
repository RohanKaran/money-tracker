import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { SideBar } from "../components/SideBar";

export default function TransactionPage() {
  const [key, setKey] = useState("friends");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const api = useAxios();
  useEffect(() => {
    const getTransactions = async () =>
      await api
        .get("/split/completed/")
        .then(async (r) => {
          setTransactions(r.data);
        })
        .catch((e) => {
          if (e.status === 401 || e.status === 403) {
            navigate("/login");
          }
          console.log(e);
        });
    getTransactions();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <SideBar />
      <Container className="home-container">
        <Row>
          <Col className={"main-home"}>
            {transactions?.length > 0 ? (
              <Table style={{ marginTop: "2rem" }}>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Sender/Recipient</th>
                    <th>Amount</th>
                    <th>Created</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.transaction.id}</td>
                      <td>{transaction.destination.username}</td>
                      <td>{transaction.amount}</td>
                      <td>
                        {new Date(transaction.created_at).toLocaleTimeString()}
                      </td>
                      <td>
                        {new Date(transaction.updated_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div style={{ marginTop: "2rem" }}>No transaction to show</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
