// import logo from './logo.svg';
// import './App.css';

import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth/Auth';

function Webpages() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="teams" element={<Teams />} /> */}
      </Route>

      <Route exact path="auth/*" element={<Auth/>}/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>);
}

function App() {
  return <APIContext.Provider value={useAPIContext()}>
    <Webpages />
  </APIContext.Provider>;
}

export default App;
