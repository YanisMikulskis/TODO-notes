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


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Сраница по адресу '{location.pathname}' не найдена</h1>
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

    // refresh_token() {
    //     const refresh = localStorage.getItem('refresh_token')
    //     if (refresh) {
    //         axios.post('http://127.0.0.1:8000/api/token/refresh/', {
    //             refresh: refresh
    //         })
    //             .then(response => {
    //                 this.set_token(response.data.access)
    //             })
    //             .catch(error => {
    //                 this.logout()
    //                 alert('сессия истекла, войдите заново')
    //             })
    //     }
    // }


    load_data() {


        const headers = this.get_headers()
        axios.get("http://127.0.0.1:8000/api/project/", {headers})
            .then(response => {
                this.setState({'projects': response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})

        })


        axios.get("http://127.0.0.1:8000/api/usersapp/", {headers})
            .then(response => {
                this.setState({'users': response.data.results})
            }).catch(error => {
            console.log(error)
            this.setState({users: []})

        })


        axios.get("http://127.0.0.1:8000/api/todo/", {headers})
            .then(response => {
                this.setState({'todos': response.data.results})
                console.log('ffsdfsfsg')
                console.log(response.data.results)
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

    // Promise.all([
    //     axios.get('http://127.0.0.1:8000/api/'),
    //     axios.get("http://127.0.0.1:8000/api/project/"),
    //     axios.get("http://127.0.0.1:8000/api/usersapp/"),
    //     axios.get("http://127.0.0.1:8000/api/todo/")
    // ])
    // .then(([apiRes, projectsRes, usersRes, todosRes]) => {
    //     this.setState({
    //         api: apiRes.data.results,
    //         projects: projectsRes.data.results,
    //         users: usersRes.data.results,
    //         todos: todosRes.data.results
    //     });
    // })


//     .catch(error => console.error("Ошибка при загрузке данныххх:", error));
//      console.log('юзеры состояние')
//      console.log(this.state.users)
// }




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

                  <Route path='/projects/:id' render={(props) => <OneProjectItem {...props} projects={this.state.projects} />} />
                </Switch>
          <FooterItem />
           </div>
          </BrowserRouter>
      )
    }


}

export default AppTodoFront;
