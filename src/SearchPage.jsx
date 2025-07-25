import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (state) {
      fetch(`https://eventdata.onrender.com/cities/${state}`)
        .then((res) => res.json())
        .then(setCities);
    } else {
      setCities([]);
      setCity("");
    }
  }, [state]);

  const performSearch = () => {
    if (state && city) {
      fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          setHasSearched(true);
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          performSearch();
        }}
      >
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
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!state}
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" id="searchBtn">
          Search
        </button>
      </form>

      {hasSearched && (
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
