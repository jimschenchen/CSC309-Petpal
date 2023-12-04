const EmailField = ({email, setEmail}) => {
    return (
        <div className="my-1 flex flex-col">
            <label className="text-sm mb-1" >You email</label>
            <input type="text" className="px-1 py-1 rounded-sm
            focus:ring-primary focus:outline-none focus:ring-1"
            onChange={(event) => setEmail(event.target.value)} value={email}/>
        </div>
    );
}

const PasswordField = ({password, setPassword}) => {
    return (
        <div className="my-1 flex flex-col">
            <label className="text-sm mb-1 px-1 py-1">Password</label>
            <input type="password" className="px-1 py-1 rounded-sm
            focus:ring-primary focus:outline-none focus:ring-1" value={password}
            onChange={(event) => {setPassword(event.target.value)}}/>
        </div>
    );
}

const ErrorDisplay = ({error}) => (
    <div id="error" className="text-xs text-red-700 my-1">
        {error}
    </div>
);

export {EmailField, PasswordField, ErrorDisplay}