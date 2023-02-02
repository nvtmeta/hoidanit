import _ from "lodash";
import "./Question.scss";
const Question = ({ data, index }) => {
  console.log(data);
  if (_.isEmpty(data)) {
    return;
  }
  return (
    <>
      <div className="q-container">
        <div>
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
            data.answers.map((e, index) => {
              return (
                <div key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                    <label className="form-check-label">{e.description}</label>
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
