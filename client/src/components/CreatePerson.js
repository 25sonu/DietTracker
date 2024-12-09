import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import axios from 'axios';

const CreatePerson = (props) => {
    const navigate = useNavigate();
    const [person, setPerson] = useState({
        name: '',
        age:'',
        contact_number:'', 
        admit_Date: '',
        weight:'',
        BMI:'',
        availability:'',
      
    });
    const [showToast, setShowToast] = useState(false);

    const onChange = (e) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        
    axios
    .post('/api/persons', person)
    .then((res) => {
      setPerson({
        name: '',
        age:'',
        contact_number:'', 
        admit_Date: '',
        weight:'',
        BMI:'',
        availability:'',
    
        
      });

      
        // Show the success alert
        toast.success('Person added successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });

          setTimeout(() => {
            setShowToast(false); // Hide the toast
            navigate('/'); // Navigate to homepage
          }, 5000); // Adjust the timeout as needed
  
        })

        .catch((err) => {
            console.log('Error in CreatePerson!');
            console.log('The error is -> ')
            console.log(err)
            // Show the success alert
            toast.error('Something went wrong, try again!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Slide,
            });
          });
      };

      return (
        <div className='CreatePerson'>
          {/* <Navbar /> */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
    
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <br />
                <Link to='/' className='btn btn-outline-warning float-left'>
                  Show Person List
                </Link>
              </div>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Person</h1>
                <p className='lead text-center'>Create new person</p>
    
                <form noValidate onSubmit={onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Name of the Person'
                      name='name'
                      className='form-control'
                      value={person.name}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='age of the person'
                      name='age'
                      className='form-control'
                      value={person.age}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='weight'
                      name='weight'
                      className='form-control'
                      value={person.weight}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='BMI'
                      name='BMI'
                      className='form-control'
                      value={person.BMI}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='contact_number'
                      name='contact_number'
                      className='form-control'
                      value={person.contact_number}
                      onChange={onChange}
                    />
                  </div>
                  <br />
    
                 
    
                  <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
    
    
        </div>
      );
    };
    
    export default CreatePerson;
    

    
  