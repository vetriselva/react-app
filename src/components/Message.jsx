import { Card, CardContent, Typography,TextField , Button} from "@material-ui/core";
import React, { memo, forwardRef, useState } from "react";
import SendIcon from '@material-ui/icons/Send';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import firebase from 'firebase';
import "./Message.css";

const Message = forwardRef(( props ,ref )=> {
  const [replayInput, setreplayInput] = useState('')
  const { username, text ,replay } = props.message;
  const isUser = props.user === username;
  const name =  username ? username :'unknown';
  const bgcolor = isUser
    ? { backgroundColor: "darksalmon" }
    : { backgroundColor: "darkolivegreen" };
  const [isreplay,setisReplay] = useState(false)
  const [replayData,setReplayData] = useState({})
  
  const replayHandler = (payload) => {
    setReplayData(payload)
    setisReplay(true)
  }
  console.log('asd');
  const replayCloseHandler = ()=>{
    setisReplay(false)
  }
  const updateMessageHandler= () =>{
      let data = { username: props.user , 'text' : replayInput ,'timestamp' :firebase.firestore.FieldValue.serverTimestamp()}
      data['replay'] = replayData
      // console.log(data);
      // console.log('replay',data);
      props.updateMessageHandler(data)
      setisReplay(false)
  }

  const replayInputHandler = (e) => {
    setreplayInput(e.target.value)
  }
  return (
    <div className={`${isUser ? "message_card" : "message"}`}>
      <Card className="" style={bgcolor} variant="outlined" onClick={()=> replayHandler({name:name ,text:text })}>
        <CardContent>
         {replay.text && <small>{replay.name} : {replay.text}</small>}  
          <Typography  className="message_text"  variant="body1" component="h2">
           {!isUser && `${name} :`} {text} 
          </Typography>
        </CardContent>
      </Card>
      {isreplay &&
        <Card className="" style={bgcolor} variant="outlined">
        <CardContent>
        {<small>{replayData.name} : {replayData.text}</small>}  
          <div className="replay_message">
          <TextField 
            onChange={replayInputHandler}
            placeholder="enter message here..."
          />
          <div className="replay__wbutton">
          <Button variant="contained"
              color="primary" onClick={updateMessageHandler}> <SendIcon/> </Button>
            <Button variant="contained"
              color="primary" onClick={replayCloseHandler}><CancelPresentationIcon/></Button>
          
          </div>
           </div>
        </CardContent>
      </Card>
      }
    </div>
  );
})

export default memo(Message);
