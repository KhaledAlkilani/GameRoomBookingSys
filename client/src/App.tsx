import { BrowserRouter, Route, Routes } from "react-router-dom";
import Players from "./components/Players";
import BasicProtectedRoute from "../routes/BasicProtectedRoute";
import AdminProtectedRoute from "../routes/AdminProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            <div>
              <h1>Home page</h1>
            </div>
          }
        />

        {/* Protected route (any logged in user) */}
        <Route
          path="/players"
          element={
            <BasicProtectedRoute>
              <Players />
            </BasicProtectedRoute>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <div>
                <h1 style={{ color: "black" }}>Admin Dashboard</h1>
              </div>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
