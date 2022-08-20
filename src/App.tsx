import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NewSecretForm from "./pages/NewSecret";
import OpenSecret from "./pages/OpenSecret";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={"/new-secret"} replace />} />
        <Route path="/new-secret" element={<NewSecretForm />} />
        <Route path="/open-secret/:secretID" element={<OpenSecret />} />
        <Route path="*" element={<Navigate to={"/new-secret"} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
