import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import AddItemForm from './crud';
import Succeses from './succeses';
import ListWithButtons from './list';
import Contacts from './listofcontacts/contacts';
import Forms from './listofcontacts/forms';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="" Component={Contacts} />
        <Route exact path="/success" Component={Succeses} />
        <Route exact path="/list" Component={ListWithButtons} />
        <Route exact path="/forms" Component={Forms} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
