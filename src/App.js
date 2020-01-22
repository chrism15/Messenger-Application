import React, {useState/*, useEffect*/} from 'react'
import './App.css'
//import {db} from './db'
import NamePicker from './namePicker'
import { MdSend } from "react-icons/md";

function App() {
  const [messages, setMessages] = useState([])
  const [name,setName] = useState('')
/*
  useEffect(()=>{
    db.listen({
      receive:m=> setMessages(current=> [m,...current]),
    })
  }, [])
*/
console.log(messages)
  
  return <main>

    <header> 
      <div style={{display:'flex',alignItems:'center'}}>
      <img className="logo"
        alt="logo"
        src="https://miro.medium.com/max/1024/0*tbErRTQ6dR298pDo" 
      />
      Messenger
      </div>
      <NamePicker  onSave={setName} />
    </header>

    <div className="messages">
      {messages.map((m,i)=>{
        return <div key={i} className="message-wrap">
          <div className="message">{m}</div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
      /*
      db.send({
        text, name, ts: new Date(),
      })*/
      setMessages([text, ...messages])
    }} />
    
  </main>
}


function TextInput(props){
  var [text, setText] = useState('') 
  return <div className="text-input-wrap">
    <input 
      value={text} 
      className="text-input"
      placeholder="Text message"
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
      <MdSend />
    </button>
  </div>
}

export default App 