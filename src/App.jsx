import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
// import SearchForm from "./SearchForm";
// import EventList from "./EventList";
import Booking from "./Booking";
import MyBookings from "./MyBooking";
import SearchPage from "./SearchPage";
import "./App.css";

export default function App() {
  return (
    <HashRouter>
      <nav>
        <Link to="/">Find Events</Link> |{" "}
        <Link to="/my-bookings">My Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/booking/:eventName/:city/:state" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </HashRouter>
  );
}
