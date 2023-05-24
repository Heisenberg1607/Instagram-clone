import "./App.css";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ImageUpload from "./ImageUpload";
// import AdSense from "react-adsense";
import Adsense from "./Adsense";
import axios from "axios";

function App() {
  const [post, setPost] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [open, setOpen] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const auth = getAuth();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       console.log(user);
  //       setUser(user);

  //       if (user.displayName) {
  //         //
  //       } else {
  //         updateProfile(user, {
  //         displayName: username,
  //       })
  //         .then(() => {
  //           // Profile updated!
  //           // ...
  //           console.log(user.displayName);
  //         })
  //         .catch((error) => {
  //           // An error occurred
  //           // ...
  //           })
  //       }
  //     } else {
  //       // User is signed out
  //       // ...
  //       setUser(null);
  //     }

  //     return () => {
  //       unsubscribe();
  //     }
  //   });
  // }, [user,username]);

  useEffect(() => {
    axios.get("http://localhost:8000/display").then((response) => {
      setPost(response.data);

      // console.log(post[5]);
    });
  }, []);

  console.log(post);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // useEffect(() => {
  //   // db.collection('posts').onSnapShot(snapshot => {
  //   //   setPost(snapshot.docs.map(doc => doc.data()));
  //   // })

  //   const colRef = collection(db, "Posts");
  //   onSnapshot(colRef, (snap) => {
  //     // setPost(snap.docs.map((doc) => doc.data()));
  //     let arr = [];

  //     snap.docs.forEach(data => {
  //       console.log(data.data());
  //       arr.push({ ...data.data(), id:data.id });
  //     })

  //     setPost(arr);
  //   });

  // }, [])

  const signUp = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        // ..
      });
  };

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        //any error will be shown here
        // const errorCode = error.code;
        alert(error.message);
      });
    setOpenSignIn(false);
  };

  return (
    <div className="App">
      

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box sx={style}>
          <form className="app__signUp">
            <center className="xyz">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QsdmFQyAw0A28Zo3y5CcPYNA5yD7Y4GaLA&usqp=CAU"
                alt=""
                className="header-logo"
              />
              <TextField
                variant="standard"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                variant="standard"
                placeholder="Email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant="standard"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </center>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}
      >
        <Box sx={style}>
          <form className="app__signUp">
            <center className="xyz">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QsdmFQyAw0A28Zo3y5CcPYNA5yD7Y4GaLA&usqp=CAU"
                alt=""
                className="header-logo"
              />

              <TextField
                variant="standard"
                placeholder="Email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant="standard"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button type="submit" onClick={signIn}>
                Sign In
              </Button>
            </center>
          </form>
        </Box>
      </Modal>
      {/* header */}
      <div className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QsdmFQyAw0A28Zo3y5CcPYNA5yD7Y4GaLA&usqp=CAU"
          alt=""
          className="header-logo"
        />

        {/* <Adsense></Adsense> */}
        <Adsense dataAdSlot="8150407392"></Adsense>

        {/* {user ? (
          <Button
            type="submit"
            onClick={() => {
              signOut(auth);
            }}
          >
            LogOut
          </Button>
        ) : (
          <div>
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Sign Up
            </Button>

            <Button
              onClick={() => {
                setOpenSignIn(true);
              }}
            >
              Sign In user
            </Button>
          </div>
        )} */}
      </div>

      {/* post */}

      {/* {post.map((post) => (
        <Post
          key={post.id}
          // postId={post.id}
          user={user}
          username={post.username ?? "Unknown User"}
          caption={post.caption}
          imageUrl={post.image}
          className="posts"
        ></Post>
      ))} */}

      {post &&
        post.map((post) => (
          <Post
            key={post.id}
            user={user}
            username={post.username ?? "Unknown User"}
            caption={post.caption}
            imageUrl={`data:image/jpeg;base64,${post.base64Image}`}
            className="posts"
          />
        ))}

      <ImageUpload username={user.displayName}></ImageUpload>
    </div>
  );
}

export default App;
