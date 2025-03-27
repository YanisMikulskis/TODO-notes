import React from "react";


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.Id}</td>
            <td>{todo.Project}</td>
            <td>{todo.Text}</td>
            <td>{todo.Updated}</td>
            <td>{todo.User}</td>
            <td>{todo.Active}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
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