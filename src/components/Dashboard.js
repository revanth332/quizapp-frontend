import React from 'react'
import AppNavbar from './AppNavbar'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className='db-container'>
      <AppNavbar logged={true}/>
      <QuizItem/>
    </div>
  )
}

function QuizItem(){
  return (
    <div className='quiz-item'>
      quiz 1
    </div>
  )
}
//code for slidable div?