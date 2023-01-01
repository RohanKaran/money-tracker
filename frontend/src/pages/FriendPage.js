import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { SideBar } from "../components/SideBar";
import UserCard from "../components/UserCard";
import FriendAdd from "../components/FriendAdd";
export default function FriendPage() {
  const [key, setKey] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const api = useAxios();
  useEffect(() => {
    const getFriends = async () =>
      await api
        .get("/friend/")
        .then(async (r) => {
          setFriends(r.data);
        })
        .catch((e) => {
          if (e.status === 401 || e.status === 403) {
            navigate("/login");
          }
          console.log(e);
        });
    getFriends();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getRequests = async () =>
      await api
        .get("/friend/requests/")
        .then(async (r) => {
          setRequests(r.data);
        })
        .catch((e) => {
          if (e.status === 401 || e.status === 403) {
            navigate("/login");
          }
          console.log(e);
        });
    getRequests();
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
                <FriendAdd />
              </Col>
            </Row>
            <Tabs
              className="mb-3"
              fill
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab title={"Friends"} eventKey={"friends"}>
                {friends?.length > 0 ? (
                  friends.map((friend) => (
                    <UserCard key={friend.id} user={friend.user2} />
                  ))
                ) : (
                  <div style={{ marginTop: "2rem" }}>No friends to show</div>
                )}
              </Tab>

              <Tab title={"Friend Requests"} eventKey={"requests"}>
                {requests?.length > 0 ? (
                  requests.map((request) => (
                    <UserCard
                      key={request.id}
                      user={request.user1}
                      id={request.id}
                    />
                  ))
                ) : (
                  <div style={{ marginTop: "2rem" }}>
                    No friend requests to show
                  </div>
                )}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
