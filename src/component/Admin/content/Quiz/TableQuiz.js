import { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz.js";
import ModalDelQuiz from "./ModalDeleteQuiz.js";
const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const setDeleteQuiz = (item) => {
    console.log(item);
    setDataUpdate(item);
    setShowModalDelete(true);
  };
  const setUpdateQuiz = (item) => {
    setDataUpdate(item);
    setShowModalUpdateQuiz(true);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    console.log(res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <>
      <div> List Quiz:</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-1"
                      onClick={() => setUpdateQuiz(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => setDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ModalDelQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
      />
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default TableQuiz;
