import { React, useState } from 'react';
import { faStar, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'react-calendar';

function Notification() {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-7">
            <div class="important">
              <h1><i><FontAwesomeIcon icon={faStar} /></i>IMPORTANT NOTIFICATION</h1>
              <div className="line"></div>
              <div class="post-header">
                <h2 class="post-title">How to Build a Website</h2>
              </div>
              <div class="post-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper erat. Aliquam at dui non nulla viverra dapibus. Donec tempor consequat nulla. Aliquam auctor, felis sit amet tristique fringilla, erat mi lobortis augue, sit amet vestibulum velit nibh sed tellus.</p>
              </div>
              <div className="post-footer">
                <p class="post-category">[Department]/</p>
                <p class="post-time">Posting time(12/03/2023) </p>
              </div>

              <div className="line"></div>
              <div class="post-header">
                <h2 class="post-title">How to Build a Website</h2>
              </div>
              <div class="post-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper erat. Aliquam at dui non nulla viverra dapibus. Donec tempor consequat nulla. Aliquam auctor, felis sit amet tristique fringilla, erat mi lobortis augue, sit amet vestibulum velit nibh sed tellus.</p>
              </div>
              <div className="post-footer">
                <p class="post-category">[Department]/</p>
                <p class="post-time">Posting time(12/03/2023) </p>
              </div>

              <div className="line"></div>
              <div class="post-header">
                <h2 class="post-title">How to Build a Website</h2>
              </div>
              <div class="post-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ullamcorper erat. Aliquam at dui non nulla viverra dapibus. Donec tempor consequat nulla. Aliquam auctor, felis sit amet tristique fringilla, erat mi lobortis augue, sit amet vestibulum velit nibh sed tellus.</p>
              </div>
              <div className="post-footer">
                <p class="post-category">[Department]/</p>
                <p class="post-time">Posting time(12/03/2023) </p>
              </div>


            </div>
          </div>
          <div className="col-sm-5">
            <div className="important">
              <h1><i><FontAwesomeIcon icon={faNewspaper} /></i>LATEST</h1>
              <div className="line"></div>
              <div className="post-footer">
                <p class="post-category">[Department]/</p>
                <p class="post-time">Posting time(12/03/2023) </p>
              </div>
              <div class="post-header">
                <h2 class="post-title">How to Build a Website</h2>
              </div>

              <div className="line"></div>
              <div className="post-footer">
                <p class="post-category">[Department]/</p>
                <p class="post-time">Posting time(12/03/2023) </p>
              </div>
              <div class="post-header">
                <h2 class="post-title">How to Build a Website</h2>
              </div>

              <div className="line"></div>
              <div className="post-footer">
                <p class="post-category">[Department]/</p>
                <p class="post-time">Posting time(12/03/2023) </p>
              </div>
              <div class="post-header">
                <h2 class="post-title">How to Build a Website</h2>
              </div>
            </div>
            <div className='calendar'>
              <Calendar onChange={onChange} value={value} />
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Notification;