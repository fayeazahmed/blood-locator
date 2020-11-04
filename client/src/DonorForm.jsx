import React, { useState } from "react";

export default function DonorForm({ submitForm, closeButton }) {
  const closeButtonStyles = {
    float: "right",
    cursor: "pointer",
    fontSize: 20,
    borderRadius: 10,
  };

  const [name, setName] = useState("");
  const [bg, setBg] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(name, bg, address, contact, password);
  };

  return (
    <form onClick={(e) => e.stopPropagation()} className="donor-form" onSubmit={handleSubmit}>
      <i
        className="fa fa-times-circle btn btn-sm btn-danger"
        style={closeButtonStyles}
        aria-hidden="true"
        onClick={closeButton}
      ></i>
      <label htmlFor="name">Name:</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        id="name"
        className="form-control"
        required
      />
      <label htmlFor="bg">Blood group:</label>
	  <select
          onChange={(event) => setBg(event.target.value)}
          name="bg"
          id="bg"
          defaultValue="A+"
          className="form-control"
        >
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      <label htmlFor="address">Address:</label>
      <input
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        type="text"
        id="address"
        className="form-control"
        required
      />
      <label htmlFor="contact">Contact info:</label>
      <input
        onChange={(e) => setContact(e.target.value)}
        value={contact}
        type="text"
        id="contact"
        className="form-control"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        id="password"
        className="form-control"
        required
      />
      <small className="d-block text-left">
        Add a password to delete your entry later
      </small>
      <button className="btn btn-block btn-success my-3">Add me!</button>
    </form>
  );
}
