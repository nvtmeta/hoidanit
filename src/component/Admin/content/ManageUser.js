import ModalCreateUser from "./ModalCreateUser";
import "./manageuser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./tableUser";
import { getAllUsers } from "../../../services/apiService";
function ManageUser() {
  const [showModal, setShowModal] = useState(false);
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
    <div className="manage-container">
      <div className="title">ManageUser</div>
      <div>
        <button
          className="btn-add-new btn btn-primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          {" "}
          <FcPlus /> Add new users
        </button>
      </div>
      <div className="table-users-container">
        <TableUser listUser={listUser} />
      </div>
      <div className="create-user">
        <ModalCreateUser
          show={showModal}
          setShow={setShowModal}
          fetchUser={fetchUser}
        />
      </div>
    </div>
  );
}

export default ManageUser;
