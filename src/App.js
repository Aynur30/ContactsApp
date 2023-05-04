import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './listofcontacts/contacts';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="" Component={Contacts} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
