export function CreateAccount() {
    return (
        <>
            <h1>Create Account</h1>
            <form action="/create-account" method="POST">
                <div>   
                    <label>Email Address: </label>
                    <input type="text" name="emailAddress"></input>
                </div>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="emailAddress"></input>
                </div>
                <div>   
                    <label>Last Name: </label>
                    <input type="text" name="emailAddress"></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" name="password"></input>      
                </div>
                <div>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </>
    )
}
