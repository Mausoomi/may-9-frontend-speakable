import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Input } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../admin-dashboard-components/Calendar.css";
import Deleteimage from "../admin-dashboard-components/Delete.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTeacher } from "../../store/actions/teachersActions";

const TeacherEditAvailability = () => {
  const { id } = useParams();
  const location = useLocation();
  const formData = location.state.formData;
  // console.log(formData);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let availability = formData.Availability;
    setTimeSlots(...availability, timeSlots);
    // console.log(timeSlots);
  }, []);

  const handleAddSlot = () => {
    if (startTime && endTime) {
      const newSlot = {
        start: startTime,
        end: endTime,
      };
      const updatedTimeSlots = { ...timeSlots };
      const dateKey = selectedDate.toDateString();
      updatedTimeSlots[dateKey] = [
        ...(updatedTimeSlots[dateKey] || []),
        newSlot,
      ];
      setTimeSlots(updatedTimeSlots);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleDeleteSlot = (index) => {
    const updatedTimeSlots = { ...timeSlots };
    const dateKey = selectedDate.toDateString();
    updatedTimeSlots[dateKey].splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleRepeatSlots = () => {
    if (startTime && endTime) {
      const selectedWeekday = selectedDate.getDay();
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0
      ).getDate();
      const updatedTimeSlots = { ...timeSlots };

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(selectedYear, selectedMonth, day);
        if (currentDate.getDay() === selectedWeekday) {
          const dateKey = currentDate.toDateString();
          if (!updatedTimeSlots[dateKey]) {
            updatedTimeSlots[dateKey] = [];
          }
          updatedTimeSlots[dateKey].push({ start: startTime, end: endTime });
        }
      }

      setTimeSlots(updatedTimeSlots);
      setModalOpen(false);
    } else {
      alert("Please select both start and end time before repeating.");
    }
  };

  const handleCalendarClick = (value) => {
    setSelectedDate(value);
    // console.log(value);
    setModalOpen(true);
  };

  // console.log(isModalOpen);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 ? "AM" : "PM";
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const tileClassName = ({ date }) => {
    const dateKey = date.toDateString();
    return timeSlots[dateKey] && timeSlots[dateKey].length > 0
      ? "has-slots"
      : null;
  };

  // console.log(timeSlots);
  const slotsForSelectedDate = timeSlots[selectedDate.toDateString()] || [];

  function removeEmptySlots(slots) {
    for (const date in slots) {
      if (slots[date].length === 0) {
        delete slots[date];
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = id;
    try {
      // console.log(timeSlots);
      removeEmptySlots(timeSlots);
      await dispatch(
        updateTeacher({
          teacherId,
          updatedData: {
            Username: formData.Username,
            // Password: formData.Password,
            Phone_Number: formData.Phone_Number,
            Address: formData.Address,
            Courses_assign: formData.Courses_assign,
            Description: formData.Description,
            Short_Title: formData.Short_Title,
            Purchase_Price: formData.Purchase_Price,
            Availability_Date: [timeSlots],
            Profile_Image: formData.Profile_Image,
            SocialLinks: formData.SocialLinks,
            Email: formData.Email,
          },
        })
      );
      // Reload the window after the dispatch is successful
      window.location.reload();
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };
  console.log("add availablitry");

  return (
    <>
      <div className="Add_Teachers_main_div d-flex flex-column align-items-center">
        <div className="listOfHr">
          <div className="calendar">
            <Calendar
              onChange={handleCalendarClick}
              value={selectedDate}
              tileClassName={tileClassName}
            />
          </div>
          <div className="list of hours">
            <h1>Make the list of hours of your choice </h1>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Time Slots for {selectedDate.toDateString()}</h2>
              <ul>
                {slotsForSelectedDate.map((slot, index) => (
                  <li key={index}>
                    {formatTime(slot.start)} - {formatTime(slot.end)}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSlot(index)}
                    >
                      <img src={Deleteimage} alt={Deleteimage} />
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <label htmlFor="start">Start Time:</label>
                <Input
                  type="time"
                  id="start"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="end">End Time:</label>
                <Input
                  type="time"
                  id="end"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <div className="Add-btn">
                  <button onClick={handleAddSlot}>Add Time Slot</button>
                  <button onClick={handleRepeatSlots}>Repeat Weekly</button>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-outline-danger"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {Object.keys(timeSlots).length > 0 && (
          <button
            className="btn btn-outline-success"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default TeacherEditAvailability;
