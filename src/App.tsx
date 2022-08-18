import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import NewSecretForm from "./components/NewSecretForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<NewSecretForm />} />
        <Route path="/secret-created" element={<p>Created Secret</p>} />
        <Route path="/open-secret" element={<p>open secret</p>} />
      </Routes>
    </Layout>
  );
}

export default App;
