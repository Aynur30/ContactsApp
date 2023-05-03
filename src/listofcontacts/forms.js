import React, { useState, useEffect } from 'react';
import './Contacts.css';
import Modal from 'react-modal';
import axios from 'axios';

function Forms(props) {
    const [contacts, setContacts] = useState([]);
    const [name, setNewContact] = useState('');
    const [number, setNewNumber] = useState('');
    //const [modalIsOpen, setIsOpen] = React.useState(false);
    const [IsClose, setIsOpen] = React.useState(false);
  
    const host = "http://localhost:3000";
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
  
    useEffect(() => {
      closeModal();
      axios.get(host+'/api/contacts')
        .then(response => {

          setContacts(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    function closeModal(event) {
      //event.preventDefault();
      setIsOpen(false);
    }

  

    const handleAddContact = (event) => {
        //event.preventDefault();
        closeModal();
        axios.post(host + '/api/contacts', { name, number })
          .then(response => {
            setContacts([...contacts, response.data]);
          })
          .catch(error => {
            console.log(error);
          });
      };
      
  
    return (
      <Modal
        isOpen={props.isOpen}
        
        IsClose={IsClose}
        style={customStyles}
        contentLabel="Example Modal"
        id="yourAppElement"
      >
        <div className='div'>
            <form>
                <h1>Add Contact</h1>
                <input type="text" value={name} onChange={e => setNewContact(e.target.value)} />
                <input type="text" value={number} onChange={e => setNewNumber(e.target.value)}/>
                <button onClick={handleAddContact} className='one'>Add</button>
                <button onClick={closeModal} className='two'>Cancel</button>
            </form>
        </div>
        
      </Modal>
    );
  }
  
export default Forms;