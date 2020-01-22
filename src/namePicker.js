import React, {useState, useRef, useEffect} from 'react'
import { FiEdit, FiSave } from 'react-icons/fi'

function NamePicker(props) {
  const [name, setName] = useState('')
  const [showName, setShowName] = useState(false)
  const inputEl = useRef(null)

  function save(){
    inputEl.current.focus()
    if(name && !showName) {
      props.onSave(name)
      localStorage.setItem('name',name)
    }
    setShowName(!showName)
  }

  useEffect(()=>{
    const n = localStorage.getItem('name')
    if(n) {
      setName(n)
      save() 
    }
  }, [])

  return <div className="edit-username">
    <input value={name} ref={inputEl}
      className="name-input"
      style={{display: showName ? 'none' : 'flex'}}
      onChange={e=> setName(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') save()
      }}
    />

    {showName && <div>{name}</div>}

    <button onClick={save} className="name-button">
      {showName ? <FiEdit /> : <FiSave />}
    </button>
  </div>
}

export default NamePicker