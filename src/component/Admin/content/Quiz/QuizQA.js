import Select from 'react-select';
import { useState, useEffect } from 'react';
import './QuizQA.scss';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { toast } from 'react-toastify';
import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
  postNewAnswer,
  postNewQue,
  getQuizWithQA,
} from '../../../../services/apiService';
const QuizQA = () => {
  const initQue = [
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
  ];
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  console.log(listQuiz);

  const [isPreviewImg, setIsPreviewImg] = useState(false);
  const [dataImgPrev, setDataImgPrev] = useState({
    title: '',
    url: '',
  });
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState(initQue);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQUizQA();
    }
  }, [selectedQuiz]);

  const fetchQUizQA = async () => {
    const res = await getQuizWithQA(selectedQuiz.value);
    console.log(res);
    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    }
    if (res && res.EC === 0) {
      // convert base64 to file obj
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            'image/png'
          );
        }
        newQA.push(q);
      }

      setQuestions(newQA);
      console.log(newQA);
    }
  };

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
  const handleSubmit = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error('please choose a quiz');
      return;
    }

    // validate answer

    let isValidAns = true;
    let indexQue = 0,
      indexAns = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAns = false;
          indexAns = j;
          break;
        }
      }
      indexQue = i;
      if (isValidAns === false) break;
    }
    if (isValidAns === false) {
      toast.error(
        `Not empty answer ${indexAns + 1} at Question ${indexQue + 1}`
      );
    }
    //validate questions

    let isValidQue = true;
    let indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQue = false;
        indexQ = i;
        break;
      }
    }

    if (isValidQue === false) {
      toast.error(`Not empty description for question  ${indexQ + 1}`);
      return;
    }

    //api post new question and answer
    for (const question of questions) {
      const q = await postNewQue(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postNewAnswer(answer.description, answer.isCorrect, q.DT.id);
      }
    }
    toast.success('Create question and answer success !');
    setQuestions(initQue);
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
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select quiz</label>
          <div className="App">
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
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

export default QuizQA;
