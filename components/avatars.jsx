import React, { Component } from 'react';
import Avatar from './avatar';
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

get(child(ref(db), "accounts")).then((snapshot) => {
    if (snapshot.exists()) {
        accountsave = snapshot.val()
    } else {}
}).catch((error) => {
        console.error(error);
});

class Avatars extends Component {
    state = {
        avatararray: this.props.avatararray,
        indexoflogin: this.props.indexoflogin
    }

    classnameforavatardiv = () => {
        if (this.state.avatararray.length > 1){
            return "maincontainerforavatardisplay"
        } if (this.state.avatararray.length === 1){
            return "maincontainerforsingleavatardisplay"
        }
    }

    render() { 
        return <div className="maincontainerforavatardisplay">
                {this.state.avatararray.map(people => <div key={people}><Avatar handlegotoaccount={this.props.handlegotoaccount} accountsave={this.props.accountsave} indexoflogin={this.state.indexoflogin} avatarname={people}/></div>)}
            </div>
    }
}

export default Avatars;