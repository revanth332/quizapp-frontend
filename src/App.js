import './App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {RiAddCircleLine,RiCheckboxBlankLine,RiCheckboxBlankCircleLine,RiDeleteBin6Line,RiFileCopyLine,RiStopCircleLine,RiUploadCloud2Line,RiDeleteBin2Line} from 'react-icons/ri';
import {CgRemove} from 'react-icons/cg'
import axios from 'axios';
import QuizLink from './components/QuizLink';
import AppNavbar from './components/AppNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {  
  const [selection,setSelection] = useState(['radio']);
  const [question,setQuestion] = useState(['Question']);
  const [title,setTitle] = useState('Title');
  const [description,setDescription] = useState("Descripion")
  const [qcount,setQcount] = useState(1);
  const [optionslist,setOptionsList] = useState([['Option 1']])
  const [answers,setAnswers] = useState([''])
  const [explanations,setExplanations] = useState([''])
  const [isEditing,setIsEditing] = useState([false])
  const [quizid,setQuizid] = useState('')
  const [showLink,setShowLink] = useState(false)

  const notify = () => toast.warn('Please check the empty fields...', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  

  function addquestion(){
    setIsEditing([...isEditing,false])
    setExplanations([...explanations,''])
    setAnswers([...answers,''])
    setOptionsList([...optionslist,['Option 1']])
    setSelection([...selection,'radio'])
    setQuestion([...question,'Question'])
    setQcount(qcount+1);
  }
  
  function addOption(e,indx){
    setOptionsList(optionslist.map((element, index) => index === indx ? [...element,`Option${element.length+1}`] : element))
  }

  function delOption(e,indx,oindx){
    setOptionsList(optionslist.map((element, index) => index === indx ? element.filter((item,ix) => ix !== oindx) : element))
  }
  function removeQuestion(indx){
    setIsEditing(isEditing.filter((item,ix) => ix !== indx))
    setExplanations(explanations.filter((item,ix) => ix !== indx))
    setAnswers(answers.filter((item,ix) => ix !== indx))
    setOptionsList(optionslist.filter((item,ix) => ix !== indx))
    setSelection(selection.filter((item,ix) => indx !== ix))
    setQuestion(question.filter((item,ix) => indx !== ix))
    setQcount(qcount-1);
  }
  function copyQuestion(indx){
    setExplanations([...explanations,explanations[indx]])
    setAnswers([...answers,answers[indx]])
    setIsEditing([...isEditing,isEditing[indx]])
    setOptionsList([...optionslist,optionslist[indx]])
    setSelection([...selection,selection[indx]])
    setQuestion([...question,question[indx]])
    setQcount(qcount+1);
  }
  function deletequiz(){
    setIsEditing([false])
    setExplanations([''])
    setAnswers([''])
    setOptionsList([['Option 1']])
    setSelection(['radio'])
    setQuestion(['Question'])
    setQcount(1)
  }
  function validateQuiz(){
    let valid = true;
    for(let i=0;i<qcount;i++){
      if(question[i].trim() == '') valid = false;
    }
    for(let i=0;i<qcount;i++){
      if(explanations[i].trim() == '') valid = false;
    }
    for(let i=0;i<qcount;i++){
      for(let j = 0;j<optionslist[i].length;j++){
        if(optionslist[i][j].trim() == '') valid = false;
      }
    }
    if(qcount !== question.length || qcount !== selection.length || qcount !== optionslist.length || qcount !== answers.length || qcount !== explanations.length) valid = false;
    return valid;
  }
  function uploadquiz(){
    if(validateQuiz()){
    axios.post(`${URL}/addquiz`,{quiz:{
      title:title,
      description:description,
      questions:question,
      answers:answers,
      optionslist:optionslist,
      selections:selection,
      qcount:qcount,
      explanations:explanations
    }}).then((res) => {
      window.scrollTo({top:0,behavior:'smooth'})
      setQuizid(res.data.quizid)
      setShowLink(true)
      console.log(title)
    }).catch((e) => console.log(e))
  }
  else{
    notify();
  }
  }
  return (
    <>
    {
      showLink ? <>
      <div className='popup'>
          </div>
          <div className='link-container'>
            <h4>Quiz Link</h4>
            <QuizLink quizid={quizid}/>
          </div>
      </> : null
    }
    <div className='apcontainer'>
    <AppNavbar logged={true}/>
    <ToastContainer />
    <div className=" nshadow form-container">
      <form className='titleForm'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className='title ' type="text" />
        <br/><br/>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className='description ' type="text" />
      </form>
    </div>
    
      {
        [...new Array(qcount)].map((item,indx) => (
          <div className="nshadow question-container">
            <form onClick={() => setIsEditing(isEditing.map((item,ix) => ix === indx ? true : false))} className='titleForm nshadow'>
              <Row>
              <Col>
              <input value={question[indx]} onChange={(e) => setQuestion(question.map((element, index) => index === indx ? e.target.value : element))} className='title question ' type="text" />
              </Col>
              {isEditing[indx] ? 
              <Col>
              <select className='title question ' value={selection[indx]} onChange={(e) => setSelection(selection.map((element, index) => index === indx ? e.target.value : element))}>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
              </select>
              </Col> :null }
              </Row>
              {
                optionslist[indx].map((item,oindx) => (
                  <div className='optionsContainer'>
                    <div className='options'>
                    {selection[indx] === 'radio' ? <RiCheckboxBlankCircleLine fontSize={20} className='icons'/> : <RiCheckboxBlankLine fontSize={20}/>}
                    <input value={item} onChange={(e) => setOptionsList(optionslist.map((element, index) => index === indx ? element.map((option,ix) => ix === oindx ? e.target.value : option) : element))} className='description' type="text" />
                    </div>
                    {isEditing[indx] ? <CgRemove onClick={(e) => delOption(e,indx,oindx)} fontSize={20} color="red"/> : null }
                  </div>
                ))
              }
              {isEditing[indx] ? 
              <>
              <input className='description' value={answers[indx]} onChange={(e) => setAnswers(answers.map((item,ix) => ix === indx ? selection[indx] === 'checkbox' ? e.target.value.split(',') : e.target.value : item ))} type="text" placeholder={selection[indx] === 'checkbox' ? "Comma separated answers if many..." : 'Answer'}/>
              <textarea className='description' placeholder='Explanation' value={explanations[indx]} onChange={(e) => setExplanations(explanations.map((item,ix) => ix === indx ? e.target.value : item ))}></textarea>
              </> : null }
            </form>
            <br/>
            {isEditing[indx] ? 
            <>
            <button onClick={(e) => addOption(e,indx)} className='addBtn'>add option</button>
            <hr/>
            </> : null }
            {isEditing[indx] ? 
            <div className='qtools'>
              <div data="Duplicate" className='tool'>
                <RiFileCopyLine onClick={() => copyQuestion(indx)} className='me-2 qtool qtool1' fontSize={40}/>
              </div>
              <div data="Remove" className='tool'>
              <RiDeleteBin6Line onClick={() => removeQuestion(indx)} className='me-2 qtool qtool2' fontSize={40} />
              </div>
              <div data="Stop editing" className='tool'>
                <RiStopCircleLine onClick={() => setIsEditing(isEditing.map((item,ix) => ix === indx ? false : item))} className='me-2 qtool qtool3' fontSize={40}/>
              </div>
            </div> : null }

          </div>
        ))
      }
      <div className='toolbox nshadow'>
        <div data="Add question" className='tool'><RiAddCircleLine className='tool-item' onClick={addquestion} color="blue" fontSize={25}/></div>
        <div data="Upload quiz" className='tool'><RiUploadCloud2Line className='tool-item' onClick={uploadquiz} color="green" fontSize={25}/></div>
        <div data="Delete quiz" className='tool'><RiDeleteBin2Line className='tool-item' onClick={deletequiz} color="red" fontSize={25}/></div>
      </div>
    </div>
    </>
  );
}

export default App;
