import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyCA0BBP9tOj0mlWWD2XLcvYUTpTKB4Tphg",
    authDomain: "messenger2020-cmo.firebaseapp.com",
    databaseURL: "https://messenger2020-cmo.firebaseio.com",
    projectId: "messenger2020-cmo",
    storageBucket: "messenger2020-cmo.appspot.com",
    messagingSenderId: "559567350433",
    appId: "1:559567350433:web:4410d533d0bb791ac2dee0",
    measurementId: "G-709XHZ02ER"
  }

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()