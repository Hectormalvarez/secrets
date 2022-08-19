import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import NewSecretForm from "./pages/NewSecretForm";
import OpenSecret from "./pages/OpenSecret";
import SecretCreated from "./pages/SecretCreated";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={"/new-secret"} replace />} />
        <Route path="/new-secret" element={<NewSecretForm />} />
        <Route path="/secret-created/:secretID" element={<SecretCreated />} />
        <Route path="/open-secret/:secretID" element={<OpenSecret />} />
        <Route path="*" element={<Navigate to={"/new-secret"} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
