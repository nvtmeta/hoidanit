import ModalCreateUser from "./ModalCreateUser";
import "./manageuser.scss";
function ManageUser() {
  return (
    <div className="manage-container">
      <div className="title">ManageUser</div>
      <div className="create-user">
        <ModalCreateUser />
      </div>
    </div>
  );
}

export default ManageUser;
