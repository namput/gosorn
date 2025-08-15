// src/main.tsx
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./Layout";
import "./index.css";

// ---------- Loading (อยู่ไฟล์นี้เลย) ----------
function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-600">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-white text-lg font-semibold tracking-wide animate-pulse">
          กำลังโหลด...
        </p>
      </div>
    </div>
  );
}

// ---------- Lazy imports (ลด unused JS) ----------
const App = lazy(() => import("./App"));
const Subdomain = lazy(() => import("./Subdomain"));
const ToastContainer = lazy(() =>
  import("react-toastify").then((m) => ({ default: m.ToastContainer }))
);
import "react-toastify/dist/ReactToastify.css";

// ---------- ตรวจโดเมน ----------
const hostname = window.location.hostname;
const isLocalhost = hostname.includes("localhost");
const isMainDomain = /^(www\.)?(guson\.co)$/.test(hostname);
const isSubdomain = !isMainDomain && !isLocalhost;

// ---------- Render ----------
createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Layout>
      <StrictMode>
        <Suspense fallback={<Loading />}>
          {isSubdomain ? <Subdomain /> : <App />}
          <ToastContainer position="top-right" autoClose={5000} />
        </Suspense>
      </StrictMode>
    </Layout>
  </HelmetProvider>
);
