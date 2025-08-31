import React from "react";
import { useParams } from 'react-router-dom';

const OneProjectItem = ({ projects, deleteProject }) => {
    let { Id } = useParams();

    let project = projects.find((project) => project.Id === parseInt(Id)); // ключевая правка

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>UrlRepository</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{project.Name}</td>
                        <td>
                            <a href={project.UrlRepo} target="_blank" rel="noopener noreferrer">
                                {project.UrlRepo}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => deleteProject(project.Id)} type="button">
                Удалить проект
            </button>
        </>
    );
};

export default OneProjectItem;
