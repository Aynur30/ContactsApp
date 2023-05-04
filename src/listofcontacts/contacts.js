
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
Modal.setAppElement('#root');


function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorStatusCode, setErrorStatusCode] = useState(null);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const host = "http://localhost:3000";

  useEffect(() => {
    axios.get(host+'/api/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDeleteContact = (id) => {
    axios.delete(host+`/api/contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(host+'/api/contacts', { name, number })
      .then(response => {
        setContacts([...contacts, response.data]);
        closeModal();
        setErrorStatusCode(0);
      })
      .catch(error => {
        if(error.request.status === 400){
          console.log("error")
          setErrorStatusCode(400);
        }
      });
  };
  

  return (
    <>
      <div className="Contacts">
        <h1>Contacts</h1>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <div className="gen">
                <div className='div1'>
                  <div  className='s'>Имя: <span>{contact.name}</span></div>
                  <div className='s'>Телефон: <span>{contact.number}</span></div>
                  
                </div>
                <div className='div2'>
                  <button className='ad' onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </div>
              </div>
            </li>
          )).reverse()}
        </ul>
        <button className="addContacts" onClick={openModal}>Add Contact</button>
      </div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Contact"
      appElement={document.getElementById('root')}
      >

        <h2>Add Contact</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={errorStatusCode === 400 ? 'error' : ''} />
          <label htmlFor="number">Number</label>
          <input type="text" id="number" value={number} onChange={e => setNumber(e.target.value)} className={errorStatusCode === 400 ? 'error' : ''} />
          <button type="submit">Save</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </>
  );
}

export default Contacts;
