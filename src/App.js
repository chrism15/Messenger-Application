import React, {useState} from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])

  console.log(messages)
  return <main>

    <header> 
      <img className="logo"
        alt="logo"
        src="https://miro.medium.com/max/1024/0*tbErRTQ6dR298pDo" 
      />
      Messages
    </header>

    <div className="messageScroll">
    {messages.map((m,i)=>{
      return <div key ={i} className="message">{m}</div>
    })}    
    </div>

    {/* messages */}

    <TextInput onSend={(text)=> {
      setMessages([text, ...messages])
    }} />
    
  </main>
}

function TextInput(props){
  var [text, setText] = useState('') 
  // normal js comment
  return <div className="text-input-wrap">
    <input value={text} className="text-input"
      placeholder="Text message"
      onChange={e=> setText(e.target.value)}
    />
    <button onClick={()=> {
      if(text){
       props.onSend(text)
      }
      setText('')
    }} className="button" disabled={!text}>
      SEND
    </button>
  </div> 
}

export default App