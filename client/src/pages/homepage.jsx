// import { Navbar } from '../components/Navbar'
import { getApprovedItems } from "../api"
import { useState, useEffect } from "react"
import { LostItemCard } from "../components/lostItemCard";

export function Home() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadAllItems() {
            const itemData = await getApprovedItems();
            itemData.sort((d1, d2) => new Date(d2.dateUploaded).getTime() - new Date(d1.dateUploaded).getTime());  //Orders items by posting date
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
                <div className="homepageRecentlyLost">
                {items.map((item) => {
                        /*
                        let date = new Date(item.dateUploaded);
                        let stringDate = date.toString();
                        */
                        return (
                            <LostItemCard item={item}/>
                        )
                    })}
                </div>
                <button>See all</button>
            </div>
            <div>
                <h2>Getting started?</h2>
                <p>[Youtube Video embed here]</p>
            </div>
        </>
    )
}
