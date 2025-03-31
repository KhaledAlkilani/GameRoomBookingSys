import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./components/Login/Login";
import PlayerProfile from "./components/Player/PlayerProfile";
import BookingForm from "./components/GameRoomBooking/BookingForm";
import Root from "./components/Routes/Root";
import Settings from "./components/Settings";
import Bookings from "./components/GameRoomBooking/Bookings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route element={<Root />}>
        <Route path="/profile" element={<PlayerProfile />} />
        <Route path="/new-booking" element={<BookingForm />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
