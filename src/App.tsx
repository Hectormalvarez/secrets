import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css"
import Layout from "./components/layout/Layout"; 

import NewSecret from "./pages/NewSecret";
import OpenSecret from "./pages/OpenSecret";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home page is new-secret; "/" and mismatches */}
        <Route path="/new-secret" element={<NewSecret />} />
        <Route path="/" element={<Navigate to={"/new-secret"} replace />} />
        <Route path="*" element={<Navigate to={"/new-secret"} replace />} />
        {/* Open Secret Page; secretID url parameter */}
        <Route path="/open-secret/:secretID" element={<OpenSecret />} />
      </Routes>
    </Layout>
  );
}

export default App;
