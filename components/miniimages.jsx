import React, { Component } from 'react';
import MiniImage from './miniimage.jsx';

class MiniImages extends Component {
    state = {

    }

    render() { 

        return <div className="containerforminiimage">
            {this.props.miniposts.map(post => <MiniImage key={post} image={post}/>)}
        </div>;
    }
}
 
export default MiniImages;