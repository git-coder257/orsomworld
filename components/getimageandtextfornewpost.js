// import React, { useState } from 'react';
// import { initializeApp } from "firebase/app";
// // import { getDatabase, ref, set, child, get } from "firebase/database";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCfUCyXvYIaYm0iCg76LqqLJpetn5Erxzo",
//     authDomain: "instagram-clone-7498c.firebaseapp.com",
//     databaseURL: "https://instagram-clone-7498c-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "instagram-clone-7498c",
//     storageBucket: "instagram-clone-7498c.appspot.com",
//     messagingSenderId: "476485236110",
//     appId: "1:476485236110:web:b3b331dd1e2136e86720df",
//     measurementId: "G-9VKNKP21SS"
// };
  
// // const app = initializeApp(firebaseConfig);
// // const db = getDatabase(app);

// function Getimageandtextfornewpost(props) {
//     const [Image, setImage] = useState(null);
//     const [Text, setText] = useState("")

//     const getimage = () => {
//     }

//     return (
//       <div>
//         {Image && (
//           <div>
//           <img alt="not fount" width={"250px"} src={URL.createObjectURL(Image)} />
//           <br />
//           <button onClick={() => setImage(null)}>Remove</button>
//           <br/>
//           <button onClick={getimage}>get image</button>
//           </div>
//         )}
//         <br />
       
//         <br /> 
//         <input
//           type="file"
//           name="myImage"
//           onChange={(event) => {
//             console.log(event.target.files[0]);
//             setImage(event.target.files[0]);
//           }}
//         />
//       </div>)
// }

// export default Getimageandtextfornewpost;