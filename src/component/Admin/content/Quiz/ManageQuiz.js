import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const ManageQuiz = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'DIFFICULT', label: 'Difficult' },
  ];

  const handleChangeFile = (e) => {
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    if (!name || !desc) {
      toast.error('Name/Description is required');
    }
    let res = await postCreateNewQuiz(desc, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName('');
      setDesc('');
      setImage('');
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <fieldset class="border rounded-3 p-3">
              <legend class="float-none w-auto px-3">Add new Quiz</legend>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your quiz name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Name</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your quiz description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Description</label>
              </div>
              <div className="my-3">
                <Select
                  value={type}
                  onChange={setType}
                  options={options}
                  placeholder={'Quiz type'}
                />
              </div>
              <div className="more-actions ">
                <label className="mb-3"> Upload image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleChangeFile(e)}
                />
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </button>
              </div>
            </fieldset>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default ManageQuiz;
