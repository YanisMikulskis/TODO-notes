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
      <table>
          <th>
              First name
          </th>
          <th>
              Last Name
          </th>
          <th>
              Email
          </th>
          <th>
              Username
          </th>

          {users.map((user) => <CustomUserItem user={user} />)}
      </table>
        /* users — это массив данных о юзерах, который мы передадим в компонент. Используем функцию*/
/*map, чтобы превратить каждого автора из массива в соответствующий компонент CustomUserItem.*/
    )
}

export default CustomUserList