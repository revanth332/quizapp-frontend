import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Quiz.css";
import html2canvas from "html2canvas";
import { URL } from "../App";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const [report,setReport] = useState(false)


  useEffect(() => {
    axios
      .post(`${URL}/getquiz`, { quizid: id })
      .then((res) => {
        console.log(res)
        if(res.data.success === "true"){
        setQuiz(res.data.quizitem);
        let quiz = res.data.quizitem;
        setAnswers(res.data.quizitem.answers);
        setChecked(
          [...new Array(quiz.qcount)].map((item, indx) =>
            quiz.selections[indx] === "checkbox"
              ? new Array(quiz.optionslist[indx].length).fill(false)
              : false
          )
        );
        }
        else{
          setQuiz("false");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOption(e, indx, oindx) {
    setChecked(
      checked.map((item, ix) =>
        ix === indx
          ? quiz.selections[indx] === "checkbox"
            ? item.map((op, inx) =>
                inx === oindx ? (op ? false : e.target.value) : op
              )
            : e.target.value
          : item
      )
    );
    //setAnswers(answers.map((ans,ix) => ix === indx ? quiz.selections[indx] === 'checkbox' ? ans.map((op,inx) => checked[indx][inx] ? "quiz.optionslist[indx][inx]" : "op"+checked[indx][inx]) : e.target.value : ans))
  }

  function countScore(total, answer, index) {
    if (quiz.selections[index] === "checkbox") {
      let point = true;
      for (let item in answers[index]) {
        if (!answer.includes(item)) point = false;
      }
      return point ? total + 1 : total;
    }
    return answers[index] === answer ? total + 1 : total;
  }

  function submitQuiz() {
    setIsSubmited(true);
    setScore(checked.reduce(countScore, 0));
    setReport(true);
    //setAnswers(answers.map((ans,indx) => quiz.selections[indx] === 'checkbox' ? ans.map((op,inx) => checked[indx][inx] ? quiz.optionslist[indx][inx] : op) : "ans"))
  }

  function downloadQuiz() {
    html2canvas(document.getElementById("report-container")).then(function (
      canvas
    ) {
      let link = document.createElement("a");
      link.download = 'report.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  function setColor(option, indx) {
    let success = [
      "inset -5px 5px 12px #7fd07e,inset 5px 5px 12px #abffaa",
      "#95f594",
    ];
    let fail = [
      "inset 20px 20px 60px #d07e7e,inset -20px -20px 60px #ffaaaa",
      "#f59494",
    ];
    let normal = [
      "inset -5px 5px 12px white,inset 5px 5px 12px rgba(0,0,0,.32)",
      "white",
    ];
    let bgCol;
    bgCol =
      quiz.selections[indx] === "checkbox"
        ? answers[indx].includes(option)
          ? success
          : normal
        : option === answers[indx]
        ? success
        : normal;
    bgCol =
      quiz.selections[indx] === "checkbox"
        ? checked[indx].includes(option) && !answers[indx].includes(option)
          ? fail
          : bgCol
        : option === checked[indx] && !(option === answers[indx])
        ? fail
        : bgCol;
    return bgCol;
  }

  const data = quiz
    ? {
        labels: ["Questions", "Correct", "Wrong"],
        datasets: [
          {
            label: "# of questions",
            data: [quiz.qcount, score, quiz.qcount - score],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div id="report-container" className="rcontainer">
      {quiz !== null ? quiz !== "false" ? (
        <div className="qcontainer">
          <div className="title-box">
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
          </div>
          <hr></hr>
          {quiz.questions.map((item, indx) => (
            <div className="qbox">
              <h5>{item}</h5>
              {quiz.optionslist[indx].map((option, oindx) => (
                <div
                  style={{
                    padding: "0 10px",
                    margin: "30px 0",
                    borderRadius: "5px",
                    background: isSubmited
                      ? setColor(option, indx)[1]
                      : "white",
                    boxShadow: isSubmited
                      ? setColor(option, indx)[1]
                      : "inset -5px 5px 12px white,inset 5px 5px 12px rgba(0,0,0,.32)",
                  }}
                  className="op-box"
                >
                  <label className="option-label">
                    <input
                      disabled={isSubmited}
                      name={"question" + indx}
                      value={option}
                      onChange={(e) => handleOption(e, indx, oindx)}
                      type={quiz.selections[indx]}
                    />
                    <span className="option">{option}</span>
                  </label>
                  <br />
                </div>
                // <h2>hello</h2>
              ))}
              {isSubmited ? (
                <div>
                  <h6>Explanation:</h6>
                  {quiz.explanations[indx] === ""
                    ? "No Explanation provided."
                    : quiz.explanations[indx]}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : <div className="no-quiz"><h2>No quiz available...</h2></div> : (
        <div class="spinner"></div>
      )}
      {!isSubmited && !(quiz === "false") ? (
        <div className="submit-btn">
          <button onClick={submitQuiz} className="submit">
            {" "}
            Submit
          </button>
        </div>
      ) : null
    }
      {
        report ? (
        <div>
          <div className="qbox graph-box">
          <div>
            <Doughnut data={data} />
            </div>
            <div style={{color:"#6a90e5",fontWeight:"600"}}>
              <h4>Quizscore : {score< 10 ? "0"+score : score}</h4>
              <br></br>
              <h4>Accuracy: {Math.round((score/quiz.qcount)*100,2)}%</h4>
            </div>
            
          </div>
          <br />
          <div className="submit-btn">
            <button onClick={downloadQuiz} className="submit">
              {" "}
              Download Report
            </button>
          </div>
        </div>
      ) : null} 
    </div>
  );
}

