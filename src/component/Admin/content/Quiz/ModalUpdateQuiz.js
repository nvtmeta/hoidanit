import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { updateQuiz } from "../../../../services/apiService";
import _ from "lodash";
export default function ModalUpdateQuiz({
  show,
  setShow,
  dataUpdate,
  fetchQuiz,
  setDataUpdate,
}) {
  const { IdData } = dataUpdate;
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [difficult, setDifficult] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setId(dataUpdate.id);
      setDescription(dataUpdate.description);
      setDifficult(dataUpdate.difficulty);
      setName(dataUpdate.name);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  const handleClose = () => {
    setShow(false);
    setDescription("");
    setName("");
    setImage("");
    setPreviewImage("");
    setDataUpdate({});
  };
  const handleSubmit = async () => {
    let data = await updateQuiz(id, description, name, difficult, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update the quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                onChange={(e) => setDifficult(e.target.value)}
                value={difficult}
              >
                <option value={"EASY"}>EASY</option>
                <option value={"MEDIUM"}>MEDIUM</option>
                <option value={"HARD"}>HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload " htmlFor="labelUpload">
                <FcPlus />
                Upload image file
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleImage(e)}
              />
            </div>
            <div
              className="col-md-12 image-preview"
              style={{ textAlign: "center" }}
            >
              {previewImage ? (
                <img src={previewImage} alt="preview"></img>
              ) : (
                <div style={{ textAlign: "center", opacity: "60%" }}>
                  <span>Preview image</span>
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
