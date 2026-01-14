import { getQueriedItems, getApprovedItems } from "../api"
import { useState, useEffect } from "react"
import { LostItemCard } from "../components/lostItemCard";

export function LostAndFound() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadAllItems() {
            const itemData = await getQueriedItems();
            itemData.sort((d1, d2) => new Date(d2.dateUploaded).getTime() - new Date(d1.dateUploaded).getTime());  //Orders items by posting date
            setItems(itemData)
        }
        loadAllItems()
    }, [])

    return (
        <>
            <h1>Lost items catalog page</h1>
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
        </>
    )
}