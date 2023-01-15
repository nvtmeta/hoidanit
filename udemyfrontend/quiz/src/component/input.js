import React from "react";
import Child from "./child";
class Input extends React.Component {
  state = {
    users: [
      {
        name: "thinh",
        id: 1,
      },
      {
        name: "Jack",
        id: 2,
      },
      {
        name: "Bill",
        id: 3,
      },
    ],
  };
  handleText = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        my name is {this.state.name} and id is {this.state.id}
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <input
            value={this.state.name}
            type="text"
            onChange={(e) => {
              this.handleText(e);
            }}
          ></input>
          <button>Add</button>
        </form>
        <div>
          <Child users={this.state.users} />
        </div>
      </div>
    );
  }
}
export default Input;
