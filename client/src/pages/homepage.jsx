// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from "../api"
import { useState, useEffect } from "react"

export function Home() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadAllItems() {
            const itemData = await getApprovedItems();
            setItems(itemData)
        }
        loadAllItems()
    }, [])

    return (
        <>
            <div>
                <h1>UCVTS Lost and Found</h1>
                <p>oui oui bagel</p>
            </div>
            <div>
                <h2>Recently Lost</h2>
                {items.map((item) => {
                    return (
                        <div>
                            <h3>{item.name}</h3>
                            <p><b>Date Found: </b>{item.dateUploaded}</p>
                            <p><b>Location Found: </b>{item.schoolFoundIn}</p>
                            <p><b>Found By: </b>{item.postedBy}</p>
                        </div>
                    )
                })}
                <button>See all</button>
            </div>
            <div>
                <h2>Getting started?</h2>
                <p>[Youtube Video embed here]</p>
            </div>
        </>
    )
}
