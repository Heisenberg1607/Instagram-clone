import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage, db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./imageUpload.css";
import axios from "axios";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  // const [imageName, setImageName] = useState("");
  const [userIdentity, setUserIdentity] = useState("");
  // const [filename, setFilename] = useState("");


  //for errors

  const [captionError, setCaptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  console.log(userIdentity);
  const handleUpload = async () => {
    // console.log(spaceRef);

    // const storageRef = ref(storage, `images/${imageName}`);

    // uploadString(storageRef, image, "data_url").then(() => {
    //   getDownloadURL(storageRef).then((url) => {
    //     const colRef = collection(db, "Posts");
    //     addDoc(colRef, {
    //       caption: caption,
    //       imageUrl: url,
    //       username: username,
    //       timestamp: serverTimestamp(),
    //     }).then(() => {
    //       alert("img uploaded");
    //     });
    //   });
    // });

    
    const validateForm = () => {
      let isValid = true;

      // Reset error messages
      setCaptionError("");
      setImageError("");
      setUsernameError("");

      // Validate caption
      if (!caption) {
        setCaptionError("Caption is required");
        isValid = false;
      }

      // Validate image
      if (!image) {
        setImageError("Image is required");
        isValid = false;
      }

      // Validate username
      if (!userIdentity) {
        setUsernameError("Username is required");
        isValid = false;
      }

      return isValid;
    };

    
      if (userIdentity && image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("username", userIdentity);
        formData.append("caption", caption);

        await axios.post("http://localhost:8000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Data added");
        window.location.reload();
      } else {
        console.error("Error inserting data");
      }
    

    
  };

  // let base64url = "";
  // const handleImage = (e) => {
  //   const files = e.target.files;
  //   if (files.length === 0) return;
  //   else {
  //     const file = files[0];
  //     setImageName(file.name);
  //     console.log(file);
  //     // console.log(file.name);
  //     getBase64(file);
  //   }
  // };

  // const getBase64 = (file) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     base64url = reader.result;
  //     setImage(base64url);
  //     console.log(base64url);
  //   };
  // };

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      console.log("no image");
    }
  };

  console.log(image);

  return (
    <div className="image__upload">
      <form method="post">
        <Button onClick={handleUpload} sx={{ marginleft: "10px" }}>
          Upload
        </Button>

        <input
          type="text"
          placeholder="enter username"
          onChange={(event) => {
            setUserIdentity(event.target.value);
          }}
          error={!!usernameError}
          helperText={usernameError}
        />
        {/* <input
        type="text"
        placeholder="enter file name"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      /> */}
        <input
          type="text"
          placeholder="write caption here..."
          onChange={(event) => {
            setCaption(event.target.value);
          }}
          className="caption__field"
          error={!!captionError}
          helperText={captionError}
        />
        <input
          type="file"
          onChange={handleChange}
          className="browse_btn"
          name="image"
          error={!!imageError}
          helperText={imageError}
        />
      </form>
    </div>
  );
}

export default ImageUpload;
