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
    if (name === "users") {
      // выбранные пользователи — массив строк
      const options = Array.from(selectedOptions, option => option.value);
      this.setState({ users: options });
    } else {
      this.setState({ [name]: value });
    }
  };

 handleSubmit = (event) => {
  event.preventDefault();
  const users = this.state.users.map(id => parseInt(id, 10)); // только при отправке → числа
  this.props.createProject(this.state.name, this.state.url_repo, users);
};

  render() {

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
          <label htmlFor="author">User</label>
          <select
            name="authors"
            className="form-control"
            value={this.state.users}
            onChange={this.handleChange}
            required
          >
            {this.props.users.map((item) => (
              <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>
            ))}
          </select>
        </div>

        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default ProjectForm;
