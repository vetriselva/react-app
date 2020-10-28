import React, { useState, useEffect,  useMemo} from "react";
import Message from "./Message";
import { Button, TextField } from "@material-ui/core";
import db from './firebase.js';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import "./Message.css";


export default function Main() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(()=>{
    db.collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot( snapshot => {
      setMessages( snapshot.docs.map(doc =>doc.data()))
    })
  }, [] );
  useEffect(() => {
    setUsername(prompt("Enter your name:"));
  }, [] );

  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight)
  }, [messages] );
  const clickMessageHandler = (e) => {
    e.preventDefault();
    if(input){
      // db.collection('messages').add({
      //   text:input,
      //   username:username,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   replay : {name:'', text:''}
      // })
      setMessages([...messages, { username: username, text: input ,replay : {name:'', text:''}}]) 
    }
    setInput("");
  };
  const updateMessageHandler = (messageData) => {
    
    //db.collection('messages').add(messageData)
     setMessages([...messages, messageData]) 
  }
  const memoized = useMemo( () => updateMessageHandler,[])

  return (
    <div>
      
        <form onSubmit={clickMessageHandler} className="form">
        <div className="message_chat">
          <div className="type_input">
          <TextField 
            
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="enter message here..."
          />
          </div>
          <div className="type_button">
            <Button 
              
              variant="contained"
              color="primary"
              onClick={clickMessageHandler}
              disabled={!input}
            >
              <SendIcon/>
            </Button>
          </div>
          </div>
        </form>
      
        {messages.map((message, index) => {
          
            return <Message 
            key={index} 
            message={message} 
            user={username} 
            updateMessageHandler={memoized}
            />;
         
        }) }  
      
      <div className="main__margin"></div>
    </div>
  );
}
