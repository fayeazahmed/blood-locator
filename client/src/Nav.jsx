import React, { useState } from "react";

export default function Nav({ handleBloodGroup }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="nav-class d-flex justify-content-between"
      onClick={() => setShowInfo(false)}
    >
      <div>
        <p className="m-0 text-left">
          *Zoom in to your location and double click
        </p>
        <p className="m-0 text-left ml-3">OR</p>
        <p className="m-0 text-left">
          *Click the locator to add your entry (<i>more accurate)</i>
        </p>
      </div>
      <div className="text-left ml-2">
        <h4>Search for blood:</h4>
        <select
          onChange={(event) => handleBloodGroup(event.target.value)}
          name="bloodGroupSelector"
          id="bloodGroupSelector"
          defaultValue="B+"
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
      </div>
      <div className="position-relative">
        <button
          className="btn btn-lg btn-outline-info"
          onClick={(e) => {
            e.stopPropagation();
            setShowInfo(!showInfo);
          }}
        >
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </button>
        {showInfo && (
          <p className="info-div">
            As this was just made for learning purposes, all the info that are
            here right now can't be verified. Information are added by users
            themselves. If you are up for giving blood, you can add your entry.
          </p>
        )}
      </div>
    </div>
  );
}
