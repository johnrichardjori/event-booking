import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState(["Austin"]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch states on mount
  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((r) => r.json())
      .then(setStates);
  }, []);

  // Fetch cities whenever a state is chosen
  useEffect(() => {
    if (state) {
      fetch(`https://eventdata.onrender.com/cities/${state}`)
        .then((r) => r.json())
        .then(setCities);
    } else {
      // reset cities and selection when state is cleared
      setCities([]);
      setCity("");
    }
  }, [state]);

  const performSearch = () => {
    if (!state || !city) return;
    fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
        setHasSearched(true);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          performSearch();
        }}
      >
        {/* State dropdown container always present */}
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
            {/* if no states loaded yet, we still render an empty list */}
          </ul>
        </div>

        <div id="city"></div>

        {/* City dropdown container always present */}
        <div id="city">
          <ul>
            {cities.map((c) => (
              <li key={c} onClick={() => setCity(c)}>
                {c}
              </li>
            ))}
            {/* initially cities = [], so this is an empty <ul> */}
          </ul>
        </div>

        {/* Search button, hidden/disabled until both selected if you like */}
        <button type="submit" id="searchBtn" disabled={!state || !city}>
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
        </div>
      )}
    </div>
  );
}
