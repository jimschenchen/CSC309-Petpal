// import logo from './logo.svg';
// import './App.css';

import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth/Auth';
import Application from './pages/Application/Application';
import Notification from './pages/Notification/Notification';

import Shelter_Details from './pages/Shelter_pages/shelter_details';
import PetsManagement from './pages/Shelter_pages/manage_pets';
import PetsCreation from './pages/Shelter_pages/create_pet';
import ApplicationManagement from './pages/Shelter_pages/manage_applications';
import PetsUpdate from './pages/Shelter_pages/update_pet';
import AddReview from './pages/Shelter_pages/add_review';


function Webpages() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path="/">
        <Route index element={<Home />} />
      </Route>

      <Route exact path="auth/*" element={<Auth/>}/>
      <Route exact path="application/*" element={<Application/>}></Route>
      <Route exact path="notification/*" element={<Notification/>}></Route>

      <Route path="*" element={<NotFound />} />

      <Route exact path="shelter_details" element={<Shelter_Details />} />
      <Route exact path="manage_pets" element={< PetsManagement/>} />
      <Route exact path="create_pet" element={< PetsCreation/>} />
      <Route exact path="manage_applications" element={< ApplicationManagement/>} />
      <Route exact path="update_pet" element={< PetsUpdate/>} />
      <Route exact path="add_review" element={< AddReview/>} />
      
      

    </Routes>
  </BrowserRouter>);
}

function App() {
  return <Webpages/>;
}

export default App;
