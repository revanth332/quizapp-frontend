import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import QuizLink from './components/QuizLink';
import Quiz from './components/Quiz';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route index path="/signup" element={<SignUp />}></Route>
        <Route path="/quizid/:id" element={<Quiz />} />
        <Route path="/makequiz" element={<App/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
