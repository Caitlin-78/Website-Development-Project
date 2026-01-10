import { Navbar } from './Navbar'

export function Home() {
    return (
        <>
            <Navbar/>
            <div>
                <h1>UCVTS Lost and Found</h1>
                <p>oui oui bagel</p>
            </div>
            <div>
                <h2>Recently Lost</h2>
                <button>See all</button>
            </div>
            <div>
                <h2>Getting started?</h2>
                <p>[Youtube Video embed here]</p>
            </div>
        </>
    )
}
