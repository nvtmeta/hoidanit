import Select from 'react-select';
import { useState } from 'react';
import './Question.scss';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
const Questions = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: 'question 1',
      image: '',
      imageName: '',
      answers: [
        { id: uuidv4(), description: 'answer 1', isCorrect: false },
        { id: uuidv4(), description: 'answer 2', isCorrect: false },
      ],
    },
  ]);
  console.log(questions);
  const handleAddRevQue = (type, id) => {
    if (type === 'ADD') {
      const newQue = {
        id: uuidv4(),
        description: 'question 1',
        image: '',
        imageName: '',
        answers: [{ id: uuidv4(), description: '', isCorrect: false }],
      };
      setQuestions([...questions, newQue]);
    }
    if (type === 'REV') {
      let queClone = _.cloneDeep(questions);
      queClone = queClone.filter((item) => item.id !== id);
      console.log(queClone);
      setQuestions(queClone);
    }
  };
  const handleAnswer = (type, queId, ansId) => {
    let queClone = _.cloneDeep(questions);
    let index = queClone.findIndex((item) => item.id === queId);
    if (type === 'ADD') {
      const newAns = {
        id: uuidv4(),
        description: 'question 1',
        isCorrect: false,
      };
      queClone[index]?.answers?.push(newAns);
      setQuestions(queClone);
    }
    if (type === 'REV') {
      queClone[index].answers = queClone[index].answers.filter(
        (item) => item.id !== ansId
      );
      setQuestions(queClone);
    }
  };

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
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="question-main mb-4">
              <div className="question-content ">
                <div className="form-floating description ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="sca"
                    value={question.description}
                  />
                  <label> Description {index + 1}</label>
                </div>
                <div className="upload-container">
                  <label>
                    <RiImageAddFill className="label-img-icon" />
                  </label>
                  <label className="label-upload">Upload image</label>
                  <span>0 files is uploaded</span>
                </div>
                <div className="btn">
                  <span
                    className="btnPlus"
                    onClick={() => handleAddRevQue('ADD', question.id)}
                  >
                    <AiOutlinePlusCircle />
                  </span>
                  {questions.length > 1 && (
                    <span
                      className="btnRemove"
                      onClick={() => handleAddRevQue('REV', question.id)}
                    >
                      <AiOutlineMinusCircle />
                    </span>
                  )}
                </div>
              </div>
              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <div key={index} className="answer-content">
                      <input className=" isCorrect" type="checkbox"></input>
                      <div className="form-floating answer ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={answer.description}
                        />
                        <label>Answer {index + 1}</label>
                      </div>
                      <div className="btn">
                        <span
                          className="btnPlus"
                          onClick={() => handleAnswer('ADD', question.id)}
                        >
                          <AiOutlinePlusCircle />
                        </span>
                        {question.answers.length > 1 && (
                          <span
                            className="btnRemove"
                            onClick={() =>
                              handleAnswer('REV', question.id, answer.id)
                            }
                          >
                            <AiOutlineMinusCircle />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}

      {/* <div className="question-main">
        <div className="question-content mt-3 ">
          <div className="form-floating description ">
            <input type="text" className="form-control" placeholder="sca" />
            <label>Description</label>
          </div>
          <div className="upload-container">
            <label>
              <RiImageAddFill className="label-img-icon" />
            </label>
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
      </div> */}
    </div>
  );
};

export default Questions;
