import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import NewSecretForm from './components/NewSecretForm';


function App() {
  return (
    <div className="grid grid-rows-8 h-screen font-mono">
      <Header />
      <main className="row-span-6 bg-slate-400"><NewSecretForm /></main>
      <Footer />
    </div>
  );
}

export default App;
