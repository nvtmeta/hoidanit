import ModalCreateUser from "./ModalCreateUser";
import "./manageuser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUsers, getUserPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser ";
import TablePagination from "./TablePagination";
function ManageUser() {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listUser, setListUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    // fetchUser();
    fetchPaginateUser(1);
  }, []);

  // const fetchUser = async () => {
  //   let res = await getAllUsers();
  //   if (res.EC === 0) {
  //     setListUser(res.DT);
  //   }
  // };
  const fetchPaginateUser = async (page) => {
    let res = await getUserPaginate(page, LIMIT_USER);
    console.log(res.DT.totalPages);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
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
        {/* <TableUser
          listUser={listUser}
          handleUpdate={handleUpdate}
          handleView={handleView}
          handleDelete={handleDelete}
        /> */}
        <TablePagination
          listUser={listUser}
          handleUpdate={handleUpdate}
          handleView={handleView}
          handleDelete={handleDelete}
          fetchPaginateUser={fetchPaginateUser}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="create-user">
        <ModalCreateUser
          show={showModal}
          setShow={setShowModal}
          fetchUser={fetchPaginateUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchUser={fetchPaginateUser}
          setDataUpdate={setDataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          fetchUser={fetchPaginateUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ManageUser;
