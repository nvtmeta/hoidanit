import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getQuizData } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const quizId = params.id;
  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    const res = await getQuizData(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)

        // Group the elements of Array based on `color` property
        .groupBy("id")
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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title"> Quiz 1: {location?.state?.quizTitle}</div>
        <hr />
        <div className="q-body">
          <img alt="" />
        </div>
        <div className="q-content">
          <div className="question">Q1: What the hell?</div>
          <div className="answer">
            <div className="A-answer">A-answer</div>
            <div className="B-answer">B-answer</div>
            <div className="C-answer">C.ok</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary ">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
