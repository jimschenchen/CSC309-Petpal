// import logo from './logo.svg';
// import './App.css';

import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getUser, removeUser } from './utils/credential';

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
import ShelterAccountUpdate from './pages/Shelter_pages/edit_profile_shelter';


function Webpages() {
  return (
  <BrowserRouter>
    <Routes>
      <Route exact path="/">
        <Route index element={<Home />} />
      </Route>

      <Route exact path="auth/*" element={<Auth/>}/>
      <Route exact path="application/:applicationId" element={<Application/>}></Route>
      <Route exact path="notification/*" element={<Notification/>}></Route>

      <Route path="*" element={<NotFound />} />

      <Route exact path="shelter_detail/:userId" element={<Shelter_Details />} />
      <Route exact path="manage_pets" element={< PetsManagement/>} />
      <Route exact path="create_pet" element={< PetsCreation/>} />
      <Route exact path="manage_applications" element={< ApplicationManagement/>} />
      <Route exact path="pets/:petId" element={< PetsUpdate/>} />
      <Route exact path="add_review" element={< AddReview/>} />
      <Route exact path="create_applications" element={< CreateApplication/>} />
      <Route exact path="my_applications" element={< MyApplication/>} />
      <Route exact path="pet_details" element={< PetDetails/>} />
      <Route exact path="seeker/:userId" element={< SeekerAccountUpdate/>} />
      <Route exact path="shelter/:userId" element={< ShelterAccountUpdate/>} />
      
      
    </Routes>
  </BrowserRouter>);
}

function App() {
  if (!sessionStorage.getItem('keepUser') && !getUser().remember) {
    removeUser();
  }
  return <Webpages/>;
}

export default App;
