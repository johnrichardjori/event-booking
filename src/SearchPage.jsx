import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([" "]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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

  const performSearch = () => {
    if (state && city) {
      fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
        .then((r) => r.json())
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
          <ul>
            {states.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setState(s);
                  setCity("");
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div id="city">
          {state && (
            <ul>
              {cities.map((c) => (
                <li key={c} onClick={() => setCity(c)}>
                  {c}
                </li>
              ))}
            </ul>
          )}
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
