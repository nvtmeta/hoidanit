import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";
function TableUser() {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  return (
    <>
      <table className="table table-hover table-border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button className="btn btn-primary mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td>Invalid data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableUser;
