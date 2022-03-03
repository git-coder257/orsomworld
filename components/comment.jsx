import React, { Component } from 'react';

class Comment extends Component {
    state = {
        comment: this.props.comment
    }

    render() {

        let classforcomments

        if(this.props.index % 2 !== 0) {
            classforcomments = "containerforcommentsright"
        } else {
            classforcomments = "containerforcommentsleft"
        }

        return <div className={classforcomments}>
            <div className="containerforcomments">
                <h1 className="displayforcommenttext">{this.state.comment.text}</h1>
                <br/>
                <span className="displayforcommentaccountname">{this.state.comment.accountname}</span>
            </div>
        </div>
    }
}
 
export default Comment;