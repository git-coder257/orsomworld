import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import Immage from "./image.jsx"
import "./styles.css"
import Avatardisplay from "./avatardisplay.jsx";
import Avatar from "./avatar.jsx";
import Yourownaccountdisplay from "./yourownaccountdisplay.jsx";
import MiniImage from "./miniimage.jsx";
import MiniImages from "./miniimages.jsx"
import Peopleonmessage from "./peopleonmessage.jsx";
import Accountsearchresult from "./accountsearchresult.jsx";
import Messagesdisplay from "./messagesdisplay.jsx";
import Directmessageindividualdisplay from "./directmessageindividualdisplay.jsx";
import Logindisplay from "./logindisplay"
import Signindisplay from "./signindisplay"
import Maindisplay from "./maindisplay.js";

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

let accountsave
let postssave

// set(ref(db), {accounts: [{username: "orson", password: "1234", avatar: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"}, {username: "orson2", password: "2468", avatar: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png"}], posts: [{link: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png", amountofviews: 0, accountname: "orson2"}]})

get(child(ref(db), "posts")).then((snapshot) => {
    if (snapshot.exists()) {
        postssave = snapshot.val()
    } else { }
}).catch((error) => {
    console.error(error);
});

get(child(ref(db), "accounts")).then((snapshot) => {
    if (snapshot.exists()) {
        accountsave = snapshot.val()
    } else { }
}).catch((error) => {
    console.error(error);
});

class App extends Component {
    state = {
        accountsave: "",
        postssave: "",
        username: "",
        password: "",
        showlogin: true,
        logedin: false,
        indexoflogin: null,
        gotoaccount: false,
        accountnameofaccountgoingto: "",
        youraccount: false,
        changeofavatar: "",
        linkofnewpost: "",
        textfornewpost: "",
        gotodirectmessager: false,
        filteredaccounts: [],
        displaymessagersearch: false,
        listofpeopletomessageto: [],
        titleofmessagechat: "",
        indexofmessagetogoto: null,
        showgotomessage: false,
        login: false,
        sighnin: false,
        currentpost: [],
        indexofcurrentpost: 0,
        poststoshowtouser: []
    }

    Logindisplay = () => {
        if (this.state.showlogin) {
            return <div className="containerforlogin">
                <div>
                    <div className="childcontainerforlogin">
                        <button className="btn-display" onClick={this.handlegotologindisplay}>Login</button>
                    </div>
                    <div className="childcontainerforlogin">
                        <button className="btn-display" onClick={this.handlegotosignindisplay}>Create account</button>
                    </div>
                </div>
            </div>
        } if (!this.state.showlogin && this.state.login && !this.state.logedin) {
            return <div className="containerforlogin">
                <Logindisplay handlelogin={this.handlelogin} />
            </div>
        } if (!this.state.showlogin && this.state.sighnin && !this.state.logedin) {
            return <div className="containerforlogin">
                <Signindisplay handlesignin={this.handlesignin} />
            </div>
        }
    }

    handlegotologindisplay = () => {
        this.setState({ showlogin: false })
        this.setState({ login: true })
    }

    handlegotosignindisplay = () => {
        this.setState({ showlogin: false })
        this.setState({ sighnin: true })
    }

    Maindisplay = () => {
        if (!this.state.showlogin && this.state.logedin && !this.state.gotoaccount && !this.state.gotodirectmessager) {

            let array

            if (typeof this.state.accountsave[this.state.indexoflogin].peopleyoufollow === "undefined") {
                array = []
            } else {
                array = this.state.accountsave[this.state.indexoflogin].peopleyoufollow
            }

            // array = ["orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson", "orson"]

            let newarray = []

            if (array.length > 9) {
                let placeoferror
                for (let i = 0; i < array.length; i += 9) {
                    try {
                        let temparray = []
                        for (let j = 0; j < 9; j++) {
                            if (typeof array[i + j] !== "undefined") {
                                placeoferror = i
                                temparray.push(array[i + j])
                            } else {
                                placeoferror = i
                            }
                        }
                        newarray.push(temparray)
                    } catch {
                        let temparray = []
                        for (let j = 0; j < placeoferror; j++) {
                            temparray.push(array[i + j])
                        }
                        newarray.push(temparray)
                    }
                }
                array = newarray
                newarray = []
                for (let i = 0; i < 9; i++) {
                    let temp = []
                    for (let j = 0; j < array.length; j++) {
                        try {
                            if (typeof array[j][i] !== "undefined") {
                                temp.push(array[j][i])
                            }
                        } catch {
                            break
                        }
                    }
                    newarray.push(temp)
                }
                array = newarray
            }

            let indexesofpostsnotviewed = []
            let indexesofpostsviewed = []
            let listofpostsnotviewed = []
            let peopleyoufollow

            if (typeof this.state.accountsave[this.state.indexoflogin].peopleyoufollow !== "undefined"){
                peopleyoufollow = this.state.accountsave[this.state.indexoflogin].peopleyoufollow
                peopleyoufollow.push("orson")
            } else {
                peopleyoufollow = ["orson"]                
            }

            for (let i = 0; i < this.state.postssave.length; i++){
                if (typeof this.state.postssave[i].views !== "undefined"){
                    for (let j = 0; j < this.state.postssave[i].views.length; j++){
                        if (this.state.username !== this.state.postssave[i].views[j]){
                            listofpostsnotviewed.push(this.state.postssave[i])
                            indexesofpostsnotviewed.push(i)
                            break
                        } else {
                            indexesofpostsviewed.push(i)
                        }
                    }
                } else {
                    listofpostsnotviewed.push(this.state.postssave[i])
                    indexesofpostsnotviewed.push(i)
                }
            }

            let poststoshowtouser = listofpostsnotviewed

            for (let i = 0; i < indexesofpostsviewed.length; i++){
                poststoshowtouser.push(this.state.postssave[indexesofpostsviewed[i]])
            }

            if (this.state.poststoshowtouser.length === 0){
                this.setState({ poststoshowtouser: poststoshowtouser })
                this.setState({ currentpost: [poststoshowtouser[this.state.indexofcurrentpost]] })
            }

            return <div className="maincontainerforavatardisplay">
                {this.lessthan7avatars(array)}
                <div className="container">
                    <div>
                        {this.state.currentpost.map(post => <Immage key={post} index={this.state.indexofcurrentpost} text={post.text} accountsave={this.state.accountsave} postssave={this.state.postssave} indexoflogin={this.state.indexoflogin} post={this.state.currentpost} accountofviewer={this.state.username} link={post.link} amountofviews={post.amountofviews + 1} accountname={post.accountname} />)}
                        <div className="containerfornopostsleft">
                            {this.shownextbtndisplay()}
                        </div>
                    </div>
                </div>
                <div>
                    <Yourownaccountdisplay handlegotodirectmessager={this.handlegotodirectmessager} handlegotoaccount={this.handlegotoaccount} accountsave={this.state.accountsave} accountname={this.state.username} indexoflogin={this.state.indexoflogin} /><br />
                </div>
            </div>
            // return <Maindisplay accountsave={this.state.accountsave} postssave={this.state.postssave} indexoflogin={this.state.indexoflogin} handlegotoaccount={this.handlegotoaccount} username={this.state.username} handlegotodirectmessager={this.handlegotodirectmessager} />

        }
    }

    shownextbtndisplay = () => {
        if (this.state.currentpost.length !== 0){
            return <button onClick={this.handlegotonextpost} className="btn-dsiplay">Next</button>
        } else {
            return <h1>You have viewed all the posts</h1>
        }
    }

    handlegotonextpost = () => {
        if (this.state.poststoshowtouser.length !== this.state.indexofcurrentpost + 1){
            this.setState({ currentpost: [this.state.poststoshowtouser[this.state.indexofcurrentpost + 1]] })
            this.setState({ indexofcurrentpost: this.state.indexofcurrentpost + 1 })
        } else {
            this.setState({currentpost: []})
        }
    }

    handlegobackfromdirectmessager = () => {
        this.setState({ gotodirectmessager: false })
    }

    Directmessager = () => {
        if (this.state.gotodirectmessager && !this.state.showgotomessage) {
            return <div className="createmessagedisplay">
                <button onClick={this.handlegobackfromdirectmessager}>Back</button>
                {this.newmessagedisplay()}
                {this.searchaccountsdisplay()}
                {this.state.listofpeopletomessageto.map((person, index) => <Peopleonmessage key={person} username={this.state.username} index={index} handledeletepersonfromlist={this.handledeletepersonfromlist} persontoaddtomessage={person} />)}<br />
                {this.handleconfirmbtndisplay()}
                <Messagesdisplay handlegotodirectmessage={this.handlegotodirectmessage} accountsave={this.state.accountsave} indexoflogin={this.state.indexoflogin} />
            </div>
        }
    }

    handlechangetotitleofchatinput = (val) => {
        this.setState({ titleofmessagechat: val.target.value })
    }

    handleconfirmbtndisplay = () => {
        if (this.state.listofpeopletomessageto.length !== 0) {
            return <div className="containerforconfirmnewmessage">
                <button onClick={this.handleconfirmnewmessage} className="btn-display">Confirm</button>
            </div>
        }
    }

    handleconfirmnewmessage = () => {
        let jsonarray = this.state.accountsave
        let indexesofpeoplesendingto = []

        for (let i = 0; i < this.state.accountsave.length; i++) {
            for (let j = 0; j < this.state.listofpeopletomessageto.length; j++) {
                if (this.state.accountsave[i].username === this.state.listofpeopletomessageto[j]) {
                    indexesofpeoplesendingto.push(i)
                }
            }
        }

        for (let i = 0; i < this.state.listofpeopletomessageto.length; i++) {
            if (typeof jsonarray[indexesofpeoplesendingto[i]].messages !== "undefined") {
                jsonarray[indexesofpeoplesendingto[i]].messages.push({ title: this.state.titleofmessagechat, messages: [], peopleinmessagechat: this.state.listofpeopletomessageto, peoplewhohavereadmessages: [this.state.username] })
            } else {
                jsonarray[indexesofpeoplesendingto[i]].messages = [{ title: this.state.titleofmessagechat, messages: [], peopleinmessagechat: this.state.listofpeopletomessageto, peoplewhohavereadmessages: [this.state.username] }]
            }
        }

        this.setState({ accountsave: this.state.accountsave })
        set(ref(db), { accounts: jsonarray, posts: this.state.postssave })
    }

    handledeletepersonfromlist = (indexofperson) => {
        let array = this.state.listofpeopletomessageto
        array.splice(indexofperson, 1)
        this.setState({ listofpeopletomessageto: array })
    }

    newmessagedisplay = () => {
        if (!this.state.displaymessagersearch) {
            return <button className="newmessagedisplay" onClick={this.handlenewmessage}>New message</button>
        }
    }

    handlefilteraccounts = (val) => {
        let searchaccount = val.target.value
        let newFilter = this.state.accountsave.filter((value) => {
            if (searchaccount !== "") {
                return value.username !== this.state.username && value.username.toLowerCase().includes(searchaccount.toLowerCase())
            } else {
                return false
            }
        })
        this.setState({ filteredaccounts: newFilter })
    }

    searchaccountsdisplay = () => {
        if (this.state.displaymessagersearch && !this.state.showgotomessage) {
            return <div className="containerforsearchbar">
                <input placeholder="title of chat" onChange={this.handlechangetotitleofchatinput} className="input-display inputoftitleofchat" /><br />
                <input className="input-display" placeholder="account of receiver" onChange={this.handlefilteraccounts} /><br /><br />
                {this.state.filteredaccounts.map(account => <Accountsearchresult key={account} account={account} handleaccounttoaddtomessanger={this.handleaccounttoaddtomessanger} />)}
            </div>
        }
    }

    handleaccounttoaddtomessanger = (account) => {
        let accountinlist = false

        for (let i = 0; i < this.state.listofpeopletomessageto.length; i++) {
            if (account === this.state.listofpeopletomessageto[i]) {
                accountinlist = true
                break
            }
        }

        if (!accountinlist) {
            let array = this.state.listofpeopletomessageto
            array.push(account)
            this.setState({ listofpeopletomessageto: array })
        }
    }

    handlenewmessage = () => {
        this.setState({ listofpeopletomessageto: [this.state.username] })
        if (!this.state.displaymessagersearch) {
            this.setState({ displaymessagersearch: true })
        } if (this.state.displaymessagersearch) {
            this.setState({ displaymessagersearch: false })
        }
    }

    handlegotodirectmessager = () => {
        this.setState({ gotodirectmessager: true })
    }

    Accountview = () => {
        if (this.state.gotoaccount && !this.state.gotodirectmessager) {

            let amountofposts = 0
            let amountoffollowers
            let posts = []
            let indexofaccount

            for (let i = 0; i < this.state.postssave.length; i++) {
                if (this.state.postssave[i].accountname === this.state.accountnameofaccountgoingto) {
                    amountofposts++
                    posts.push(this.state.postssave[i])
                }
            }

            const lengthofposts = posts.length

            let newarray = []

            if (posts.length > 15) {
                let placeoferror
                for (let i = 0; i < posts.length; i += 15) {
                    try {
                        let temparray = []
                        for (let j = 0; j < 15; j++) {
                            if (typeof posts[i + j] !== "undefined") {
                                placeoferror = i
                                temparray.push(posts[i + j])
                            } else {
                                placeoferror = i
                            }
                        }
                        newarray.push(temparray)
                    } catch {
                        let temparray = []
                        for (let j = 0; j < placeoferror; j++) {
                            temparray.push(posts[i + j])
                        }
                        newarray.push(temparray)
                    }
                }
                posts = newarray
            }

            for (let i = 0; i < this.state.accountsave.length; i++) {
                if (this.state.accountsave[i].username === this.state.accountnameofaccountgoingto) {
                    indexofaccount = i
                }
            }

            if (typeof this.state.accountsave[indexofaccount].amountoffollows === "undefined") {
                amountoffollowers = 0
            } else {
                amountoffollowers = this.state.accountsave[indexofaccount].amountoffollows
            }

            return <div>
                <button className="btn-primary backbtndisplay" onClick={this.handlebackfromaccount}>Back</button>
                {/* <button><img src="data:image/jpeg;base64,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"/></button> */}
                <div className="accountviewcontainer">
                    <h1 className="accountnametitle">{this.state.accountnameofaccountgoingto}</h1>
                </div>
                <div className="accountviewcontainer">
                    <span>{"followers: " + amountoffollowers}</span>
                </div>
                <div className="accountviewcontainer">
                    <span>{"amount of posts: " + amountofposts}</span>
                </div>
                <br />
                <div className="containerforminiimage">
                    {this.handleshowminiimage(posts, lengthofposts)}
                </div>
                {this.displayforownaccount()}
            </div>
        }
    }

    displayforownaccount = () => {
        if (this.state.accountnameofaccountgoingto === this.state.username) {
            return <React.Fragment>
                <div className="accountviewcontainer">
                    <input onChange={this.handlechangeofavatar} placeholder="link of avatar" />
                </div>
                <div className="accountviewcontainer">
                    <button onClick={this.handleconfirmnewavatar}>Confirm</button>
                </div>
                <div className="accountviewcontainer">
                    <input onChange={this.handleonchangeoflink} placeholder="link of post" />
                </div>
                <div className="accountviewcontainer">
                    <input onChange={this.handleonchangeoftextforlink} placeholder="text for post" />
                </div>
                <div className="accountviewcontainer">
                    <button onClick={this.handleconfirmpost}>Confirm</button>
                </div>
            </React.Fragment>
        }
    }

    handleonchangeoflink = (val) => {
        this.setState({ linkofnewpost: val.target.value })
    }

    handleonchangeoftextforlink = (val) => {
        this.setState({ textfornewpost: val.target.value })
    }

    handleconfirmpost = () => {
        let jsonarray = { accounts: this.state.accountsave, posts: this.state.postssave }

        let newjsonarray = {
            accountname: this.state.username,
            link: this.state.linkofnewpost,
            text: this.state.textfornewpost,
            likes: [this.state.username],
            dislikes: [this.state.username]
        }

        jsonarray.posts.push(newjsonarray)

        this.setState({ postssave: jsonarray.posts })
        set(ref(db), jsonarray)
    }

    handlechangeofavatar = (val) => {
        this.setState({ changeofavatar: val.target.value })
    }

    handlebackfromaccount = () => {
        this.setState({ gotoaccount: false })
    }

    handleconfirmnewavatar = () => {
        let jsonarray = { accounts: this.state.accountsave, posts: this.state.postssave }

        const currentname = this.state.changeofavatar

        jsonarray.accounts[this.state.indexoflogin].avatar = currentname

        set(ref(db), jsonarray)
    }

    handleshowminiimage = (array, length) => {
        if (length > 15) {
            return <div>{array.map(post => <MiniImages key={post} miniposts={post} />)}</div>
        } if (length < 16) {
            return <div className="containerforminiimage">{array.map(post => <MiniImage key={post} image={post} />)}</div>
        }
    }

    handlegotoaccount = (accountname) => {
        this.setState({ gotoaccount: true })
        this.setState({ accountnameofaccountgoingto: accountname })
        if (accountname === this.state.username) {
            this.setState({ youraccount: true })
        }
    }

    lessthan7avatars = (array) => {
        if (typeof array[0] === "object") {
            return <Avatardisplay handlegotoaccount={this.handlegotoaccount} indexoflogin={this.state.indexoflogin} accountsave={this.state.accountsave} avatararray={array} />
        } if (typeof array[0] === "string") {
            return <div>{array.map(people => <Avatar key={people} handlegotoaccount={this.handlegotoaccount} accountsave={this.state.accountsave} indexoflogin={this.state.indexoflogin} avatarname={people} />)}</div>
        }
    }

    updatausernameandpassword = (username, password) => {
        this.setState({ username: username })
        this.setState({ password: password })
    }

    handlelogin = (username, password) => {
        if (username !== "" && password !== "") {
            this.setState({ accountsave: accountsave })
            this.setState({ postssave: postssave })
            this.setState({ showlogin: false })
            this.setState({ username: username })
            this.setState({ password: password })

            let jsonarray = accountsave

            for (let i = 0; i < jsonarray.length; i++) {
                if (username === jsonarray[i].username && password === jsonarray[i].password) {
                    this.setState({ logedin: true })
                    this.setState({ indexoflogin: i })
                    break
                }
            }
        }
    }

    handlesignin = (username, password) => {
        this.setState({ accountsave: accountsave })
        this.setState({ postssave: postssave })
        this.setState({ showlogin: false })
        this.setState({ username: username })
        this.setState({ password: password })

        let jsonarray = accountsave

        let indexoflogin

        if (jsonarray !== "therearenoaccounts") {
            jsonarray.push({ username: username, password: password, avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" })
            indexoflogin = jsonarray.length - 1
        } if (jsonarray === "therearenoaccounts") {
            jsonarray = [{ username: username, password: password, avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" }]
            indexoflogin = jsonarray.length - 1
        }

        this.setState({ logedin: true })
        this.setState({ indexoflogin: indexoflogin })

        set(ref(db), { accounts: jsonarray, posts: postssave })
        this.setState({ accountsave: jsonarray })
    }

    handlegotodirectmessage = (indexofmessage) => {
        this.setState({ indexofmessagetogoto: indexofmessage })
        this.setState({ showgotomessage: true })
    }

    Directmessageindividualdisplay = () => {
        if (this.state.showgotomessage) {
            return <Directmessageindividualdisplay handlegobacktomaindisplay={this.handlegobacktomaindisplay} indexofaccount={this.state.indexoflogin} handleaddmessage={this.handleaddmessage} accountsave={this.state.accountsave} indexofmessage={this.state.indexofmessagetogoto} />
        }
    }

    handlegobacktomaindisplay = () => {
        this.setState({ showgotomessage: false })
        this.setState({ indexofmessagetogoto: null })
    }

    handleaddmessage = (textformessage) => {

        let jsonarray = this.state.accountsave
        let indexesofpeoplesendingto = []
        let peopleinmessagechat = jsonarray[this.state.indexoflogin].messages[this.state.indexofmessagetogoto].peopleinmessagechat
        let indexesofmessagetogoto = []

        for (let i = 0; i < this.state.accountsave.length; i++) {
            for (let j = 0; j < peopleinmessagechat.length; j++) {
                if (this.state.accountsave[i].username === peopleinmessagechat[j]) {
                    indexesofpeoplesendingto.push(i)
                }
            }
        }

        for (let i = 0; i < indexesofpeoplesendingto.length; i++) {
            for (let j = 0; j < jsonarray[indexesofpeoplesendingto[i]].messages.length; j++) {
                if (JSON.stringify(jsonarray[this.state.indexoflogin].messages[this.state.indexofmessagetogoto]) === JSON.stringify(jsonarray[indexesofpeoplesendingto[i]].messages[j])) {
                    indexesofmessagetogoto.push(j)
                }
            }
        }

        for (let i = 0; i < peopleinmessagechat.length; i++) {
            if (typeof jsonarray[indexesofpeoplesendingto[i]].messages[indexesofmessagetogoto[i]].messages === "undefined") {
                jsonarray[indexesofpeoplesendingto[i]].messages[indexesofmessagetogoto[i]].messages = [{ text: textformessage, from: this.state.username }]
            } else {
                jsonarray[indexesofpeoplesendingto[i]].messages[indexesofmessagetogoto[i]].messages.push({ text: textformessage, from: this.state.username })
            }
        }

        this.setState({ accountsave: jsonarray })
        set(ref(db), { accounts: jsonarray, posts: this.state.postssave })
    }

    render() {
        return <div>
            {this.Logindisplay()}
            {this.Maindisplay()}
            {this.Accountview()}
            {this.Directmessager()}
            {this.Directmessageindividualdisplay()}
        </div>;
    }
}

export default App;