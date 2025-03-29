import React from "react";
import { useParams } from 'react-router-dom'

const OneProjectItem = ({ projects }) => {
    let { Id } = useParams();
    let project = projects.find((project) => project.ID === Id)

    if (!project) {
        return <div>Project not found</div>
    }
    return (
        <table border='1'>
            <thead>
        <tr>
            <th>Name</th>
            <th>UrlRepository</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th>{project.Name}</th>
            <td>
                <a href={project.UrlRepo} target="_blank" rel="noopener noreferrer">
                    {project.UrlRepo} </a>
            </td>

        </tr>
        </tbody>



        </table>


    )
}


export default OneProjectItem