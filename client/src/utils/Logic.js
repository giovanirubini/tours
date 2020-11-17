import axios from 'axios';

// ---------------------------- API CALLS ---------------------------- //

export const getData = (setRequests, setAgents) => axios.get('/api/tours/requests')
  .then((response) => {
    setRequests(response.data);
    return axios.get('/api/tours/agents');
  })
  .then((response) => setAgents(response.data))
  .catch((err) => console.log(err));

export const submitForm = (toSend) => axios.post('/api/tours/users', toSend)
  .then(() => console.log(`Sent ${toSend.name}'s request to the database!`))
  .catch((err) => console.log(err));

// ---------------------------- GENERAL UTILS ---------------------------- //

// Check for occupied slots. Return all EXCEPT those slots.
export const getFreeSlots = (occupied = [], currentDate = '') => {
  const occupiedSlots = {};
  const result = [];

  occupied.forEach((person) => {
    person.date === currentDate ? occupiedSlots[person.time] = true : null;
  });

  for (let i = 9; i < 20; i += 1) {
    const ampm = i > 11 ? 'PM' : 'AM';
    const hour = i % 12 === 0 ? 12 : i % 12;

    const time = `${hour}:00 ${ampm}`;
    const time2 = `${hour}:30 ${ampm}`;

    !occupiedSlots[time] ? result.push(time) : null;
    !occupiedSlots[time2] ? result.push(time2) : null;
  }
  result[result.length - 1] === '7:30 PM' ? result.pop() : null;
  return result;
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Recursively gets and formats next seven days.
export const getDays = (date = new Date(), result = []) => {
  if (result.length === 7) { return result; }

  const month = date.getMonth() + 1;
  const currentDate = date.getDate();
  const year = date.getFullYear();

  const dateObj = {
    name: days[date.getDay()],
    month: months[date.getMonth()],
    day: currentDate,
    date: `${month}/${currentDate}/${year}`,
  };
  result.push(dateObj);
  const tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));

  return getDays(tomorrow, result);
};