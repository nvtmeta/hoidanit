import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/apiService";

export default function ModalCreateUser({ show, setShow, fetchUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [role, setRole] = useState("User");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setName("");
    setImage("");
    setPreviewImage("");
    setRole("User");
  };

  const handleSubmit = async () => {
    // let data = {
    //   email: email,
    //   password: password,
    //   username: name,
    //   role: role,
    //   userImage: image,

    // }
    //validateEmail
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await postCreateUser(email, password, name, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchUser();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleImage = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form classNameName="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="user">User</option>
                <option value="Admin">Admin</option>
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
            <div className="col-md-12 image-preview">
              {previewImage ? (
                <img src={previewImage} alt="preview"></img>
              ) : (
                <span>preview image</span>
              )}
              {console.log(previewImage)}{" "}
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
