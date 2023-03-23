import './DashBoard.scss';
import { useState, useEffect } from 'react';
import { getOverview } from '../../../services/apiService';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

function DashBoard() {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  let Qz, Qs, Qa;
  const fetchDataOverView = async () => {
    try {
      const res = await getOverview();

      if (res && res.EC === 0) {
        setDataOverview(res.DT);

        Qz = res?.DT?.others?.countQuiz;
        Qs = res?.DT?.others?.countQuestions;
        Qa = res?.DT?.others?.countAnswers;
        const data = [
          {
            name: 'Quizzes',
            Qz: Qz,
          },
          {
            name: 'Questions',
            Qq: Qs,
          },
          {
            name: 'Answers',
            Qa: Qa,
          },
        ];
        setDataChart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setDataChart(data);
  return (
    <>
      <div className="dashboard-container">
        <div className="title">Dash title</div>
        <div className="content">
          <div className="content-left">
            <div className="content-item">
              Total user
              <span>
                {dataOverview &&
                dataOverview.users &&
                dataOverview.users.total ? (
                  <>{dataOverview.users.total}</>
                ) : (
                  0
                )}
              </span>
            </div>

            <div className="content-item">
              Total quizzes
              <span>
                {' '}
                {dataOverview &&
                dataOverview.others &&
                dataOverview.others.countQuiz ? (
                  <>{dataOverview.others.countQuiz}</>
                ) : (
                  0
                )}
              </span>
            </div>

            <div className="content-item">
              Total questions
              <span>
                {' '}
                {dataOverview &&
                dataOverview.others &&
                dataOverview.others.countQuestions ? (
                  <>{dataOverview.others.countQuestions}</>
                ) : (
                  0
                )}
              </span>
            </div>

            <div className="content-item">
              Total answers
              <span>
                <span>
                  {' '}
                  {dataOverview &&
                  dataOverview.others &&
                  dataOverview.others.countAnswers ? (
                    <>{dataOverview.others.countAnswers}</>
                  ) : (
                    0
                  )}
                </span>
              </span>
            </div>
          </div>
          <div className="content-right">
            <ResponsiveContainer width={'95%'} height={'100%'}>
              <BarChart data={dataChart}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Qz" fill="#8884d8" />
                <Bar dataKey="Qq" fill="#82ca9d" />
                <Bar dataKey="Qa" fill="#82ca2e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
