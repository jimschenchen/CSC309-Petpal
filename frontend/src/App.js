// import logo from './logo.svg';
// import './App.css';

import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth/Auth';
import Application from './pages/Application/Application';

function Webpages() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path="/">
        <Route index element={<Home />} />
      </Route>

      <Route exact path="auth/*" element={<Auth/>}/>
      <Route exact path="application/*" element={<Application/>}></Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>);
}

function App() {
  return <Webpages/>;
}

export default App;
