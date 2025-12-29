<<<<<<< Updated upstream
function App() {
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import StatisticsPage from "./pages/StatisticsPage";
import CreateHabitPage from "./pages/CreateHabitPage";
import EditHabitPage from "./pages/EditHabitPage";
import { Provider } from "react-redux";
import { store } from "./store";
>>>>>>> Stashed changes

export default function App() {
  return (
<<<<<<< Updated upstream
    <>
      <h1>Hello, World!</h1>
    </>
  )
}
=======
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
>>>>>>> Stashed changes

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-habit"
            element={
              <ProtectedRoute>
                <CreateHabitPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <StatisticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/habits/:id/edit"
            element={
              <ProtectedRoute>
                <EditHabitPage />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}
