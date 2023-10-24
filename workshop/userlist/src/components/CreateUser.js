import { useState } from "react"

export  const CreateUser =  ({closeModal,saveUserHandler}) => {


    const [formValues, setFormValues] = useState({
        firstName : '',
        lastName : '',
        email: '',
        phoneNumber:'',
        imageUrl: '',
        
        country :'',
        city:'',
        street: '',
        streetNumber:''
    })

    const[errors,setErrors] = useState({
        firstName : false,
        lastName:false,
        email:false,
        imageUrl:false,
        phoneNumber:false,
        country:false,
        street:false,
        streetNumber:false
    })

    const phonePattern = /^0[1-9]{1}[0-9]{8}$/;
    const emailPattern =/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
    const imagePattern = /^https?:\/\/.+/;


    const onFormChangeHandler = (e) => {

        setFormValues(state =>({...state, [e.target.name] : e.target.value}));
        

    }

    const errCheck = (e,value,criteria,pattern) => {
        if(pattern) {
            const result = e.target.value.match(pattern)
            if(!result) {
               
                setErrors(state =>({...state, [e.target.name] : true}))
            } else {
                
                setErrors(state =>({...state, [e.target.name] : false}))
            }
        } else {

            if(value < criteria) {
                setErrors(state =>({...state, [e.target.name] : true}))
            } else {
                setErrors(state =>({...state, [e.target.name] : false}))
            }
        }
        

    }

  

    const userAddHandler = (e,data) => {
       e.preventDefault();

       
       const {country,city,street,streetNumber,firstName,lastName,imageUrl,email,phoneNumber} = data;
       const userData = {firstName,lastName,imageUrl,email,phoneNumber, address:{ country,city,street,streetNumber:Number(streetNumber)}};
      
      saveUserHandler(userData);
   
     

    }

return (

<div className="overlay">
      <div className="backdrop"></div>
      <div className="modal">
        <div className="user-container">
          <header className="headers">
            <h2>Edit User/Add User</h2>
            <button className="btn close" onClick={()=> closeModal()}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path fill="currentColor"
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                </path>
              </svg>
            </button>
          </header>
         
          <form  onSubmit={(e) => userAddHandler(e,formValues)}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-user"></i></span>
                  <input id="firstName" 
                  name="firstName" 
                  type="text"
                   value={formValues.firstName} 
                   onChange={onFormChangeHandler} 
                   onBlur={(e) => errCheck(e,formValues.firstName.length, 3)}/>
                </div>
                {errors.firstName &&
                <p className="form-error">
                  First name should be at least 3 characters long!
                </p>
                }
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-user"></i></span>
                  <input id="lastName" 
                  name="lastName" 
                  type="text" 
                  onChange={onFormChangeHandler} 
                  value={formValues.lastName} 
                  onBlur={(e) => errCheck(e,formValues.lastName.length, 3)}/>
                </div>
                {errors.lastName &&  <p className="form-error">
                  Last name should be at least 3 characters long!
                </p> }
               
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-envelope"></i></span>
                  <input id="email" 
                  name="email" 
                  type="text" 
                  onChange={onFormChangeHandler} 
                  value={formValues.email}
                  onBlur={(e) => errCheck(e,formValues.email.value,null,emailPattern)}
                  />
                </div>
                {errors.email && 
                <p className="form-error">Email is not valid!</p>

}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-phone"></i></span>
                  <input id="phoneNumber"
                   name="phoneNumber"
                    type="text" 
                    onChange={onFormChangeHandler} 
                    value={formValues.phoneNumber}
                    onBlur={(e) => errCheck(e,formValues.phoneNumber.value,null,phonePattern)}
                    
                    />
                    
                </div>
                {errors.phoneNumber && 
                <p className="form-error">Phone number is not valid!</p>
            }
              </div>
            </div>

            <div className="form-group long-line">
              <label htmlFor="imageUrl">Image Url</label>
              <div className="input-wrapper">
                <span><i className="fa-solid fa-image"></i></span>
                <input id="imageUrl"
                 name="imageUrl"
                  type="text" 
                  onChange={onFormChangeHandler}
                   value={formValues.imageUrl}
                   onBlur={(e) => errCheck(e,formValues.imageUrl.value,null,imagePattern)}
                   />
              </div>
              {errors.imageUrl &&
              <p className="form-error">ImageUrl is not valid!</p> }
            </div>


            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-map"></i></span>
                  <input id="country" 
                  name="country" type="text"
                   onChange={onFormChangeHandler} 
                   value={formValues.country}
                   onBlur={(e) => errCheck(e,formValues.country.length, 2)}
                   />
                </div>
                {errors.country && 
                <p className="form-error">
                  Country should be at least 2 characters long!
                </p>
                }
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-city"></i></span>
                  <input id="city" 
                  name="city" 
                  type="text" 
                  onChange={onFormChangeHandler} 
                  value={formValues.city}
                  onBlur={(e) => errCheck(e,formValues.city.length, 3)}
                  />
                </div>
                {errors.city && 
                <p className="form-error">
                  City should be at least 3 characters long!
                </p>
                }
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-map"></i></span>
                  <input id="street" 
                  name="street" 
                  type="text" 
                  onChange={onFormChangeHandler} 
                  value={formValues.street}
                  onBlur={(e) => errCheck(e,formValues.city.length, 3)}
                  />
                </div>
                {errors.street && 
                <p className="form-error">
                  Street should be at least 3 characters long!
                </p>
                }
              </div>
              <div className="form-group">
                <label htmlFor="streetNumber">Street number</label>
                <div className="input-wrapper">
                  <span><i className="fa-solid fa-house-chimney"></i></span>
                  <input id="streetNumber" 
                  name="streetNumber" 
                  type="text" 
                  onChange={onFormChangeHandler} 
                  value={formValues.streetNumber}
                  onBlur={(e) => errCheck(e,Number(formValues.streetNumber.value), 0)}
                  />
                </div>
                {errors.streetNumber && 
                <p className="form-error">
                  Street number should be a positive number!
                </p>
}
              </div>
            </div>
            <div id="form-actions">
              <button id="action-save" className="btn" type="submit">Save</button>
              <button id="action-cancel" className="btn" type="button" onClick={()=>closeModal()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> 




)

}