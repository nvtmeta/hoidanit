import Select from 'react-select';
import { useState } from 'react';
import './Question.scss';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
const Questions = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [isPreviewImg, setIsPreviewImg] = useState(false);
  const [dataImgPrev, setDataImgPrev] = useState({
    title: '',
    url: '',
  });
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [
        { id: uuidv4(), description: '', isCorrect: false },
        { id: uuidv4(), description: '', isCorrect: false },
      ],
    },
  ]);
  //add and remove question
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
  //add and remove answer
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
  //input change
  const handleInputChange = (type, queId, value) => {
    if (type === 'QUE') {
      let queClone = _.cloneDeep(questions);
      let index = queClone.findIndex((item) => item.id === queId);
      if (index > -1) {
        queClone[index].description = value;
        setQuestions(queClone);
      }
    }
  };
  //handleChangeFIle
  const handleOnChangeFile = (queId, e) => {
    let queClone = _.cloneDeep(questions);
    let index = queClone.findIndex((item) => item.id === queId);

    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      queClone[index].imageFile = e.target.files[0];
      queClone[index].imageName = e.target.files[0].name;
      setQuestions(queClone);
    }
  };
  const handleAnswerQue = (type, answerId, questionId, value) => {
    let queClone = _.cloneDeep(questions);
    let index = queClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      queClone[index].answers = queClone[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === 'CHECK') {
            answer.isCorrect = value;
          }
          if (type === 'INPUT') {
            answer.description = value;
          }
        }
        return answer;
      });
    }
    setQuestions(queClone);
  };
  const handleSubmit = () => {
    console.log(questions);
  };

  const handlePrevImg = (id) => {
    let queClone = _.cloneDeep(questions);
    let index = queClone.findIndex((item) => item.id === id);
    console.log(questions, index);
    if (index > -1) {
      setDataImgPrev({
        url: URL.createObjectURL(queClone[index].imageFile),
        title: queClone[index].imageName,
      });
      setIsPreviewImg(true);
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
                    onChange={(e) =>
                      handleInputChange('QUE', question.id, e.target.value)
                    }
                  />
                  <label> Description {index + 1}</label>
                </div>
                <div className="upload-container">
                  <label htmlFor={`${question.id}`}>
                    <RiImageAddFill className="label-img-icon" />
                  </label>

                  <input
                    id={`${question.id}`}
                    type={'file'}
                    hidden
                    onChange={(e) => handleOnChangeFile(question.id, e)}
                  />
                  <span>
                    {question.imageName ? (
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePrevImg(question.id)}
                      >
                        {question.imageName}
                      </span>
                    ) : (
                      ' 0 files is uploaded'
                    )}
                  </span>
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
                      <input
                        className=" isCorrect"
                        type="checkbox"
                        checked={answer.isCorrect}
                        onChange={(e) =>
                          handleAnswerQue(
                            'CHECK',
                            answer.id,
                            question.id,
                            e.target.checked
                          )
                        }
                      ></input>
                      <div className="form-floating answer ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={answer.description}
                          onChange={(e) =>
                            handleAnswerQue(
                              'INPUT',
                              answer.id,
                              question.id,
                              e.target.value
                            )
                          }
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

      {questions && questions.length > 0 && (
        <div>
          <button className="btn btn-warning" onClick={handleSubmit}>
            Save Questions
          </button>
        </div>
      )}

      {/* imgPrev */}
      {isPreviewImg && (
        <Lightbox
          image={dataImgPrev.url}
          title={dataImgPrev.title}
          onClose={() => setIsPreviewImg(false)}
        />
      )}
    </div>
  );
};

export default Questions;
