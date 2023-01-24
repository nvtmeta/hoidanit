import ModalCreateUser from "./ModalCreateUser";
import "./manageuser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./tableUser";
function ManageUser() {
  const [showModal, setShowModal] = useState(false);
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
        <TableUser />
      </div>
      <div className="create-user">
        <ModalCreateUser show={showModal} setShow={setShowModal} />
      </div>
    </div>
  );
}

export default ManageUser;
