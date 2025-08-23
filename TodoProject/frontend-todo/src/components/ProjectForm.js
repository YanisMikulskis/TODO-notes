import React from "react";


class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url_repo: "",
      // Если есть пользователи, выбираем первого по умолчанию
      users:[]
    };
  }

  handleChange = (event) => {
    const { name, selectedOptions, value } = event.target;
    console.log('evnet')
    console.log(name)
    console.log(value)
    console.log(selectedOptions)
    if (name === "users") {
      // выбранные пользователи — массив строк
      const options = Array.from(selectedOptions, option => option.value);
      console.log('flag')
      console.log(options)
      this.setState({ users: options });
    } else {
      this.setState({ [name]: value });
    }
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //
  //   if (this.state.users.length === 0) {
  //     alert("Выберите хотя бы одного пользователя!");
  //     return;
  //   }
  //
  //   // преобразуем строки в числа перед отправкой
  //   const users = this.state.users.map(id => parseInt(id, 10));
  //   this.props.createProject(this.state.name, this.state.url_repo, users);
  //
  //   // по желанию можно очистить форму
  //   this.setState({
  //     name: "",
  //     url_repo: "",
  //     users: this.state.users.length > 0 ? [this.state.users[0]] : []
  //   });
  // };
 handleSubmit = (event) => {
  event.preventDefault();
  const users = this.state.users.map(id => parseInt(id, 10)); // только при отправке → числа
  this.props.createProject(this.state.name, this.state.url_repo, users);
};

  render() {
    console.log("props.users =", this.props.users);

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name Project</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url_repo">Repo URL</label>
          <input
            type="text"
            className="form-control"
            name="url_repo"
            value={this.state.url_repo}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="users">Users</label>
          <select
            name="users"
            className="form-control"
            multiple
            value={this.state.users}
            onChange={this.handleChange}
            required
          >

            {this.props.users.map((user) => {

                console.log("user in map:", user);
                return (
                    <option key={user.id} value={user.id}>{user.first_name} {user.last_name}
                    </option>
                );
            })}
          </select>
        </div>

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default ProjectForm;
