import React, { Component } from 'react';
import Avatar from './avatar';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import Avatars from './avatars.jsx';

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

class Avatardisplay extends Component {
    state = {
        avatararray: this.props.avatararray,
        indexoflogin: this.props.indexoflogin,
    }

    render() { 

        return <div>
                {this.state.avatararray.map(people => <Avatars key={people} handlegotoaccount={this.props.handlegotoaccount} accountsave={this.props.accountsave} avatararray={people} indexoflogin={this.state.indexoflogin}/>)}
            </div>
    }
}

export default Avatardisplay;