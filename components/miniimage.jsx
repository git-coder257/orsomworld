import React, { Component } from 'react';

class MiniImage extends Component {
    state = {
        image: this.props.image
    }

    render() { 
        let amountoflikes
        let amountofdislikes

        if (typeof this.state.image.amountoflikes === "undefined"){
            amountoflikes = 0
        } else {
            amountoflikes = this.state.image.amountoflikes
        }
        
        if (typeof this.state.image.amountofdislikes === "undefined"){
            amountofdislikes = 0
        } else {
            amountofdislikes = this.state.image.amountofdislikes
        }

        return <div>
            <img src={this.state.image.link} className="miniimagedisplay"/>
            <br/>
            <span>{"likes: " + amountoflikes}</span>
            <br/>
            <span>{" dislikes: " + amountofdislikes}</span>
        </div>;
    }
}
 
export default MiniImage;