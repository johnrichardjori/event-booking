import { useLocalStorage } from "./useLocalStorage";

export default function MyBookings() {
  const [bookings, setBookings] = useLocalStorage("bookings", []);

  const remove = (i) => {
    const copy = [...bookings];
    copy.splice(i, 1);
    setBookings(copy);
  };

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      <ul>
        {bookings.map((b, i) => (
          <li key={`${b.eventName}-${i}`}>
            <h3>{decodeURIComponent(b.eventName)}</h3>
            <p>
              {b.date} @ {b.timeSlot}
            </p>
            <button onClick={() => remove(i)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
