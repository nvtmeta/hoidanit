import ModalCreateUser from "./ModalCreateUser";
import "./manageuser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser ";
function ManageUser() {
  const [listUser, setListUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  const handleUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleView = (user) => {
    setShowModalView(true);
    setDataUpdate(user);
  };
  const handleDelete = (user) => {
    setShowModalDelete(true);
    setDataUpdate(user);
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
        <TableUser
          listUser={listUser}
          handleUpdate={handleUpdate}
          handleView={handleView}
          handleDelete={handleDelete}
        />
      </div>
      <div className="create-user">
        <ModalCreateUser
          show={showModal}
          setShow={setShowModal}
          fetchUser={fetchUser}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchUser={fetchUser}
          setDataUpdate={setDataUpdate}
        />
        <ModalViewUser
          show={showModalView}
          setShow={setShowModalView}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
        />
        <ModalDeleteUser
          show={showModalDelete}
          setShow={setShowModalDelete}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  );
}

export default ManageUser;
