import {useEffect, useState} from 'react'
import { addNewUser, deleteUser, getAllUsers, getOneUser, userSearch } from '../services/userService';
import { User } from './User';
import { Userdetails } from './Userdetails';
import { DeleteModal } from './DeleteModal';
import {CreateUser} from './CreateUser'
import { Spinner } from './Spinner';
import { Search } from './Search';
import { Pagination } from './Pagination';


export const Userlist = () => {

  const [users,setUsers] = useState([]);
  const [currentUser,setCurrentUsers] = useState(null);
  const [showComp, setShowComp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

useEffect (() => {
     getAllUsers()
    .then(data => {
      
      setShowLoader(false)
      setUsers(data);
     
    })
    .catch(err => console.log('Error:',err ))
},[])

const showUserDetails = (userId) => {

   getOneUser(userId)
  .then(data => { 
    setShowComp(true)
    setCurrentUsers(data.user)})
  

}

const hideInfo = () => {
  setCurrentUsers(null)
  
}

const closeModal = () => {

  setShowComp(null);
  setShowForm(false)

}

const onDeleteHandler = (userId) => {
  setShowComp(userId)
}

const onDeleteUser = async(id) => {
   await deleteUser(id);
  setUsers(users=> users.filter(u =>u._id !==id)) 
  setShowComp(null)
}

const saveUserHandler = async (userData) => {

  const createdUser = await addNewUser(userData);
 
   
    setUsers(state => [...state, createdUser])
    
    setShowForm(false)

} 

const showEditForm = async (id) => {
  const currentUser = await getOneUser(id);
  
  setCurrentUsers(currentUser.user)
  setShowComp(null)
  setShowForm(id)
}

const searchUser = async (query, criteria) => {

const result = await userSearch(query, criteria);

 setUsers(result.users)


}

const sortUsers = (crit) => {
 

 
  setUsers(prevUsers => [...prevUsers].sort((a, b) => a[crit].localeCompare(b[crit])));

 
  console.log(users);

}


  return (

    <>
     <Search searchUser={searchUser} />
      {currentUser &&  showComp && <Userdetails {...currentUser} hideInfo={hideInfo} showForm={showForm} />}
       {showComp && <DeleteModal closeModal={closeModal} onDeleteUser= {onDeleteUser} showComp = {showComp} />}
       {showForm && <CreateUser  saveUserHandler={saveUserHandler} closeModal={closeModal} {...currentUser}/>  }
    <div className="table-wrapper">
      
      {showLoader && <Spinner />}
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th  onClick = {()=>sortUsers('firstName')}>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th    onClick = {()=>sortUsers('lastName')}>
           
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => <User key={u._id} {...u} showUserDetails={showUserDetails} onDeleteHandler={onDeleteHandler} showEditForm={showEditForm}/>)}
        </tbody>
      </table>
    </div>
      <button className="btn-add btn" onClick={() => setShowForm(true)}>Add new user</button>
      <Pagination />
    </>
  );
};
