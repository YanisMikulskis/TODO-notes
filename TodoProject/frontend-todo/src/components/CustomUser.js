import React from "react";

const CustomUserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.username}
            </td>
        </tr>
    )
}



const CustomUserList = ({users}) => {
    return (
      <table border='1'>
          <thead>
          <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Username</th>
          </tr>
          </thead>
          <tbody>
            {users.map((user) => <CustomUserItem user={user} />)}
          </tbody>
      </table>
    )
}
export default CustomUserList