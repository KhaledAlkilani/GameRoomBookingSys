import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import PlayerProfile from "./components/Player/PlayerProfile";
import BookingForm from "./components/GameRoomBookingForm/BookingForm";
import Root from "./components/Routes/Root";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Root />}>
          <Route path="/profile" element={<PlayerProfile />} />
          <Route path="/new-booking" element={<BookingForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
