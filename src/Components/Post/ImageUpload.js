import { Button } from "@mui/material";
import React from "react";
import { ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import "/ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = ref(storage, `images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //   Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //   Complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadUrl()
          .then((url) => {
            // post image inside db
            collection(db, "posts").add({
              timestamp:
                FirebaseError.firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
              alt: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {/* to have */}
      {/* caption input */}
      {/* file picker */}
      {/* post button */}
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption ..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload a Photo</Button>
    </div>
  );
}

export default ImageUpload;
