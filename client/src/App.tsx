import { BrowserRouter,Route, Routes } from "react-router-dom";
import PlayerProfile from "./components/PlayerProfile";
import LoginPage from "./components/LoginPage";
import BookingForm from "./components/BookingForm";


function App() {
  return (
    <BrowserRouter>  {/* Make sure this wrapper is present */}
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/playerProfile" element={<PlayerProfile />} />
        <Route path="/bookingform" element={< BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;