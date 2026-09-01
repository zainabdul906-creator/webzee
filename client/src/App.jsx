import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CompanyProfile from "./pages/CompanyProfile";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:slug" element={<CompanyProfile />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}
