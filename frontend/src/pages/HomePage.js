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
  const [sp, setSp] = useState([]);
  const[trans, setTrans] = useState([]);

  useEffect(() => {
    const getSplits = async () =>
      await api
        .get("/split/")
        .then(async (r) => {
          setSp(r.data);
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
    const getTransactions = async () =>
      await api
        .get("/transaction/")
        .then(async (r) => {
          setTrans(r.data);
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

  useEffect(() => {
    setTransactions([...sp, ...trans])
  }, [sp, trans])

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
