// import logo from './logo.svg';
import './App.css';

import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

function Webpages() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="teams" element={<Teams />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>;
}

function App() {
  return <APIContext.Provider value={useAPIContext()}>
    <main>
      <Webpages />
    </main>
  </APIContext.Provider>;
}

export default App;
