import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import Form from "./Form";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  console.log("GetUsers  data:", data);
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
          position: "fixed",
        }}
      >
        <Form />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(auto-fill)",
          gridRowGap: ".5em",
          gridColumnGap: "1em",
        }}
      >
        {" "}
        {users.map((val) => {
          return (
            <div
              style={{
                cursor: "pointer",
              }}
              key={val.id}
            >
              <h1 onClick={() => setSelectedUser(val)}>
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
