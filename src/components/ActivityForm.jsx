import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ActivityForm.css'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';



function ActivityForm() {

  // value for the img 
  let swim = 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3012&q=80'
  let run = 'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2944&q=80'
  let dance = 'https://images.unsplash.com/photo-1474308371634-c715850e8d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  let badminton = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  let yoga = 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'

  const [img, setImg] = useState(run)
  const [value, setValue] = useState(dayjs());

  const [formData, setFormData] = useState({
    activityName: '',
    description: '',
    activityType: 'run',
    min: 'Minutes',
    hour: 'Hours',
    date: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // if activityType is changed, Update the picture.
    if (name === 'activityType') {
      setImg(eval(value))
    }
  };

  // formErrors code here

  const ACTIVITY_TYPES = ["run", "bicycle", "ride", "swim", "walk", "hike", "dance", "badminton", "yoga"];

  const validateActivity = (name, type, description, date, durationTime) => {
    /**
     * All form fields are validated on form submission(Name, Description, ActivityType:[ACTIVITY_TYPES], Duration, Date)
     * A meaningful error message is displayed when a form field is invalid
     * @param {string} name - Name of the Activity
     * @param {string} type - Type of the Activity
     * @param {string} description - Description of the Activity
     * @param {Date} date - Date of the Activity
     * @param {number} durationTime - Duration of the Activity in minutes
     */
    console.log(name, type, description, date, durationTime);

    if (typeof name != 'string') {
      toast('Error! Activity Name is not a string');
      return false;
    }
    if (!name.length) {
      toast('Error! Activity Name is empty');
      return false;
    }
    if (typeof type != 'string') {
      toast('Error! Activity Type is not a string');
      return false;
    }
    if (!ACTIVITY_TYPES.includes(type)) {
      toast('Error! Activity Type is not valid');
      return false;
    }
    if (typeof description != 'string') {
      toast('Error! Activity Description is not a string');
      return errorMessage;
    }
    if (!(date instanceof Date)) {
      toast('Error! Activity Date is not a Date');
      return false;
    }
    if (date > new Date()) {
      toast('Error! Activity Date is in the future');
      return false;
    }
    if (!durationTime) {
      toast('Error! Activity Duration is empty');
      return false;
    }
    if (!Number.isFinite(durationTime)) {
      toast('Error! Activity Duration is not a valid number');
      return false;
    }
    toast('Activity Form Submission is valid');
    return true;
  }

  // validateForm code here

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    setFormData({ ...formData, date: currentDate });
    const activityValid = validateActivity(formData.activityName, formData.activityType, formData.description, currentDate, parseInt(formData.hour * 60 + formData.min));
    console.log(activityValid);
    console.log(formData);
    if (activityValid) {
      // post to server
    }
  }

  return (
  <div className="grid">
    <div className="row-1">
      <div className="form">

        <form>

          <div className="form-group">
            <label>Activity Name</label>
            <input
              style={{padding: '6px', borderBottom: '1px solid grey'}}
              placeholder='Activity Name'
              type="text"
              name="activityName"
              value={formData.activityName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="activity">Activity Type</label>

            <select id="activity" name="activityType" onChange={handleInputChange}>
              <option defaultValue value="run" >Run</option>
              <option value="dance">Dance</option>
              <option value="swim">Swim</option>
              <option value="badminton">Badminton</option>
              <option value="yoga">Yoga</option>
            </select>
          </div>

          <div className="form-group">
            <label  style={{marginRight: '20px'}} htmlFor="duration">Date</label>
            <DateTimePicker
            format="DD/MM/YYYY hh:mm"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
            className="in"
              min="0"
              placeholder='Hour'
              type="number"
              name="hour"
              value={formData.hour}
              onChange={handleInputChange}
            />
            <input
              min="0"
              max={59}
              className="in"
              placeholder='Minute'
              type="number"
              name="min"
              value={formData.min}
              onChange={handleInputChange}
            />
          </div>

        </form>
      </div>

      <div className="img-parent">
        <img className="image" src={img} /> 
      </div>

    </div>

    <div className="row-2">
      <textarea placeholder="How did you feel during exercise?" className="text"></textarea>

      <div className="buttons">
        <button className='add-button'
          onClick={handleSubmit}
        >
          Add
        </button>
        <ToastContainer 
          position="top-center"
          pauseOnHover
        />
        <div className="btn-seperator"></div>
        <button className='cancel-button'>
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default ActivityForm


