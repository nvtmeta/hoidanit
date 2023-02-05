import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Easy");
  const [image, setImage] = useState(null);
  const options = [
    { value: "Easy", label: "Chocolate" },
    { value: "Medium", label: "Strawberry" },
    { value: "Difficult", label: "Vanilla" },
  ];

  const handleChangeFile = () => {};
  return (
    <div className="quiz-container">
      <div className="title">Manage quiz</div>

      <hr />

      <fieldset class="border rounded-3 p-3">
        <legend class="float-none w-auto px-3">Add new Quiz</legend>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Your quiz name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Name</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            placeholder="Your quiz description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>Description</label>
        </div>
        <div className="my-3">
          <Select
            // value={}
            // onChange={this.handleChange}
            options={options}
            placeholder={"Quiz type"}
          />
        </div>
        <div className="more-actions ">
          <label className="mb-3"> Upload image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleChangeFile(e)}
          />
        </div>
      </fieldset>

      <div className="list-detail">table</div>
    </div>
  );
};
export default ManageQuiz;
