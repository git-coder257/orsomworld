import React, { Component } from 'react';

class Peopleonmessage extends Component {
    state = {
        person: this.props.persontoaddtomessage,
        username: this.props.username
    }

    render() { 
        if (this.state.username !== this.state.person){
            return <div className="containerforpeopleonmessage">
                <button className="persontoaddtomessagedisplay">{this.state.person}</button>
                <button onClick={() => this.props.handledeletepersonfromlist(this.props.index)} className="persontoaddtomessagedisplay btndisplayforpersontoaddtomessagedisplay">X</button>
            </div>;
        } else {
            return <React.Fragment></React.Fragment>
        }
    }
}
 
export default Peopleonmessage;