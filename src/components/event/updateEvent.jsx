import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent } from "../features/eventDetailSlice";

const updateEventForm = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateData, setUpdateEvent] = useState();
  const { events, loading } = useSelector((state) => state.event);


  useEffect(() => {
    if (id) {
      const singleUser = events.filter((ele) => ele.id === id);
      setUpdateEvent(singleUser[0]);
      console.log("singleUser", singleUser)
    }
  }, [dispatch]);

  const newData = (e) => {
    setUpdateEvent({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {   
      e.preventDefault();
      dispatch(updateEvent(updateData));
    navigate("/view");
    };

    return (
        <div>
          <h2 className="my-2">Update Event</h2>
          <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={updateData && updateData.name}
                onChange={newData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="description"
                name="description"
                className="form-control"
                value={updateData && updateData.description}
                onChange={newData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={updateData && updateData.location}
                onChange={newData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={updateData && updateData.price}
                onChange={newData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="location"
                className="form-control"
                value={updateData && updateData.date}
                onChange={newData}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={updateData && updateData.time}
                onChange={newData}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
    );
  }

export default updateEventForm;

