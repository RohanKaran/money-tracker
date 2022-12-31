import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { baseURL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function SelectUsers(props) {
  const api = useAxios();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get(baseURL + "/user/")
      .then((res) => setUsers(res.data))
      .catch((e) => {
        if (e.status === 401 || e.status === 403) {
          navigate("/login");
        }
        console.log(e);
      });
  }, []);
  const appendUser = (u) => {
    let user = u;
    u.amount = null;
    for (let i in props.selectedUsers) {
      if (user.id === props.selectedUsers[i].id) return;
    }
    props.setSelectedUsers([...props.selectedUsers, user]);
  };

  return (
    <div>
      <ListGroup style={{ height: "200px", overflowY: "scroll" }}>
        {users?.length > 0
          ? users.map((user) => (
              <ListGroupItem
                style={{ width: "100%" }}
                key={user.id}
                onClick={() => appendUser(user)}
              >
                {user.username}
              </ListGroupItem>
            ))
          : null}
      </ListGroup>
    </div>
  );
}
