import { useRef } from 'react';
import CountDown from './CountDown';

const RightContent = ({ dataQuiz, handleFinish, setIndexQ }) => {
  const refDIv = useRef([]);

  const onTimeUp = () => {
    handleFinish();
  };

  const getClassQuestion = (question, index) => {
    let isUnAnswered = question.answers.find((a) => a.isSelected === true);
    if (isUnAnswered) {
      return 'question clicked';
    }
    return 'question';
  };

  const handleCLickQue = (question, index) => {
    setIndexQ(index);
    if (refDIv.current) {
      refDIv.current.forEach((item) => {
        if (item && item.className === 'question selected')
          item.className = 'question';
      });
      if (question && question.answers.length > 0) {
        let isUnAnswered = question.answers.find((a) => a.isSelected === true);
        if (isUnAnswered) {
          return;
        }
      }
      refDIv.current[index].className = 'question selected';
    }
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz?.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={index}
                className={getClassQuestion(item, index)}
                onClick={() => handleCLickQue(item, index)}
                ref={(ref) => (refDIv.current[index] = ref)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
