import React, { useState, useEffect } from "react";
import Message from "./Message";
import { Button, TextField } from "@material-ui/core";
import db from './firebase.js';
import firebase from 'firebase';
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
      db.collection('messages').add({
        text:input,
        username:username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setMessages([...messages, { username: username, text: input }]) 
    }
    setInput("");
  };
  return (
    <div>
      <form onSubmit={clickMessageHandler} className="form">
        <TextField 
          className="type_input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="enter message here..."
        />
        <Button 
          className="type_button"
          variant="contained"
          color="primary"
          onClick={clickMessageHandler}
          disabled={!input}
        >
          send
        </Button>
      </form>
      {messages.map((message, index) => {
        return <Message key={index} message={message} user={username}/>;
      })}
      <div className="main__margin"></div>
    </div>
  );
}
