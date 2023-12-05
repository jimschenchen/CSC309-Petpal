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
import CreateApplication from './pages/Seeker_pages/application_form';
import MyApplication from './pages/Seeker_pages/my_application';
import PetDetails from './pages/Pet_Detail/pet_details';
import SeekerAccountUpdate from './pages/Seeker_pages/edit_profile_seeker';


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

      <Route exact path="shelter/*" element={<Shelter_Details />} />
      <Route exact path="manage_pets" element={< PetsManagement/>} />
      <Route exact path="create_pet" element={< PetsCreation/>} />
      <Route exact path="manage_applications" element={< ApplicationManagement/>} />
      <Route exact path="update_pet" element={< PetsUpdate/>} />
      <Route exact path="add_review" element={< AddReview/>} />
      <Route exact path="create_applications" element={< CreateApplication/>} />
      <Route exact path="my_applications" element={< MyApplication/>} />
      <Route exact path="pet_details" element={< PetDetails/>} />
      <Route exact path="seeker_update" element={< SeekerAccountUpdate/>} />
      
      
      

    </Routes>
  </BrowserRouter>);
}

function App() {
  return <Webpages/>;
}

export default App;
