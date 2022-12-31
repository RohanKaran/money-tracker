import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SelectFriends from "../components/SelectFriends";
import SelectUsers from "../components/SelectUsers";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
export default function FriendPage() {
  const [key, setKey] = useState("friends");
  const [friends, setFriends] = useState([]);
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
  return (
    <div>
      <Tabs className="mb-3" fill activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab title={"Friends"} eventKey={"friends"}></Tab>
        <Tab title={"All Users"} eventKey={"all-users"}></Tab>
      </Tabs>
    </div>
  );
}
