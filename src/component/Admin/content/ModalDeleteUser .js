import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

function ModalDeleteUser({
  show,
  setShow,
  dataUpdate,
  fetchUser,
  currentPage,
  setCurrentPage,
}) {
  const handleClose = () => setShow(false);
  const handleSubmit = async () => {
    let data = await deleteUser(dataUpdate.id);
    console.log(dataUpdate.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1);
      await fetchUser(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have already delete this user:{" "}
          <b>
            Email: {dataUpdate && dataUpdate.email ? dataUpdate.email : ""} ?
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
