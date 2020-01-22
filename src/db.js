import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let db
const collection = 'messages' 

firebase.initializeApp({
    apiKey: "AIzaSyDe5hejNin_uspcktTCkhfQAhbWMIARuy0",
    authDomain: "chatterrrrrrr.firebaseapp.com",
    projectId: "chatterrrrrrr",
    storageBucket: "chatterrrrrrr.appspot.com",
})
db = firebase.firestore()

db.listen = function({receive, remove}){
    db.collection(collection) //.where('page','==',page)
        .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            // console.log(change.doc.data())
            if(receive) receive({id: change.doc.id, ...change.doc.data()})
        }
        if (change.type === 'removed') {
            if(remove) remove(change.doc.id)
        }
        })
    })
}

db.send = function(msg){
    return db.collection(collection).add(msg)
}

export {db}