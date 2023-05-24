import React, { useEffect, useState } from 'react'
import Avatar from "@mui/material/Avatar";
import "./post.css";
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { addDoc, collection, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { db, serverStamp } from './firebase';
import axios from "axios";
import { logDOM } from '@testing-library/react';


function Post({ user,postId, username, caption, imageUrl }) {

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  
  
  
  useEffect(() => {
    // const docRef = collection(
    //   db,
    //   `Posts/${postId}/comments/`);
    
    // onSnapshot(docRef, (snap) => { 
    //   // setPost(snap.docs.map((doc) => doc.data()));
    //   let arr = [];
      
    //   snap.docs.forEach(data => {
    //     console.log(data.data());
    //     arr.push({ ...data.data(), id: data.id });
        
    //   })

    //   setComments(arr);
    // });

    
    
    
  }, [])
// postId;  enter in dependency of useEffect
  const afterPost = () => {
    const docRef = collection(db, `Posts/${postId}/comments/`);

    addDoc(docRef, {
      text: comment,
      username: user.displayName,
      timestamp: serverStamp.now(),
    }).then(() => {
      // alert("comment uploaded");
    });
    setComment('');
}


return (
  <div className="post__main">
    <div className="post__header">
      <div className="post__avatar">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
      <h4 className="post__username">{username}</h4>
    </div>

    <img src={imageUrl} alt="" className="post__img" />

    {/* "https://c4.wallpaperflare.com/wallpaper/687/49/110/5-centimeters-per-second-anime-nature-clouds-wallpaper-preview.jpg" */}

    <h4 className="post__text">
      <strong>{username}</strong> {caption}
    </h4>

    {comments.map((comment) => (
      <div className="post__caption">
        <strong>{comment.username} </strong>
        {comment.text}
      </div>
    ))}

    {user && (
      <Box sx={{ display: "flex" }}>
        <TextField
          id="outlined-basic"
          placeholder="write comments"
          variant="outlined"
          sx={{ width: "100%" }}
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button variant="outlined" onClick={afterPost}>
          Post
        </Button>
      </Box>
    )}
  </div>
);
}


export default Post
