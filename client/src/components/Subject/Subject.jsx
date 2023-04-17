import React, { useState } from 'react';
import './Subject.css';

function Subject() {



  const [formDataSuject, setFormDataSubject] = useState({

  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataSubject({ ...formDataSuject, [name]: value });
  };
  return (
    <>
      <div className='subject-noti'>
        <div className="container">
          <div className="row">
            <div className="col-sm-4"><button type="button" class="btn btn-danger">Event</button></div>
            <div className="col-sm-4"><button type="button" class="btn btn-warning">Schedule</button></div>
            <div className="col-sm-4"><button type="button" class="btn btn-info">Tuition</button></div>
          </div>
        </div>



      </div>
    </>
  );
}

export default Subject;
