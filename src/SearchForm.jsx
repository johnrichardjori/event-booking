import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const nav = useNavigate();

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
    }
  }, [state]);

  const onSubmit = (e) => {
    e.preventDefault();
    nav(`/results?state=${state}&city=${city}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <div id="state">
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select state</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div id="city">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select city</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <button type="submit" id="searchBtn">
        Search
      </button>
    </form>
  );
}
