import React, { useState } from 'react';
import Individualchats from './individualchats.jsx';

function Messagesdisplay(props) {
    let [accountsave, setaccountsave] = useState(props.accountsave)
    let messages = []


    if (typeof accountsave[props.indexoflogin].messages !== "undefined"){
        messages = accountsave[props.indexoflogin].messages
    }

    return (<div className="containerforreceivedmessages">
        {messages.map((message, index) => <Individualchats handlegotodirectmessage={props.handlegotodirectmessage} key={message} message={message} index={index}/>)}
    </div>);
}

export default Messagesdisplay;