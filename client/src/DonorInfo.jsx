import React, { useState } from "react";
import axios from "axios";

export default function DonorInfo({ donor, handleEntryDelete }) {
  const { _id, name, bloodGroup, address, contact } = donor;
  const [passwordInput, setPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .post(`/api/blood/delete/${_id}`, {
        password,
      })
      .then(() => handleEntryDelete())
      .catch((error) => {
        setPassword("");
        setInvalid(true);
        setTimeout(() => {
          setInvalid(false);
        }, 2000);
      });
  };

  return (
    <div className="donor-info">
      <p className="text-left">{name}</p>
      <p className="text-left text-danger">
        <strong>{bloodGroup}</strong>
      </p>
      <p className="text-left">{address}</p>
      <p className="text-left">
        <i>{contact}</i>
      </p>
      <div className="position-relative overflow-hidden">
        <button
          onClick={() => setPasswordInput(true)}
          className="btn btn-sm btn-block btn-danger"
        >
          Delete Entry
        </button>
        {passwordInput && (
          <form onSubmit={handleDelete}>
            <input
              type="password"
              name="password"
              value={password}
              className="password-input form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        )}
        {invalid && (
          <div className="alert-danger mt-2 p-1">
            <small className="d-block text-left">Wrong password</small>
            <small className="d-block text-left">Don't mess around</small>
          </div>
        )}
      </div>
    </div>
  );
}
