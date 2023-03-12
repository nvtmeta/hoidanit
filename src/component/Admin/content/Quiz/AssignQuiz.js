import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import {
  getAllQuizForAdmin,
  postAssignQUiz,
} from '../../../../services/apiService';
import { getAllUsers } from '../../../../services/apiService';
import { toast } from 'react-toastify';
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

  const handleAssign = async () => {
    const res = await postAssignQUiz(selectedQuiz.value, selectedUser.value);
    if (res.EC === 0 && res) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
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
        <button className="btn btn-warning mt-4" onClick={() => handleAssign()}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
