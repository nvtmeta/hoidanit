import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getQuizData } from "../../services/apiService";
import _ from "lodash";
const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    const res = await getQuizData(quizId);
    if (res && res.EC === 0) {
      console.log(res.DT);
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
      console.log(data);
    }
  };
  return <div>scasc</div>;
};

export default DetailQuiz;
