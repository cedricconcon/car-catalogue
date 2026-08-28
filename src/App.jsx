import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Trims from "./pages/Trims";
import Heritage from "./pages/Heritage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Financing from "./pages/Financing";
import Ownership from "./pages/Ownership";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/trims" element={<Trims />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/financing" element={<Financing/>} />
        <Route path="/ownership" element={<Ownership/>} />
        <Route
          path="/admin"
          element={
            session ? (
              <AdminDashboard onLogout={() => supabase.auth.signOut()} />
            ) : (
              <AdminLogin onLogin={() => {}} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;