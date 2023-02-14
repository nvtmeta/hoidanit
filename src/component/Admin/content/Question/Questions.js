import Select from "react-select";
import { useState } from "react";
import "./Question.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
const Questions = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  return (
    <div className="question-container">
      <div className="title">Manage questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select quiz</label>
          <div className="App">
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
            />
          </div>
        </div>
      </div>
      <h6 className="mt-4">Add questions</h6>
      <div className="question-content">
        <div className="form-floating description ">
          <input type="text" className="form-control" placeholder="sca" />
          <label>Description</label>
        </div>
        <div className="upload-container">
          <label className="label-upload">Upload image</label>
          <span>0 files is uploaded</span>
        </div>
        <div className="btn">
          <span className="btnPlus">
            <AiOutlinePlusCircle />
          </span>
          <span className="btnRemove">
            <AiOutlineMinusCircle />
          </span>
        </div>
      </div>
      <div className="answer-content">
        <input className=" isCorrect" type="checkbox"></input>
        <div className="form-floating answer ">
          <input type="text" className="form-control" placeholder="" />
          <label>Answer 1</label>
        </div>
        <div className="btn">
          <span className="btnPlus">
            <AiOutlinePlusCircle />
          </span>
          <span className="btnRemove">
            <AiOutlineMinusCircle />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Questions;
