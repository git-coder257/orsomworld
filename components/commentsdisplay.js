// import React, { Component } from 'react';
import React, { useState , useEffect } from "react"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import Comment from './comment.jsx';

const firebaseConfig = {
    apiKey: "AIzaSyCfUCyXvYIaYm0iCg76LqqLJpetn5Erxzo",
    authDomain: "instagram-clone-7498c.firebaseapp.com",
    databaseURL: "https://instagram-clone-7498c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "instagram-clone-7498c",
    storageBucket: "instagram-clone-7498c.appspot.com",
    messagingSenderId: "476485236110",
    appId: "1:476485236110:web:b3b331dd1e2136e86720df",
    measurementId: "G-9VKNKP21SS"
};
  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Commentsdisplay(props) {

    let [commentsinput, setcommentsinput] = useState("")
    let [postssave, setpostssave] = useState(props.posts)
    let [accountsave, setaccountsave] = useState(props.account)
    let [indexofpost, setindexofpost] = useState(props.indexofpost)

    const maincommentsdisplay = () => {
        let isnocomments = false

        if (typeof postssave[indexofpost].comments === "undefined"){
            isnocomments = true
        }

        if (!isnocomments){
            return <div>
                {postssave[indexofpost].comments.map((comment, index) => <Comment key={comment} index={index} comment={comment}/>)}
                <div className="maincontainerforcomments">
                    <input className="input-display" onChange={handleonchangetocommentsinput} placeholder="enter comment"/>
                </div>
                <div className="maincontainerforcomments">
                    <button className="btndisplay" onClick={handleconfirmconfirm}>Confirm</button>
                </div>
            </div>
        } if (isnocomments){
            return <div>
                <div className="maincontainerforcomments">
                    <h1 className="nocommentsdisplay">There are no comments</h1>
                </div>
                <div className="maincontainerforcomments">
                    <input onChange={handleonchangetocommentsinput} placeholder="enter comment"/>
                    <button onClick={handleconfirmconfirm}>Confirm</button>
                </div>
            </div>
        }
    }

    const handleonchangetocommentsinput = (val) => {
        setcommentsinput(val.target.value)
    }

    const handleconfirmconfirm = () => {
        if (typeof postssave[indexofpost].comments === "undefined"){
            let jsonarray = {accounts: accountsave, posts: postssave}

            jsonarray.posts[indexofpost].comments = [{text: commentsinput, accountname: props.accountofviewer}]

            setpostssave(jsonarray.posts)
            set(ref(db), jsonarray)
        } else {
            let jsonarray = {accounts: accountsave, posts: postssave}

            jsonarray.posts[indexofpost].comments.push({text: commentsinput, accountname: props.accountofviewer})

            setpostssave(jsonarray.posts)
            set(ref(db), jsonarray)        
        }
    }

    return (<div>
        <div className="maincontainerforcomments">
            <h1 className="displayforcommentstitle">Comments</h1>
        </div>
        {maincommentsdisplay()}
    </div>);
}
 
export default Commentsdisplay;