import React from "react";
import { useParams } from 'react-router-dom'

const OneProjectItem = ({one_project}) => {
    let { id } = useParams;
    // let filtered_projects = one_project.filter((book) => book.author === Number(id))
    return (
        <tr>
            <td>{one_project.Name}</td>
            <td>{one_project.UrlRepo}</td>
        </tr>
    )
}


export default OneProjectItem