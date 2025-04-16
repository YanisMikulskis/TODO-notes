import logo from './logo.svg';
import './App.css';
import React from "react";
import CustomUserList from "./components/CustomUser";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import axios from "axios";
import FooterItem from "./components/Footer";
import ProjectList from "./components/Projects";
import TodoList from "./components/ToDo";
import {BrowserRouter, Route, Switch, Routes} from "react-router-dom";
import ProjectsList from "./components/Projects";
import OneProjectItem from "./components/OneProject";


class AppTodoFront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'api':[],
        'users': [],
        'projects':[],
        'todos':[]
    }
  }

  componentDidMount() {
    Promise.all([
        axios.get('http://127.0.0.1:8000/api/'),
        axios.get("http://127.0.0.1:8000/api/project/"),
        axios.get("http://127.0.0.1:8000/api/usersapp/"),
        axios.get("http://127.0.0.1:8000/api/todo/")
    ])
    .then(([apiRes, projectsRes, usersRes, todosRes]) => {
        this.setState({
            api: apiRes.data.results,
            projects: projectsRes.data.results,
            users: usersRes.data.results,
            todos: todosRes.data.results
        });
    })
    .catch(error => console.error("Ошибка при загрузке данных:", error));
}




  render (){
      return(
          <BrowserRouter>
          <div>
              <Menu/>

              <Switch>
                  <Route exact path='/customusers' render={(props) => <CustomUserList {...props} users={this.state.users} />} />
                  <Route exact path='/projects' render={(props) => <ProjectsList {...props} projects={this.state.projects} />} />
                  <Route exact path='/todo' render={(props) => <TodoList {...props} todos={this.state.todos} />} />
                  <Route path='/projects/:id' render={(props) => <OneProjectItem {...props} projects={this.state.projects} />} />
                </Switch>
          <FooterItem />
           </div>
          </BrowserRouter>
      )
  }


}

export default AppTodoFront;
