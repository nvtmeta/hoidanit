import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";

function ModalDelQuiz({ show, setShow, dataUpdate, fetchQuiz }) {
  const handleClose = () => setShow(false);
  const handleSubmit = async () => {
    let data = await deleteQuiz(dataUpdate.id);
    console.log(data);
    console.log(dataUpdate.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchQuiz();
      handleClose();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have already delete this quiz with{" "}
          <b>Id={dataUpdate && dataUpdate.id ? dataUpdate.id : ""} ?</b>
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

export default ModalDelQuiz;
