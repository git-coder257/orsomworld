// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import Individualmessage from "./individualmessages.jsx";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, update } from "firebase/database";

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

class Directmessageindividualdisplay extends Component {
    state = {
        accountsave: this.props.accountsave,
        textformessage: "",
    }

    handleupdatatextformessage = (val) => {
        this.setState({textformessage: val.target.value})
        // settextformessage(val.target.value)
    }

    updateacccounts = () => {
        get(child(ref(db), "accounts")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
            } else {}
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        
        let locationofmessages = this.state.accountsave[this.props.indexofaccount].messages[this.props.indexofmessage]

        let listofpeopleinchat = locationofmessages.peopleinmessagechat
        let peoplewhohavereadmessages = locationofmessages.peoplewhohavereadmessages
        let messages

        if (typeof locationofmessages.messages  === "undefined"){
            messages = []
        } else {
            messages = locationofmessages.messages
        }

        return <div>
            <div>
                <button onClick={this.props.handlegobacktomaindisplay}>Back</button>
            </div>
            <div className="maincontainerforchatinfo">
                <div className="parentcontainerforpeopleinchat">
                    <span className="displayfortitleofpeopleinchat">people in chat</span>
                    {listofpeopleinchat.map(people => <div key={people} className="containerforpeopleinchat"><span>{people}</span></div>)}
                </div>
                <div className="parentcontainerforpeopleinwhohavereadmessages">
                    <span className="displayfortitleofpeopleinwhohavereadmessages">people in who have read messages</span>
                    {peoplewhohavereadmessages.map(people => <div key={people} className="containerforpeopleinwhohavereadmessages"><span>{people}</span></div>)}
                </div>
            </div>
            <br/>
            <div>
                <div>
                    <Individualmessage messages={messages}/>
                </div>
            </div>
            <div className="containerforaddmessage">
                <input className="input-display" onChange={this.handleupdatatextformessage} placeholder="text for message"/>
            </div>
            <div className="containerforaddmessage">
                <button className="btn-display addmessagebtndisplay" onClick={() => this.props.handleaddmessage(this.state.textformessage)}>Add message</button>
            </div>
        {/* {this.updateaccounts()} */}
        </div>;
    }
}

export default Directmessageindividualdisplay;

// function Directmessageindividualdisplay(props) {
//     let [accountsave, setaccountsave] = useState(props.accountsave)
//     let [textformessage, settextformessage] = useState("")
//     let [_, reloadscreen] = useState(0)
    
//     let locationofmessages = accountsave[props.indexofaccount].messages[props.indexofmessage]

//     let listofpeopleinchat = locationofmessages.peopleinmessagechat
//     let peoplewhohavereadmessages = locationofmessages.peoplewhohavereadmessages
//     let messages

//     if (typeof locationofmessages.messages  === "undefined"){
//         messages = []
//     } else {
//         messages = locationofmessages.messages
//     }

//     const handleupdatatextformessage = (val) => {
//         settextformessage(val.target.value)
//     }

//     get(child(ref(db), "accounts")).then((snapshot) => {
//         if (snapshot.exists()) {
//             console.log(snapshot.val())
//         } else {}
//     }).catch((error) => {
//         console.error(error);
//     })

//     // reloadscreen()

//     const updateaccounts = () => {
//         get(child(ref(db), "accounts")).then((snapshot) => {
//             if (snapshot.exists()) {
//                 if (snapshot.val() !== accountsave){
//                     setaccountsave(snapshot.val())
//                 }
//                 console.log(snapshot.val())
//             } else {}
//         }).catch((error) => {
//             console.error(error);
//         })
//     }

//     useEffect (setTimeout(() => {
//         updateaccounts()
//     }, 2000))

//     return <div>
//         <div>
//             <button onClick={props.handlegobacktomaindisplay}>Back</button>
//         </div>
//         <div className="maincontainerforchatinfo">
//             <div className="parentcontainerforpeopleinchat">
//                 <span className="displayfortitleofpeopleinchat">people in chat</span>
//                 {listofpeopleinchat.map(people => <div key={people} className="containerforpeopleinchat"><span>{people}</span></div>)}
//             </div>
//             <div className="parentcontainerforpeopleinwhohavereadmessages">
//                 <span className="displayfortitleofpeopleinwhohavereadmessages">people in who have read messages</span>
//                 {peoplewhohavereadmessages.map(people => <div key={people} className="containerforpeopleinwhohavereadmessages"><span>{people}</span></div>)}
//             </div>
//         </div>
//         <br/>
//         <div>
//             <div>
//                 <Individualmessage messages={messages}/>
//             </div>
//         </div>
//         <div className="containerforaddmessage">
//             <input className="input-display" onChange={handleupdatatextformessage} placeholder="text for message"/>
//         </div>
//         <div className="containerforaddmessage">
//             <button className="btn-display addmessagebtndisplay" onClick={() => props.handleaddmessage(textformessage)}>Add message</button>
//         </div>
//         {/* {updateaccounts()} */}
//     </div>;
// }

// export default Directmessageindividualdisplay;