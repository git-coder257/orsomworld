import React, { useState } from 'react';
import Immage from './image';
import Yourownaccountdisplay from './yourownaccountdisplay';
import Avatar from './avatar';
import Avatardisplay from './avatardisplay';

function Maindisplay(props) {
    
    let [poststoshowtouser, setpoststoshowtouser] = useState([])
    let [currentpost, setcurrentpost] = useState([])
    let [indexofcurrentpost, setindexofcurrentpost] = useState(0)
    
    let array

    if (typeof props.accountsave[props.indexoflogin].peopleyoufollow === "undefined") {
        array = []
    } else {
        array = props.accountsave[props.indexoflogin].peopleyoufollow
    }

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

    if (typeof props.accountsave[props.indexoflogin].peopleyoufollow !== "undefined"){
        peopleyoufollow = props.accountsave[props.indexoflogin].peopleyoufollow
        peopleyoufollow.push("orson")
    } else {
        peopleyoufollow = ["orson"]                
    }

    for (let i = 0; i < props.postssave.length; i++){
        if (typeof props.postssave[i].views !== "undefined"){
            for (let j = 0; j < props.postssave[i].views.length; j++){
                if (props.username !== props.postssave[i].views[j]){
                    listofpostsnotviewed.push(props.postssave[i])
                    indexesofpostsnotviewed.push(i)
                    break
                } else {
                    indexesofpostsviewed.push(i)
                }
            }
        } else {
            listofpostsnotviewed.push(props.postssave[i])
            indexesofpostsnotviewed.push(i)
        }
    }

    let temppoststoshowtouser = listofpostsnotviewed



    for (let i = 0; i < indexesofpostsviewed.length; i++){
        temppoststoshowtouser.push(props.postssave[indexesofpostsviewed[i]])
    }

    if (poststoshowtouser.length === 0){
        setcurrentpost([temppoststoshowtouser[indexofcurrentpost]])
        setpoststoshowtouser(temppoststoshowtouser)
        console.log(temppoststoshowtouser)
    }

    const lessthan7avatars = (array) => {
        if (typeof array[0] === "object") {
            return <Avatardisplay handlegotoaccount={this.handlegotoaccount} indexoflogin={this.state.indexoflogin} accountsave={this.state.accountsave} avatararray={array} />
        } if (typeof array[0] === "string") {
            return <div>{array.map(people => <Avatar key={people} handlegotoaccount={this.handlegotoaccount} accountsave={this.state.accountsave} indexoflogin={this.state.indexoflogin} avatarname={people} />)}</div>
        }
    }

    const shownextbtndisplay = () => {
        if (currentpost.length !== 0){
            return <button onClick={handlegotonextpost} className="btn-dsiplay">Next</button>
        } else {
            return <h1>You have viewed all the posts</h1>
        }
    }

    const handlegotonextpost = () => {
        if (poststoshowtouser.length !== indexofcurrentpost + 1){
            setcurrentpost(poststoshowtouser[indexofcurrentpost + 1])
            setindexofcurrentpost(indexofcurrentpost + 1)
        } else {
            setcurrentpost([])
        }
    }

    return <div className="maincontainerforavatardisplay">
        {lessthan7avatars(array)}
        <div className="container">
            <div>
                {currentpost.map(post => <Immage key={post} index={indexofcurrentpost} text={post.text} accountsave={props.accountsave} postssave={props.postssave} indexoflogin={props.indexoflogin} post={props.currentpost} accountofviewer={props.username} link={post.link} amountofviews={post.amountofviews + 1} accountname={post.accountname} />)}
                <div className="containerfornopostsleft">
                    {shownextbtndisplay()}
                </div>
            </div>
        </div>
        <div>
            <Yourownaccountdisplay handlegotodirectmessager={props.handlegotodirectmessager} handlegotoaccount={props.handlegotoaccount} accountsave={props.accountsave} accountname={props.username} indexoflogin={props.indexoflogin} /><br />
        </div>
    </div>
}

export default Maindisplay;