import { getQueriedItems, getApprovedItems } from "../api"
import { useState, useEffect } from "react"
import { LostItemCard } from "../components/lostItemCard";

export function LostAndFound() {

    const URL = "http://localhost:8080"

    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            const response = await fetch(`${URL}/lost-items/search/${e.target.value}`);
            const data = await response.json();

            setItems(data);
        }
    }

    /*useEffect(() => {
        async function loadAllItems() {
            const defaultQuery = { query: "" };
            const itemData = await getQueriedItems(defaultQuery);
            itemData.sort((d1, d2) => new Date(d2.dateUploaded).getTime() - new Date(d1.dateUploaded).getTime());  //Orders items by posting date
            setItems(itemData)
        }
        loadAllItems()
    }, [])
    */

    return (
        <>
            <h1>Lost items catalog page</h1>
            <input type="text" placeholder="Search for an item..." value={searchTerm} onChange={handleSearch}/>
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