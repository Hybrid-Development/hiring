import { useEffect, useState } from 'react';
import Modal from '../components/Modal'
import AlbumsPreiew from '../components/AlbumsPreview';
import {getUsers} from '../services/user'
import '../styles/usuarios.css'

export default function Usuarios() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers().then(resp => {
      setUsers(resp)
    })
  }, [])

  const [currentUser, setCurrentUser] = useState({})

  const [modalOpen, setModalOpen] = useState(false)
  const handleModal = (user) => {
    setModalOpen(!modalOpen)
    setCurrentUser(user)
    !modalOpen === true && localStorage.setItem('user_id', user.id)
    !modalOpen === false && localStorage.removeItem('user_id')
  }
  return (<>
    <main>
      <ul>
        {users.map((user, index) => 
          <li key={index}><button type="button" onClick={() => handleModal(user)}>ver galeria</button></li>
        )}
      </ul>
    </main>
    {modalOpen ? <Modal close={() => handleModal(currentUser)}><AlbumsPreiew user={currentUser}/></Modal> : null}
  </>);
}