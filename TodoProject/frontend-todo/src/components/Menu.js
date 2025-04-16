import React from "react";
import {Route, Redirect, Switch, BrowserRouter, Link} from 'react-router-dom'
import CustomUserList from "./CustomUser";
import ProjectsList from "./Projects";
import TodoList from "./ToDo";


const Menu = () => {
    return (
        <nav style={{ backgroundColor: '#f4f4f4', padding: '5px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '5px', margin: 0, padding:0 }}>
            {/*<li><a href="http://127.0.0.1:8000/api/">Apps_backend</a></li>*/}
            {/*<li><a href="http://127.0.0.1:8000/admin/">Adminka</a></li>*/}
            {/*  <li><a href="http://127.0.0.1:8000/api/project/">Projects</a></li>*/}
            {/*  <li><a href="http://127.0.0.1:8000/api/todo/">Todos</a></li>*/}
            {/*  <li><a href="http://127.0.0.1:8000/api/usersapp/">CustomUsers</a></li>*/}








            <li>
            <a href="http://localhost:8000/api/" target="_blank" rel="noopener noreferrer">
                API-backend
            </a>
            </li>
            <li>
                <a href="http://localhost:8000/admin/" target="_blank" rel="noopener noreferrer">
                Adminka
            </a>
            </li>
            <li>
                <Link to='/customusers'>Пользователи</Link>
            </li>
            <li>
                <Link to='/projects'>Проекты</Link>
            </li>
            <li>
                <Link to='/todo'>Todo-заметки</Link>
            </li>
                {/*<Switch>*/}
                {/*    <Route exact path='/customusers' component={() => <CustomUserList users={this.state.users} />} />*/}
                {/*    <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects} />} />*/}
                {/*    <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} />} />*/}


                {/*</Switch>*/}






          </ul>
        </nav>
  );
};


export default Menu