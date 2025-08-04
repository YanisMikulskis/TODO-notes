import React from "react";
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`projects/${project.Id}`}>{project.Id}</Link>
            </td>
            <td>
                {project.Name}
            </td>
            <td>
                {project.Users?.join(', ')}
            </td>

        </tr>
    )
}

const ProjectList = ({ projects }) => {
    console.log(projects)
  return (
    <table border="1">
      <thead>
        <tr>

          <th>ID</th>
          <th>Название</th>
          <th>Пользователи (id)</th>

        </tr>
      </thead>
      <tbody>
      {projects.map((project) => <ProjectItem key={project.Id} project={project} />)}
      </tbody>
    </table>
  );
};

export default ProjectList