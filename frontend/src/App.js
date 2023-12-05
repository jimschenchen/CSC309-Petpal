// import logo from './logo.svg';
import './App.css';

import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Shelter_Details from './pages/Shelter_pages/shelter_details';
import PetsManagement from './pages/Shelter_pages/manage_pets';
import PetsCreation from './pages/Shelter_pages/create_pet';
import ApplicationManagement from './pages/Shelter_pages/manage_applications';
import PetsUpdate from './pages/Shelter_pages/update_pet';
import AddReview from './pages/Shelter_pages/add_review';


function Webpages() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="teams" element={<Teams />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />

      <Route path="shelter_details" element={<Shelter_Details />} />
      <Route path="manage_pets" element={< PetsManagement/>} />
      <Route path="create_pet" element={< PetsCreation/>} />
      <Route path="manage_applications" element={< ApplicationManagement/>} />
      <Route path="update_pet" element={< PetsUpdate/>} />
      <Route path="add_review" element={< AddReview/>} />
      
      

    </Routes>
  </BrowserRouter>;
}

function App() {
  return <APIContext.Provider value={useAPIContext()}>
    <Webpages />
  </APIContext.Provider>;
}

export default App;
