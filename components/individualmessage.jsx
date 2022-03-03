import React, { Component } from 'react';

class Individualmessage extends Component {
    state = {

    }

    render() { 

        let classforcomments

        if(this.props.index % 2 !== 0) {
            classforcomments = "containerformessagesright"
        } else {
            classforcomments = "containerformessagesleft"
        }

        return <div className={classforcomments}>
            <div className="containerforindividualmessage">
                <span>{this.props.message.text}</span><br/>
                <span className="displayforpersonfromofmessage">{this.props.message.from}</span>
            </div>
        </div>
    }
}
 
export default Individualmessage;