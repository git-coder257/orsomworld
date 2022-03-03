import React, { useState } from 'react';

function Signindisplay(props) {
    let [username, setusername] = useState("")
    let [password, setpassword] = useState("")

    const handleupdateusername = (val) => {
        setusername(val.target.value)
    }

    const handleupdatepassword = (val) => {
        setpassword(val.target.value)
    }
    
    return <div>
        <div>
            <input placeholder="username" className="input-display" autoFocus onChange={handleupdateusername}/><br/>
            <input placeholder="password" className="input-display" onChange={handleupdatepassword}/><br/>
            <div className="childcontainerforlogin">
                <button className="btn-primary" onClick={() => props.handlesignin(username, password)}>Confirm</button>
            </div>
        </div>
    </div>
}

export default Signindisplay;