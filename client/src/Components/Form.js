import React, { memo, useState } from "react";
import {
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Form({ updateUserData }) {
  // console.log("Form  updateUserData:", updateUserData);
  const [firstName, setFirstName] = useState(updateUserData?.firstName ?? "");
  const [lastName, setLastName] = useState(updateUserData?.lastName ?? "");
  const [email, setEmail] = useState(updateUserData?.email || "");
  const [password, setPassword] = useState(updateUserData?.password ?? "");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted({ createUser: data }) {
      if (data) {
        console.log("createUser  data:", data);
      }
    },
  });
  const [updateUser, { errorEdit }] = useMutation(UPDATE_USER_MUTATION);

  const addUser = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  const editUser = () => {
    // console.log("update user", firstName);
    updateUser({
      variables: {
        id: updateUserData.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    if (errorEdit) {
      console.log(errorEdit);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={updateUserData ? editUser : addUser}>
        {updateUserData ? "Update User" : "Create User"}{" "}
      </button>
    </div>
  );
}

export default memo(Form);
