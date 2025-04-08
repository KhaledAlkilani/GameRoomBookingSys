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
import Calendar from "./components/GameRoomBooking/Calendar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route element={<Root />}>
        <Route path="/profile" element={<PlayerProfile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
