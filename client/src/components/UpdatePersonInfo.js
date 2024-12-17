import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateBookInfo(props) {
  const [person, setPerson] = useState({
    name: '',
    age:'',
    contact_number:'', 
    admit_Date: '',
    weight:'',
    BMI:'',
    availability:'',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/persons/${id}`)
      .then((res) => {
        setPerson({
          name: res.data.name,
          age: res.data.age,
          contact_number: res.data.contact_number,
          admit_Date: res.data.admit_Date,
          weight: res.data.weight,
          BMI: res.data.BMI,
          availability: res.data.availability,
        });
      })
      .catch((err) => {
        console.log('Error from UpdatePersonInfo GET request');
        console.log(err)
      });
  }, [id]);

  const onChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
    name: person.name,
    age: person.age,
    contact_number:person.contact_number, 
    admit_Date: person.admit_Date,
    weight:person.weight,
    BMI:person.BMI,
    availability:person.availability,
      
    };

    axios
      .put(`/api/persons/${id}`, data)
      .then((res) => {
        navigate(`/show-person/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdatePersonInfo PUT request ->');
        console.log(err)
      });
  };

  return (
    <div className='UpdatePersonInfo'>
      
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Person List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Person</h1>
            <p className='lead text-center'>Update Person's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
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
              <label htmlFor='age'>Age</label>
              <input
                type='text'
                placeholder='Age'
                name='age'
                className='form-control'
                value={person.age}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='contact_number'>Contact_number</label>
              <input
                type='text'
                placeholder='Contact_number'
                name='contact_number'
                className='form-control'
                value={person.contact_number}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='bmi'>BMI</label>
              <textarea
                type='text'
                placeholder='BMI'
                name='bmi'
                className='form-control'
                value={person.bmi}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='weight'>Weight</label>
              <input
                type='text'
                placeholder='Weight of the person'
                name='weight'
                className='form-control'
                value={person.weight}
                onChange={onChange}
              />
            </div>
            <br />


            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Person
            </button>
            <br /> <br />
          </form>
        </div>
      </div>

    </div>
  );
}

export default UpdatePersonInfo;