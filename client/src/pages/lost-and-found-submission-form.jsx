import { useState, useEffect } from "react";
import { createNewItem } from "../api";
import { Input } from "@/components/ui/input"
import { jwtDecode } from "jwt-decode";
//import ReactDOM from 'react-dom'

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export function SubmitLostItem() {
    /*
    function handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }
    */
    const [user, setUser] = useState({});

    const [image, setImage] = useState("");
    const [lostItemName, setName] = useState("");
    const [description, setDescription] = useState("");
    const [schoolFound, setSchoolFound] = useState("");
    const [schoolIn, setSchoolIn] = useState("");
    const [type, setItemType] = useState("");
    const [itemColor, setColor] = useState("");
    const [itemBrand, setBrand] = useState("");

    useEffect(() => {
        async function loadUserData() {
            const token = sessionStorage.getItem("User");
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);

        }
        loadUserData();
    }, [])

    async function handleSubmit() {
        let submitObject = {
            itemName: lostItemName,
            description: description,
            imgFileName: "",
            dateUploaded: new Date(),
            itemType: type,
            color: itemColor,
            brand: itemBrand,
            schoolFoundIn: schoolFound,
            currentLocation: schoolIn, 
            postedBy: user._id, //null --> temp value
            claimedBy: null,
            adminApproved: false
        }

        await createNewItem(submitObject)
    }

    return (
        <>
            {/* <head> <link href="filepond.css" rel="stylesheet" /></head> */}
            <h1 className = "barofcolor">Lost Item Submission Page</h1>
            <form onSubmit={handleSubmit}>
                <h2>Details</h2>
                <div>
                    <label>Item Image</label>
                    <Input type="file" onChange={(e) => setImage(e.target.value)} name="itemImage" className="filepond" />
                </div>
                <div>
                    <label>Item Name: </label>
                    <Input name="itemName" onChange={(e) => setName(e.target.value)} maxLength={50} required/>
                </div>
                <div>
                    <label>Description: </label>
                    <textarea name="description" onChange={(e) => setDescription(e.target.value)} maxLength={250} required/>
                </div>
                <div>
                    <label>Building Item was Found In: </label>
                    <Input name="schoolFoundIn" onChange={(e) => setSchoolIn(e.target.value)} required/>
                </div>
                <div>
                    <label>Current Building Item is In: </label>
                    <Input name="currentLocation" onChange={(e) => setSchoolFound(e.target.value)} required/>
                </div>
                <h2>Tags</h2>
                <div>
                    <label>Item Type: </label>
                    <Input name="itemType" onChange={(e) => setItemType(e.target.value)} />
                    <label>Color: </label>
                    <Input name="color" onChange={(e) => setColor(e.target.value)} />
                    <label>Brand: </label>
                    <Input name="brand" onChange={(e) => setBrand(e.target.value)} maxLength={25}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}