import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getQuizData } from "../../services/apiService";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;
  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    const res = await getQuizData(quizId);
    console.log(res);
  };
  return <div>scasc</div>;
};

export default DetailQuiz;
