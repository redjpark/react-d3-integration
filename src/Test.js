import React from 'react'

export default function Test(props) {


  return (
    <div onClick={()=>props.onClick()}>
      Hello {props.person}
    </div>
  )
}
