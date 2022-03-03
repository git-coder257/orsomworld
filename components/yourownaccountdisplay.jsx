import React, { Component } from 'react';
import "./styles.css"

class Yourownaccountdisplay extends Component {
    state = {
        accountname: this.props.accountname,
        indexofaccount: this.props.indexofaccount,
        accountsave: this.props.accountsave,
    }

    render() {
        let imglinkofavatar

        for (let i = 0; i < this.state.accountsave.length; i++){
            if (this.state.accountsave[i].username === this.state.accountname){
                imglinkofavatar = this.state.accountsave[i].avatar
                break
            }
        }

        return <div className="containerforyourownaccountdisplay">
            <img className="avatarimgdisplay" src={imglinkofavatar}/>
            <br/>
            <div className="secondedcontainerforyourownaccountdisplay">
                <span>{this.state.accountname}</span>
            </div>
            <div className="secondedcontainerforyourownaccountdisplay">
                <button className="btn-display" onClick={() => this.props.handlegotoaccount(this.state.accountname)}>goto account</button>
            </div>
            <div className="secondedcontainerforyourownaccountdisplay">
                <button className="btn-display" onClick={this.props.handlegotodirectmessager}>Direct Message</button>
            </div>
        </div>;
    }
}

export default Yourownaccountdisplay;