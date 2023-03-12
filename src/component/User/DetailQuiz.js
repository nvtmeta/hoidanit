import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuizData, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [indexQ, setIndexQ] = useState(0);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const handlePrev = () => {
    if (dataQuiz && indexQ - 1 < 0) return;
    setIndexQ(indexQ - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > indexQ + 1) setIndexQ(indexQ + 1);
  };
  const handleFinish = async () => {
    // {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = +item.questionId;
        let userAnswerId = [];
        item.answers.forEach((e) => {
          if (e.isSelected) {
            userAnswerId.push(e.id);
          }
        });
        answers.push({
          questionId: questionId,
          userAnswerId,
        });
      });
      payload.answers = answers;
    }
    //submit answer api

    let res = await postSubmitQuiz(payload);
    console.log(res);
    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData,
      });
      setShowModalResult(true);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      // phai co dau + moi ok , bien string thanh number
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    const res = await getQuizData(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)

        // Group the elements of Array based on `color` property
        .groupBy('id')
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.questionDescription;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title"> Quiz 1: {location?.state?.quizTitle}</div>
        <hr />

        <div className="q-content">
          <Question
            handleCheckBox={handleCheckBox}
            index={indexQ}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[indexQ] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={handlePrev}>
            Prev
          </button>
          <button className="btn btn-primary " onClick={handleNext}>
            Next
          </button>
          <button className="btn btn-warning " onClick={handleFinish}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
      <ModalResult
        show={showModalResult}
        setShow={setShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
