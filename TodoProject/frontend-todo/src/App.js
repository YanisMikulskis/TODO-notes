import logo from './logo.svg';
import './App.css';
import React from "react";
import CustomUserList from "./components/CustomUser";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import axios from "axios";
import FooterItem from "./components/Footer";
class AppTodoFront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/usersapp/")
        .then(response => {
          const users = response.data
          this.setState(
              {
                'users':users
              }
          )
        }).catch(error => console.log(error))
  }

  render (){
      return(
          <div>
              <Menu/>
              <CustomUserList users={this.state.users}/>

              <FooterItem/>

          </div>
      )
  }


}

export default AppTodoFront;
