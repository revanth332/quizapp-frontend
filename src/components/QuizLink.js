import React from 'react'
import { Link } from 'react-router-dom'

export default function QuizLink({quizid}) {
  const link = `/quizid/${quizid}`
  const styles = {
    color:"black",
    padding:"10px",
    textDecoration:'none',
    fontWeight:'600',
    backgroundColor:'#f1f1f5'
  }
  return (
    <div><Link style={styles} to={link}>http://localhost:3000/quizid/{quizid}</Link></div>
  )
}
