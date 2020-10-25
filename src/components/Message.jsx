import { Card, CardContent, Typography } from "@material-ui/core";
import React, { memo ,forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(( { user, message } )=> {
  const { username, text } = message;
  const isUser = user === username;
  const name =  username ? username :'unknown';
  const bgcolor = isUser
    ? { backgroundColor: "silver" }
    : { backgroundColor: "blue" };

  return (
    <div className={`${isUser ? "message_card" : "message"}`} >
      <Card className="" style={bgcolor} variant="outlined">
        <CardContent>
          <Typography  className="message_text" variant="body1" component="h2">
           {!isUser && `${name} :`} {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
})

export default memo(Message);
