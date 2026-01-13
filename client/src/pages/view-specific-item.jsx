import { getSpecificItem } from "../api"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export function ViewItem() {

    const [item, setItem] = useState({});

    let params = useParams();
    let id = params.id;

    useEffect(() => {
        async function loadItem() {
            let data = await getSpecificItem(id);
            let date = new Date(data.dateUploaded);
            data.dateUploaded = date.toString();
            setItem(data);
        }
        loadItem();
    }, [])



    return (
        <>
            <h1>{item.name}</h1>
            <div id="dateUploadedBox">
                <h3>Date Uploaded:</h3>
                <p>{item.dateUploaded?.substring(4,15)}</p>
            </div>
            <div id="descriptionBox">
                <h3>Description:</h3>
                <p>{item.description}</p>
            </div>
            <div id="itemTypeBox">
                <h3>Item Type:</h3>
                <p>{item.itemType}</p>
            </div>
            <div id="itemColorBox">
                <h3>Color:</h3>
                <p>{item.color}</p>
            </div>
            <div id="foundAtBox">
                <h3>Found At:</h3>
                <p>{item.schoolFoundIn}</p>
            </div>
            <div id="postedByBox">
                <h3>Found by:</h3>
                <p>{item.postedBy}</p>
            </div>
            <button>Claim this Item</button>
            <button>Request More Info</button>
        </>
    )
}