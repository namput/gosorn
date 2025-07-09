import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";  // ✅ เพิ่มเส้นทางสำหรับ Admin
import PublicRoute from "./components/PublicRoute";
import ThemeProvider from "./components/ThemeProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SelectPackage from "./pages/SelectPackage";
import CreateProfile from "./pages/CreateProfile";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import PendingStatus from "./pages/PendingStatus";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ Import หน้า Admin
import Forum from "./pages/Forum";
import CreateThread from "./pages/CreateThread";
import ThreadDetail from "./pages/ThreadDetail";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentDashboard from "./pages/student";
import StudentLoginVerify from "./pages/student/login-verify";
import StudentLoginRequest from "./pages/student/login-request";
import StudentLogout from "./pages/student/logout";
import StartSearchTutor from "./pages/student/search-tutor/start";
import StudentDetailsForm from "./pages/student/search-tutor/details";
import MatchTutorPage from "./pages/student/search-tutor/match";
import BookingPage from "./pages/student/booking/[tutorId]";
import BookingConfirmPage from "./pages/student/booking/confirm";
import MessagesPage from "./pages/student/messages";
import StudentProfilePage from "./pages/student/profile";
import Blog from "./pages/Blog";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/forum/:id" element={<ThreadDetail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ✅ Public Route */}
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/login" element={<Login />} />

                   {/* 🎯 หน้า Student */}
              <Route path="/student/login-request" element={<StudentLoginRequest />} />
              <Route path="/student/login-verify" element={<StudentLoginVerify />} />
              <Route path="/student/logout" element={<StudentLogout />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/search-tutor/start" element={<StartSearchTutor />} />
              <Route path="/student/search-tutor/details" element={<StudentDetailsForm />} />
              <Route path="/student/search-tutor/match" element={<MatchTutorPage/>} />
              <Route path="/student/booking/:tutorId" element={<BookingPage />} />
              <Route path="/student/booking/confirm" element={<BookingConfirmPage />} />
              <Route path="/student/messages" element={<MessagesPage />} />
              <Route path="/student/profile" element={<StudentProfilePage />} />
            </Route>

            {/* 🔐 Private Route (เฉพาะผู้ใช้ทั่วไป) */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/select-package" element={<SelectPackage />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/pending-status" element={<PendingStatus />} />
              <Route path="/forum/create" element={<CreateThread />} />
              <Route path="/profile" element={<Profile />} /> {/* ✅ เพิ่มเส้นทางไปยังหน้าโปรไฟล์ */}
            </Route>

            {/* 👑 Admin Route (เฉพาะ Admin เท่านั้น) */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} /> {/* ✅ เพิ่มเส้นทางไปยังหน้าโปรไฟล์ */}
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
