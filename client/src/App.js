import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import axios from "axios";
import DonorForm from "./DonorForm";
import Nav from "./Nav";
import DonorInfo from "./DonorInfo";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.770885,
    longitude: 90.3949981,
    zoom: 15,
  });
  const [donors, setDonors] = useState(null);
  const [modal, setModal] = useState(false);
  const [submission, setSubmission] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [bloodGroup, setBloodGroup] = useState("B+");
  const [showPopUp, setShowPopUp] = useState({});
  const [entryDeleted, setEntryDeleted] = useState(0);

  useEffect(() => {
    const getDonor = async () => {
	  const res = await axios.get("/api/blood/");
      setDonors(res.data);
    };

    getDonor();
  }, [submission, entryDeleted]);

  const openModal = async (lat, long) => {
    setModal(!modal);
    setLat(lat);
    setLong(long);
  };

  const geolocateStyle = {
    float: "left",
    margin: "120px 50px",
    padding: "10px",
  };

  const handleBloodGroup = (bg) => {
	setBloodGroup(bg)
	setModal(false)
  }
  const handleEntryDelete = () => {
    setEntryDeleted(entryDeleted + 1);
  };

  const submitForm = async (name, bg, address, contact, password) => {
    const formData = {
      name,
      bloodGroup: bg,
      address,
      contact,
      password,
      latitude: lat,
      longitude: long,
    };
    await axios.post("/api/blood/", formData);
    setModal(false);
    setSubmission(true);
    setTimeout(() => {
      setSubmission(false);
    }, 2500);
  };

  return (
    <div className="App">
	  <Nav handleBloodGroup={handleBloodGroup} />
      <ReactMapGL
        mapboxApiAccessToken={TOKEN}
        {...viewport}
        onViewportChange={setViewport}
        onClick={() => setShowPopUp({})}
        onDblClick={(event) => openModal(event.lngLat[1], event.lngLat[0])}
        doubleClickZoom={false}
      >
        {submission ? (
          <div className="success-alert">
            <i className="fa fa-check" aria-hidden="true"></i>
            <span>Submitted successfully!</span>
          </div>
        ) : null}
        {modal && (
          <DonorForm
            submitForm={submitForm}
            closeButton={() => setModal(false)}
          />
        )}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={false}
          onGeolocate={(obj) =>
            openModal(obj.coords.latitude, obj.coords.longitude)
          }
        />
        {donors
          ? donors.map((donor) => {
              return donor.bloodGroup === bloodGroup ? (
                <Marker
                  latitude={donor.latitude}
                  longitude={donor.longitude}
                  offsetLeft={-20}
                  offsetTop={-10}
                  key={donor._id}
                >
                  <i
                    onClick={() => setShowPopUp({ [donor._id]: true })}
                    className="fa fa-tint fa-2x text-danger"
                    style={{ cursor: "pointer" }}
                    aria-hidden="true"
                  ></i>
                  {showPopUp[donor._id] === true ? (
                    <DonorInfo
                      handleEntryDelete={handleEntryDelete}
                      donor={donor}
                    />
                  ) : null}
                </Marker>
              ) : null;
            })
          : null}
      </ReactMapGL>
    </div>
  );
}
//
const TOKEN =
  "pk.eyJ1IjoiZmF5ZWF6YWhtZWQiLCJhIjoiY2tjYW5paHF2MWtsMjJycWVkMzB2YzAwcyJ9.ZuCDw7Z9JflJotaK8TRLhQ";

export default App;

/* <Marker
			latitude={donor.latitude}
			longitude={donor.longitude}
			offsetLeft={-20}
			offsetTop={-10}
			key={donor._id}
		  >
			<i
			  //onClick={() => setShowPopUp({ [donor._id]: true })}
			  className="fa fa-tint fa-2x text-danger"
			  aria-hidden="true"
			></i>
		  </Marker> */
