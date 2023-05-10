import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import Form from "./Form";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(auto-fill, 120px)",
          gridRowGap: ".5em",
          gridColumnGap: "1em",
        }}
      >
        {" "}
        {users.slice(-100).map((val) => {
          return (
            <div
              style={{
                cursor: "pointer",
              }}
            >
              <h1 key={val.id} onClick={() => setSelectedUser(val)}>
                {" "}
                {val.firstName}
                {selectedUser && selectedUser.id === val.id && (
                  <Form updateUserData={selectedUser} />
                )}
              </h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GetUsers;
