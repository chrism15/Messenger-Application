import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return <main>

  <header> 
      <img  className="logo" 
          src="https://www.androidpolice.com/wp-content/uploads/2018/09/android-messages-icon-35.png"
      />
      <span>Messenger</span> 
  </header>

  <TextInput onSend={t=> console.log(t)} />
  
  <img className="pic"
      src="https://retohercules.com/images/android-material-design-icons-png-18.png"
  />

  <img className="add"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2hUsO6vpxKDGWoM8kgSUP6fHoAG47MTla2L3bYiWPwhVTQXnG&s"
  />

  </main>
}

function TextInput(props){
  const [text,setText] = useState('')

  return <div className="text-input">
      <input className="input" value={text} 
      placeholder="Text message"
      onChange={e=> setText(e.target .value)}
      />
      <button className="button" onClick={()=> {
          props.onSend(text)
          setText('')
      }}>
      <img  className="button-img" 
          src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_send_48px-512.png"
      />
      </button>
  </div>
}

export default App;
