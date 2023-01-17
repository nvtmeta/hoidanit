import React from "react";
class Child extends React.Component {
  state = {
    showUsers: true,
  };
  handleToggle = () => {
    this.setState({
      showUsers: !this.state.showUsers,
    });
  };
  render() {
    const { users } = this.props;

    return (
      <>
        <button
          onClick={() => {
            this.handleToggle();
          }}
        >
          {this.state.showUsers === true ? "Hide users" : "show users"}
        </button>
        {this.state.showUsers &&
          users.map((user, index) => {
            return (
              <div
                key={index}
                style={{ color: user.id <= 2 ? "green" : "red" }}
              >
                tao la {user.name} va id cua tao la {user.id}{" "}
              </div>
            );
          })}
      </>
    );
  }
}
export default Child;
