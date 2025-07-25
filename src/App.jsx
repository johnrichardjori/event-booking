import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./SearchPage";
import Booking from "./Booking";
import MyBookings from "./MyBooking";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Find Events</Link> |{" "}
        <Link to="/my-bookings">My Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/booking/:eventName/:city/:state" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
