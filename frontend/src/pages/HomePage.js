import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import TransactionCard from "../components/TransactionCard";
import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "../components/SideBar";
import SplitAdd from "../components/SplitAdd";

export function HomePage() {
  const navigate = useNavigate();
  const api = useAxios();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () =>
      await api
        .get("/split/")
        .then(async (r) => {
          // console.log(r.data);
          setTransactions(r.data);
          await api
            .get("/transaction/")
            .then((r) => {
              // console.log(r.data);
              setTransactions(() => [...r.data]);
            })
            .catch((e) => {
              if (e.status === 401 || e.status === 403) {
                navigate("/login");
              }
              console.log(e);
            });
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

  console.log(transactions);
  return (
    <div>
      <SideBar />
      <Container className="home-container">
        <Row>
          <Col id="main-home">
            <SplitAdd />
            {transactions?.length > 0
              ? transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
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
