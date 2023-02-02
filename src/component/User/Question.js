import _ from "lodash";
import "./Question.scss";
const Question = ({ data, index, handleCheckBox }) => {
  console.log(data);
  const controlCheckBox = (answersId, questionId) => {
    console.log(answersId, questionId);
    handleCheckBox(answersId, questionId);
  };
  if (_.isEmpty(data)) {
    return;
  }
  return (
    <>
      <div className="q-container">
        <div className="q-image-body">
          {data.image && (
            <img
              className="q-image"
              alt="card"
              src={`data:image/jpeg;base64,${data.image}`}
            />
          )}
        </div>
        <div className="question">
          {index + 1} : {data.questionDescription}
        </div>
        <div className="answer">
          {data.answers &&
            data.answers.length > 0 &&
            data.answers.map((item, index) => {
              console.log(item);
              return (
                <div key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={() => {
                        console.log(item.answers);
                        controlCheckBox(item.id, data.questionId);
                      }}
                    />
                    <label className="form-check-label">
                      {item.description}
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Question;
