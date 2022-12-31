import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import TransactionCard from "../components/TransactionCard";
import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "../components/SideBar";
import SplitAdd from "../components/SplitAdd";
import BalanceAdd from "../components/BalanceAdd";

export function HomePage() {
  const navigate = useNavigate();
  const api = useAxios();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getSplits = async () =>
      await api
        .get("/split/")
        .then(async (r) => {
          setTransactions(r.data);
        })
        .catch((e) => {
          if (e.status === 401 || e.status === 403) {
            navigate("/login");
          }
          console.log(e);
        });
    getSplits();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getBalance = async () =>
      await api
        .get("/user/balance/")
        .then(async (r) => {
          setBalance(r.data.balance);
        })
        .catch((e) => {
          if (e.status === 401 || e.status === 403) {
            navigate("/login");
          }
          console.log(e);
        });
    getBalance();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SideBar />
      <Container className="home-container">
        <Row>
          <Col className={"main-home"}>
            <Row>
              <Col xs="auto">
                <SplitAdd />
              </Col>
              <Col xs="auto">
                <BalanceAdd />
              </Col>
              <Col xs="auto">
                <div
                  style={{
                    fontFamily: "Abril Fatface",
                    fontSize: "x-large",
                    paddingTop: "2rem",
                  }}
                >
                  Balance : {balance}
                </div>
              </Col>
            </Row>
            {transactions?.length > 0
              ? transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.transaction__id}
                    transaction={transaction}
                  />
                ))
              : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
