import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import RagChat from "./pages/RagChat";
import Upload from "./pages/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import Documents from "./pages/Documents";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
    path="/history"
    element={<History />}
/>

<Route
    path="/documents"
    element={<Documents />}
/>
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />
        <Route
          path="/rag"
          element={<RagChat />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;