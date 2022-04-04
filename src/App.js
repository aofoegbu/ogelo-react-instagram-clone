import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Components/Post/Post";
import { db } from "./firebase-config";
import { onSnapshot, collection } from "firebase/firestore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import ImageUpload from "./Components/Post/ImageUpload";

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

function App() {
  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUserData(user);
        if (user.displayName) {
          // don't update name
        } else {
          // if we just created someone
          return user.updateProfile({
            displayName: username,
          });
        }
        // ...
      } else {
        // User is signed out
        console.log(user);
        setUserData(null);
        // ...
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [userData, username]);

  useEffect(() => {
    collection(db, "posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  // useEffect(() => {
  // const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
  //   setPosts(
  //     snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       post: doc.data(),
  //     }))
  //   );
  // });
  // unsub();
  // }, []);

  const signUp = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error.message);
        // ..
      });
  };

  const signIn = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error.message);
        // ..
      });
  };

  // const [posts, setPosts] = useState([
  //     {
  //       username: 'ogelo',
  //       caption: 'Hi there! We are building React',
  //       imageUrl: 'images/react1.png'
  //       alt: 'ogelo'
  //     },
  //     {
  //       username: 'Austine',
  //       caption: 'Reporting live from this end',
  //       imageUrl: 'images/puppy.png',
  //       alt: 'austine'
  //     },
  //     {
  //       username: 'chike',
  //       caption: 'Yo! Whats up' ,
  //       imageUrl: 'images/react1.png'
  //       alt: 'chike'
  //     }
  //   ]);

  // useEffect(() => {
  //   // const q=query(collection(db,'todos'),orderBy('timestamp','desc'));
  //   onSnapshot(collection(db,'posts'),(snapshot)=>{
  //   setposts(snapshot.docs.map(doc=>({
  //   id: doc.id,
  //   post: doc.data()
  //   })))
  //   })
  //   },[]);

  //

  //   useEffect(() => {
  //     const colRef = collection(db, "posts")
  //     //real time update
  //     onSnapshot(colRef, (snapshot) => {
  //         snapshot.docs.forEach((doc) => {
  //             setTestData((prev) => [...prev, doc.data()])
  //             // console.log("onsnapshot", doc.data());
  //         })
  //     })
  // }, [])
  return (
    <div className="app">
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <form className="app__signup">
            <center>
              <img src="images/instagram1.jpg" alt="Instagram Logo" />
            </center>

            {/* <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Login
            </Button>
          </form>
        </Box>
      </Modal>

      <div className="app__header">
        <img
          src="images/instagram1.jpg"
          alt="Instagram Logo"
          className="app__headerImage"
        />
        {user ? (
          <Button onClick={() => signOut(auth)}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            imageUrl={post.imageUrl}
            alt={post.alt}
            caption={post.caption}
          />
        ))}
      </div>

      {user.displayName ? (
        <ImageUpload username={userData?.displayName} />
      ) : (
        <h3>Sorry you need to log in to upload</h3>
      )}
    </div>
  );
}

export default App;
