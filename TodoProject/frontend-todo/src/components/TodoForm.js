import React from 'react';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.projects.length > 0 ? props.projects[0].Id : "",
            text: "",
            user: props.users.length > 0 ? props.users[0].id : ""
        };
    }


    handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  };

    handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    this.props.createTodo(this.state.project, this.state.text, this.state.user);

  };
    render () {
        return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Project</label>
          <select
            name="project"
            className="form-control"
            value={this.state.project}
            onChange={this.handleChange}
            required
          >
            {this.props.projects.map((item) => (
              <option key={item.Id} value={item.Id}>{item.Name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="users">Users</label>
          <select
            name="user"
            className="form-control"
            value={this.state.user}
            onChange={this.handleChange}
            required
          >

            {this.props.users.map((user) => {
                return (
                    <option key={user.id} value={user.id}>{user.first_name} {user.last_name}
                    </option>
                );
            })}
          </select>
        </div>
            <div className="form-group">
          <label htmlFor="text">Заметка</label>
          <input
            type="text"
            className="form-control"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
        </form>










        );
    }


}

export default TodoForm;