import React from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function MyBookings() {
  const [bookings, setBookings] = useLocalStorage("bookings", []);

  const removeBooking = (idx) => {
    const copy = [...bookings];
    copy.splice(idx, 1);
    setBookings(copy);
  };

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((b, i) => (
            <li key={`${b.eventName}-${i}`}>
              <h3>{decodeURIComponent(b.eventName)}</h3>
              <p>
                {b.date} @ {b.timeSlot}
              </p>
              <button onClick={() => removeBooking(i)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
