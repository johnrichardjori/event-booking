import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function EventList() {
  let [params] = useSearchParams();
  const state = params.get("state");
  const city = params.get("city");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
      .then((r) => r.json())
      .then(setEvents);
  }, [state, city]);

  return (
    <>
      <h1>
        {events.length} events available in {city}
      </h1>
      <ul>
        {events.map((e) => (
          <li key={e.address}>
            <h3>{e.eventName}</h3>
            <p>{e.address}</p>
            <p>Rating: {e.rating}</p>
            <Link
              to={`/booking/${encodeURIComponent(
                e.eventName
              )}/${city}/${state}`}
            >
              <button>Book FREE Event</button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
