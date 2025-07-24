import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((r) => r.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (state) {
      fetch(`https://eventdata.onrender.com/cities/${state}`)
        .then((r) => r.json())
        .then(setCities);
    } else {
      setCities([]);
      setCity("");
    }
  }, [state]);

  useEffect(() => {
    if (state && city) {
      fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
        .then((r) => r.json())
        .then(setEvents);
    } else {
      setEvents([]);
    }
  }, [state, city]);

  return (
    <div>
      <form>
        <div id="state">
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </form>

      {state && city && (
        <div>
          <h1>
            {events.length} events available in {city}
          </h1>
          <ul>
            {events.map((e) => (
              <li key={e.address}>
                <h3>{e.eventName}</h3>
                <p>{e.address}</p>
                <p>Rating: {e.overallRating ?? e.rating}</p>
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
        </div>
      )}
    </div>
  );
}
