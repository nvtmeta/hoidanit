function TableUser({ listUser, handleUpdate, handleView, handleDelete }) {
  return (
    <>
      <table className="table table-hover table-border">
        <thead>
          <tr>
            <th scope="col">ID</th>
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
                  <th scope="row">{item.id}</th>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        handleView(item);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => {
                        handleUpdate(item);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={"4"}>Invalid data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableUser;
