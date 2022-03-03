import React, { useState } from 'react';

function Individualchats(props) {

    return <div>
        <button onClick={() => props.handlegotodirectmessage(props.index)} className="individualmessagedisplay">{props.message.title}</button>
    </div>;
}

export default Individualchats;