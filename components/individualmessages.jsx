import React, { useState } from 'react';
import Individualmessage from './individualmessage.jsx';

function Individualmessages(props) {

    

    if (props.messages.length === 0){
        return <div>
            <h1>There are no messages</h1>
        </div>;
    } else {
        return <div>{props.messages.map((message, index) => <Individualmessage key={message} message={message} index={index}/>)}</div>
    }
}

export default Individualmessages;