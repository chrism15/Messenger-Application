import React, {useState, useEffect} from 'react'
import './App.css'
import './media.css'
import {db, useDB} from './db'
import NamePicker from './namePicker'
import { BrowserRouter, Route } from 'react-router-dom'
import "firebase/storage"
import { MdSend } from "react-icons/md";
function App(){

  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room} />
  </BrowserRouter>
}



function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const messages = useDB(room)

  return <main>

   

    <header>
      <div className="logo-wrap">
        <img className="logo"
          alt="logo"
          src="https://miro.medium.com/max/1024/0*tbErRTQ6dR298pDo" 
        />
        <div className="title">Messenger</div>
      </div>
      <NamePicker onSave={setName} />
    </header>

    <div className="messages">
      {messages.map((m,i)=> <Message key={i} 
        m={m} name={name} 
      />)}
    </div>

    <TextInput 
      onSend={(text)=> {
        db.send({
          text, name, ts: new Date(), room
        })
      }} 
    />
    
  </main>
}



function Message({m, name}){
  return <div className="message-wrap"
    from={m.name===name?'me':'you'}
    onClick={()=>console.log(m)}>
    <div className="message">
      <div className="msg-name">{m.name}</div>
      <div className="msg-text">
        {m.text}
      </div>
    </div>
  </div>
}



function TextInput(props){
  var [text, setText] = useState('') 
  var [tsize, settSize] = useState('')

  // normal js comment
  return <div className="text-input-wrap">
    <input
      size={text}
      className="size-input"
      placeholder="17"
      onChange={e=> settSize(e.target.size)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(tsize) var textSize = tsize
            settSize('')
        }
      }}
    /> 

    <input 
      value={text} 
      className="text-input"
      placeholder="write your message"
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />

    

    <button onClick={()=> {
      if(text) props.onSend(text)
      setText('')
    }} className="button"
      disabled={!text}>
      < MdSend />
    </button>
  </div>
}

export default App