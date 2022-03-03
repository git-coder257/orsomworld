import React, { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, } from "firebase/database";
import "./styles.css"
import Commentsdisplay from './commentsdisplay.js';

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

class Immage extends Component {
    state = {
        accountsave: this.props.accountsave,
        postssave: this.props.postssave,
        link: this.props.link,
        accountname: this.props.accountname,
        indexofaccount: null,
        commentsclicked: false,
    } 

    handlefollowaccount = () => {
        let jsonarray = {accounts: this.state.accountsave, posts: this.state.postssave}
        let indexofaccount
        let accountofviewerinlistoffollowers = false
        let indexofviewer

        for (let i = 0; i < jsonarray.accounts.length; i++){
            if (this.state.accountname === jsonarray.accounts[i].username){
                indexofaccount = i
                break
            }
        }

        if (typeof jsonarray.accounts[indexofaccount].followers === "undefined"){
            jsonarray.accounts[indexofaccount].followers = []
        }


        for (let i = 0; i < jsonarray.accounts[indexofaccount].followers.length; i++){
            if (this.props.accountofviewer === jsonarray.accounts[indexofaccount].followers[i]){
                accountofviewerinlistoffollowers = true
            }
        }
        
        if (!accountofviewerinlistoffollowers){
            if (typeof jsonarray.accounts[indexofaccount].amountoffollows === "undefined"){
                jsonarray.accounts[indexofaccount].amountoffollows = 1
                jsonarray.accounts[indexofaccount].followers = [this.props.accountofviewer]
                if (typeof jsonarray.accounts[this.props.indexoflogin].peopleyoufollow === "undefined"){
                    jsonarray.accounts[this.props.indexoflogin].peopleyoufollow = [this.props.accountname]
                } else {
                    jsonarray.accounts[this.props.indexoflogin].peopleyoufollow.push(this.props.accountname)
                }
            } else {
                jsonarray.accounts[indexofaccount].amountoffollows++
                jsonarray.accounts[indexofaccount].followers.push(this.props.accountofviewer)

                if (typeof jsonarray.accounts[this.props.indexoflogin].peopleyoufollow === "undefined"){
                    jsonarray.accounts[this.props.indexoflogin].peopleyoufollow = [this.props.accountname]
                } else {
                    jsonarray.accounts[this.props.indexoflogin].peopleyoufollow.push(this.props.accountname)
                }
            }
        }


        this.setState({accountsave: jsonarray.accounts})

        set(ref(db), jsonarray)
    }

    handlelikepost = () => {
        let jsonarray = {accounts: this.state.accountsave, posts: this.state.postssave}
        let accountofviewerinviews = false
        
        if (typeof jsonarray.posts[this.props.index].likes === "undefined"){
            jsonarray.posts[this.props.index].likes = [this.props.accountofviewer]
        } if (typeof jsonarray.posts[this.props.index].likes !== "undefined") {
            for (let i = 0; i < jsonarray.posts[this.props.index].likes.length; i++){
                if (jsonarray.posts[this.props.index].likes[i] === this.props.accountofviewer){
                    accountofviewerinviews = true
                    break
                }
            }
        }
        
        if (!accountofviewerinviews){
            jsonarray.posts[this.props.index].likes.push(this.props.accountofviewer)
        }

        if (typeof jsonarray.posts[this.props.index].amountoflikes === "undefined"){
            jsonarray.posts[this.props.index].amountoflikes = 1
        }if (typeof jsonarray.posts[this.props.index].amountoflikes !== "undefined" && !accountofviewerinviews) {
            jsonarray.posts[this.props.index].amountoflikes++
        }

        this.setState({postssave: jsonarray.posts})
        set(ref(db), jsonarray)
    }

    handledislikepost = () => {
        let jsonarray = {accounts: this.state.accountsave, posts: this.state.postssave}
        let accountofviewerinviews = false

        if (typeof jsonarray.posts[this.props.index].dislikes === "undefined"){
            jsonarray.posts[this.props.index].dislikes = [this.props.accountofviewer]
        } if (typeof jsonarray.posts[this.props.index].dislikes !== "undefined") {
            for (let i = 0; i < jsonarray.posts[this.props.index].dislikes.length; i++){
                if (jsonarray.posts[this.props.index].dislikes[i] === this.props.accountofviewer){
                    accountofviewerinviews = true
                    break
                }
            }
        }
        
        if (!accountofviewerinviews){
            jsonarray.posts[this.props.index].dislikes.push(this.props.accountofviewer)
        }

        if (typeof jsonarray.posts[this.props.index].amountofdislikes === "undefined"){
            jsonarray.posts[this.props.index].amountofdislikes = 1
        }if (typeof jsonarray.posts[this.props.index].amountofdislikes !== "undefined" && !accountofviewerinviews) {
            jsonarray.posts[this.props.index].amountofdislikes++
        }

        this.setState({postssave: jsonarray.posts})
        set(ref(db), jsonarray)
    }

    handlegotocomments = () => {
        if (!this.state.commentsclicked){
            this.setState({commentsclicked: true})
        } if (this.state.commentsclicked){
            this.setState({commentsclicked: false})
        }
    }

    showcomments = () => {
        if (this.state.commentsclicked){
            return <div>
                <Commentsdisplay indexofpost={this.props.index} account={this.state.accountsave} accountofviewer={this.props.accountofviewer} posts={this.state.postssave}/>
            </div>
        }
    }

    render () { 

        let likes
        let dislikes

        if (typeof this.state.postssave[this.props.index].amountoflikes === "undefined"){
            likes = 0
        } else {
            likes = this.state.postssave[this.props.index].amountoflikes
        }

        if (typeof this.state.postssave[this.props.index].amountofdislikes === "undefined"){
            dislikes = 0
        } else {
            dislikes = this.state.postssave[this.props.index].amountofdislikes
        }

        let accountofviewerinviews = false

        let jsonarray = {posts: this.state.postssave, accounts: this.state.accountsave}

        if (typeof jsonarray.posts[this.props.index].views !== "undefined"){
            for (let i = 0; i < jsonarray.posts[this.props.index].views.length; i++){
                if (jsonarray.posts[this.props.index].views[i] === this.props.accountofviewer){
                    accountofviewerinviews = true
                    break
                }
            }
            if (!accountofviewerinviews){
                jsonarray.posts[this.props.index].views.push(this.props.accountofviewer)
                jsonarray.posts[this.props.index].amountofviews++

                this.setState({postssave: jsonarray.posts})
                set(ref(db), jsonarray)
            }
        } else {
            jsonarray.posts[this.props.index].views = [this.props.accountofviewer]
            jsonarray.posts[this.props.index].amountofviews = 1
            
            this.setState({postssave: jsonarray.posts})
            set(ref(db), jsonarray)
        }

        let amountofviews = jsonarray.posts[this.props.index].amountofviews

        return <div>
            <img className="mainimg" src={this.props.link}/><br/>
            <div className="containerforimginfo">
                <span className="textforimagedisplay">{this.props.text}</span>
            </div>
            <div className="containerforimginfo">
                <span className="accountnameclass">{ this.props.accountname}</span>
                <button className="btndisplay" onClick={this.handlefollowaccount}>Follow</button>
                <button className="btndisplay" onClick={this.handlelikepost}>Like</button>
                <button className="btndisplay" onClick={this.handledislikepost}>Dislike</button>
                <button onClick={this.handlegotocomments} className="btndisplay">Comments</button>
            </div>
            <div className="commentsforimg">
                <span>{"likes: " + likes + " dislikes: " + dislikes + " views: " + amountofviews}</span>
            </div>
            <div className="commentsforimg">
                {this.showcomments()}
            </div>
        </div>
    }
}

export default Immage;