import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import { getAllUsers } from '../../../../services/apiService';
const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchQuiz();
    fetchUser();
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
  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let users = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username} - ${item.email}`,
        };
      });
      setListUser(users);
    }
  };
  return (
    <div className="add-new-question row">
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
      <div className="col-6 form-group">
        <label>Select User</label>
        <div className="App">
          <Select
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={listUser}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-warning mt-4">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
