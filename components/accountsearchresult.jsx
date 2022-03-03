import React, { Component } from 'react';

class Accountsearchresult extends Component {
    state = {
        account: this.props.account
    }

    render() { 
        return <div className="containerforaccountsearchresult">
            <div className="accountsearchdiv">
                <button className="btn-display" onClick={() => this.props.handleaccounttoaddtomessanger(this.state.account.username)}>{this.state.account.username}</button>
            </div>
        </div>
    }
}
 
export default Accountsearchresult;