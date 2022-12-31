import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "../components/SideBar";
import TransactionUserCard from "../components/TransactionUserCard";

export function TransactionUserPage() {
  const navigate = useNavigate();
  const api = useAxios();
  const [splitGroups, setSplitGroups] = useState([]);

  useEffect(() => {
    const getSplitGroups = async () =>
      await api
        .get("/split/group/")
        .then(async (r) => {
          setSplitGroups(r.data);
        })
        .catch((e) => {
          if (e.status === 401 || e.status === 403) {
            navigate("/login");
          }
          console.log(e);
        });
    getSplitGroups();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <SideBar />
      <Container className="home-container">
        <Row>
          <Col id="main-home">
            {splitGroups?.length > 0
              ? splitGroups.map((splitUser) => (
                  <TransactionUserCard
                    key={splitUser.destination}
                    splitUser={splitUser}
                  />
                ))
              : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
