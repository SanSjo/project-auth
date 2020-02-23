import React, { useState, useEffect } from 'react';
import './member.css';

const URL = 'http://localhost:9000/users';

export const MemberPage = () => {
  const accessToken = window.localStorage.getItem('accessToken');
  const userId = window.localStorage.getItem('userId');
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${URL}/${userId}`, {
      method: 'GET', // changed from POST
      headers: {
        Authorization: accessToken
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throws error message and handles it in .catch
          throw new Error(response.json());
        }
      })
      .then(user => {
        setUser(user);
        setAuthorized(true);
      })
      .catch(err => {
        console.log('ERROR', err);
      });
  }, [userId, accessToken]);

  const handleLogOut = () => {
    window.location.href = '/'; //return to start page
    window.localStorage.clear(); // clears data
  };

  return (
    <div>
      {/* if authorized display member section */}
      {authorized && (
        <section className="memberSection">
          <h2>Member information</h2>
          <h3>{user.name}</h3>
          <h3>You can't imagine how awesome you are!</h3>
          <div className="infoContainer">
            <button
              id="logout"
              className="btn"
              onClick={() => handleLogOut()}
              type="button"
            >
              Log Out
            </button>
          </div>
        </section>
      )}
      {/* if not authorized display message */}
      {!authorized && (
        <div className="memberSection"> You are not authorized </div>
      )}
    </div>
  );
};

export default MemberPage;
