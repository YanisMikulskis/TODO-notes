import React from "react";
import {Link} from "react-router-dom";


const TodoItem = ({todo}) => {
    console.log('itititit')
    console.log(todo)
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.updated}</td>
            <td>{todo.user}</td>
            <td>{todo.active}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <>
      <table border='1'>
          <thead>
          <tr>
              <th>id</th>
              <th>project</th>
              <th>text</th>
              <th>updated</th>
              <th>user</th>
              <th>active</th>
          </tr>
          </thead>
          <tbody>
            {todos.map((todo) => <TodoItem todo={todo} />)}
          </tbody>

      </table>
            <Link to='/todos/create'>Добавить заметку</Link>
            </>


    )
}


//
//
// const ProjectList = ({ projects }) => {
//   return (
//     <table border="1">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Название</th>
//           <th>Описание</th>
//         </tr>
//       </thead>
//       <tbody>
//         {projects.map((project) => (
//           <tr key={project.Id}>
//             <td>{project.Id}</td>
//             <td>{project.Name}</td>
//             <td>{project.Description}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

export default TodoList