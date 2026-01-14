import { CreateAccount } from "../components/create-account"

export function Landing() {
    return (
        <>
            <div>
                <h2>Welcome to</h2>
                <h1>UCVTS Lost and Found</h1>
            </div>
            <div>
                <h2>New?</h2>
                <button>Create Account</button>
            </div>
            <div>
                <h2>Returning user?</h2>
                <button>Sign in</button>
            </div>
        </>
    )
}
