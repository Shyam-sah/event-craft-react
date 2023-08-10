import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../features/eventDetailSlice";
import '../PopupMessage.css';
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true);

    try {
      await dispatch(createEvent(formData));
      setShowPopup(true); 
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setTimeout(() => {
        setShowPopup(false); 
        navigate("/view");

      }, 1000);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ''}
          onChange={handleChange}
        /> <br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description || ''}
          onChange={handleChange}
        /> <br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location || ''}
          onChange={handleChange}
        /> <br />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price || ''}
          onChange={handleChange}
        /> <br />

        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date || ''}
          onChange={handleChange}
        /> <br />
        <input
          type="time"
          id="timeInput"
          name="time"
          placeholder="Time"
          value={formData.time || ''}
          onChange={handleChange}
        /> <br />
        <button type="submit" disabled={showPopup}>
          {showPopup ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {showPopup && (
        <div>
          <p>Your form has been submitted successfully!</p>
        </div>
      )}
    </div>
  );
};


export default CreateEvent;