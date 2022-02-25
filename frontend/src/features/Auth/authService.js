import axios from "axios";

// export default class PersonList extends React.Component {
//   state = {
//     persons: [],
//   };

//   componentDidMount() {
//     axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
//       const persons = res.data;
//       this.setState({ persons });
//     });
//   }

//   render() {
//     return (
//       <ul>
//         {this.state.persons.map((person) => (
//           <li key={person.id}>{person.name}</li>
//         ))}
//       </ul>
//     );
//   }
// }

//endpoint for auths

const API_URL = "/api/users/";

//register user

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  //set item to storage

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  //set item to storage

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout user

// eslint-disable-next-line no-unused-vars
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login
};

export default authService;
