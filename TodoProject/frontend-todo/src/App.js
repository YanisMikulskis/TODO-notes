import logo from './logo.svg';
import './App.css';
import React from "react";
import CustomUserList from "./components/CustomUser";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import axios from "axios";
import FooterItem from "./components/Footer";
import TodoList from "./components/ToDo";
import {BrowserRouter, Route, Switch, Routes} from "react-router-dom";
import ProjectsList from "./components/Projects";
import OneProjectItem from "./components/OneProject";
import LoginForm from "./components/Auth_Todo";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm"


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}
class AppTodoFront extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        'api':[],
        'users': [],
        'projects':[],
        'todos':[],
        'token': '',
        'username': localStorage.getItem('login') || ''
    }
    }

    createProject(name, url_repo, users) {
        const headers = this.get_headers()
        const data = {name:name, url_repo:url_repo, users:users}
        axios.post('http://127.0.0.1:8000/api/project/', data, {headers:headers})
            .then(response => {
                this.load_data()
        }).catch(error => {
            if (error.response) {
                console.log("Ошибка:", error.response.status, error.response.data)
            } else {
                console.log("Ошибка сети:", error.message)
    }
})
    }

    createTodo(project, text, user) {
        const headers = this.get_headers()
        const data = {project:project, text:text, user:user}
        console.log('данные')
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/todo/', data, {headers:headers})
            .then(response => {
                this.load_data()
        }).catch(error => console.log(error))
    }






    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}/`, {headers:headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>
                        item.id !== id)})
            }).catch(error => console.log(error))
    }

    set_token(token) {

        const cookies = new Cookies()
        localStorage.setItem('access_token', token)
        const username = localStorage.getItem('login')
        this.setState({'token': token, 'username': username}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('login')
        this.setState({username: ''})
    }
    get_token_from_storage() {
        const token = localStorage.getItem('access_token')
        const refresh = localStorage.getItem('refresh_token')
        if (token && refresh) {
        this.setState({ 'token': token }, () => this.load_data())
        } else {
            this.logout()  // Очистить и не авторизовывать
        }
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api/token/', {username: username,
            password: password})
            .then(response => {
                this.set_token(response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Bearer ' + this.state.token
            }
            return headers
    }


    load_data() {


        const headers = this.get_headers()
        axios.get("http://127.0.0.1:8000/api/project/", {headers})
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})

        })


        axios.get("http://127.0.0.1:8000/api/custom_user/", {headers})
            .then(response => {
                this.setState({'users': response.data.results})
            }).catch(error => console.log(error))





        axios.get("http://127.0.0.1:8000/api/todo/", {headers})
            .then(response => {
                this.setState({'todos': response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    componentDidMount() {
        // this.refresh_token()
        this.get_token_from_storage()
        // this.load_data()
    }






    render () {
      return(
          <BrowserRouter>
          <div>
              <Menu is_authenticated={() => this.is_authenticated()}
                    logout={() => this.logout()}
              username = {this.state.username}
              />

              <Switch>
                  <Route exact path='/customusers' render={(props) => <CustomUserList {...props} users={this.state.users} />} />
                  <Route exact path='/projects' render={(props) => <ProjectsList {...props} projects={this.state.projects} />} />
                  <Route exact path='/todos' render={(props) => <TodoList {...props} todos={this.state.todos} />} />
                  <Route exact path='/login' render={(props) => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />

                  <Route exact path='/projects/create' component={ () => <ProjectForm users = {this.state.users}
                                                                                      createProject={(name, url_repo, users) => this.createProject(name, url_repo, users)}/>}
                         />


                  <Route exact path='/projects/:Id' render={(props) => <OneProjectItem {...props} projects={this.state.projects}
                                                                                 deleteProject={(id)=>this.deleteProject(id)}/>} />

                  <Route exact path='/todos/create' component={ () => <TodoForm projects = {this.state.projects}
                                                                                users = {this.state.users}
                                                                              createTodo={(projects, text, users) => this.createTodo(projects, text, users)}/>}
                         />





                </Switch>
          <FooterItem />
           </div>
          </BrowserRouter>
      )
    }


}

export default AppTodoFront;
