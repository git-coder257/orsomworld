import React, { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

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

let accountsave = []


class Avatar extends Component {
    state = {
        avatarname: this.props.avatarname,
        accountsave: this.props.accountsave,
    }

    render() { 
        let imglinkofavatar

        for (let i = 0; i < this.state.accountsave.length; i++){
            if (this.state.accountsave[i].username === this.props.avatarname){
                imglinkofavatar = this.state.accountsave[i].avatar
                break
            }
        }

        return <div className="maincontainerforavatar">
                    <img className="avatarimgdisplay" src={imglinkofavatar}/><br/>
                    <div className="containerforavatar">
                        <span className="avatarnamedisplay" onClick={() => this.props.handlegotoaccount(this.state.avatarname)}>{this.props.avatarname}</span>
                    </div>
                </div>
    }
}

export default Avatar;