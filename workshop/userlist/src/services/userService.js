const baseUrl = 'http://localhost:3005/api/users';

export const getAllUsers = async () => {
    const response = await fetch(baseUrl)

    const result = await response.json();
    return result.users
}

export const getOneUser = async (userId) => {
    const response = await fetch(`${baseUrl}/${userId}`);

    const result = await response.json();
    return result;
}

export const addNewUser = async(userData) => {


 
 const response = await fetch(baseUrl, {method:'POST', headers:{"Content-Type": "application/json",}, body:JSON.stringify(userData)})


    const result = await response.json();
   
    return result.user
}

export const deleteUser = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {method:'DELETE'});
    return await response.json()
}

export const userSearch = async ( search, criteria) => {
    const response = await fetch(`${baseUrl}/?search=${search}&criteria=${criteria}`);
    return await response.json();

}