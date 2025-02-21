import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ThemeProvider from "./components/ThemeProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SelectPackage from "./pages/SelectPackage";
import CreateProfile from "./pages/CreateProfile";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import PendingStatus from "./pages/PendingStatus";


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/select-package" element={<SelectPackage />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/pending-status" element={<PendingStatus />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
