import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

export default function Booking() {
  const { eventName, city, state } = useParams();
  const [bookings, setBookings] = useLocalStorage("bookings", []);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const nav = useNavigate();

  const timeSlots = ["Morning", "Afternoon", "Evening"];

  const submit = () => {
    setBookings([...bookings, { eventName, city, state, date, timeSlot }]);
    nav("/my-bookings");
  };

  return (
    <div>
      <h1>Book: {decodeURIComponent(eventName)}</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        max={new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]}
      />
      <div>
        <p>Today</p>
        {timeSlots.map((t) => (
          <label key={t}>
            <input
              type="radio"
              name="slot"
              value={t}
              onChange={(e) => setTimeSlot(e.target.value)}
            />
            <p>{t}</p>
          </label>
        ))}
      </div>
      <button disabled={!date || !timeSlot} onClick={submit}>
        Confirm Booking
      </button>
    </div>
  );
}
