import { Card, CardContent, Typography,TextField , Button} from "@material-ui/core";
import React, { memo, forwardRef, useState} from "react";
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
    ? { backgroundColor: "" }
    : { backgroundColor: "" };
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
      let data = { username: props.user , 'text' : replayInput ,'timestamp' :firebase.firestore.FieldValue.serverTimestamp(), 'email': firebase.auth().currentUser.email}
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
     
      <Card className="message__replay_card" style={bgcolor} variant="outlined" onClick={()=> replayHandler({name:name ,text:text })}>
        <CardContent>

         {/* replay msg */}
        {replay.text &&
          <Card >
            <CardContent  className="message__replay_card">
            <small className="message__name"> {replay.name}  </small> 
              <Typography  className="message_text message__replay_text"  variant="body1" component="h2">
                <small className="message__text"> {replay.text}  </small> 
              </Typography>
            </CardContent>
          </Card>
        }
         {/* rply msf end */}
  
          <Typography  className="message_text"  variant="body1" component="h2">
          {!isUser?
          <div>
            <small className="message__name"> {name}  </small> 
            <small className="message__text"> {text}  </small>  
          </div>
          :
          <small className="message__text"> {text}  </small>  

          }
          
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
                color="primary" onClick={updateMessageHandler}> <SendIcon/> 
            </Button>
            <Button variant="contained"
                color="primary" onClick={replayCloseHandler}><CancelPresentationIcon/>
            </Button>
            
          </div>
           </div>
        </CardContent>
      </Card>
      }
    </div>
  );
})

export default memo(Message);
