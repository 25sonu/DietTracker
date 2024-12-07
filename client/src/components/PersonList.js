import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Notification from './Notification';
import { colors } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL);

const PersonList = () => {
  const [person, setPerson] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(API_URL);
        setPerson(response.data);
      } catch (error) {
        console.error('Error fetching person:', error);
      }
    };
    fetchPerson();
  }, []);

  return (
    <div className="box-container">
      <h1 style={{fontFamily:"roboto"}}>All Person List</h1>
      <Link to="/add" className="btn btn-add add-person-button">Add Person</Link>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th> </th>
            <th>age</th>
            <th> </th>
            <th>contact_number</th>
            <th> </th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patient.map(patient => (<tr key={patient.id} className="person-name"><td>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link></td>
                <td> </td>
              <td>{patient.age}</td>
              <td> </td>
              <td>{patient.co_number}</td>
              <td> </td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {notification && (
        <Notification message={notification} onClose={() => setNotification('')} />
      )}
    </div>
  );
};

export default PersonList;