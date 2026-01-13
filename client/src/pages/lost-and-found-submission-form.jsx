export function SubmitLostItem() {
    return (
        <>
            <head> <link href="filepond.css" rel="stylesheet" /></head>
            <h1>Lost Item Submission Page</h1>
            <div>
            <label>Item Image</label>
                <input type="file" name="itemImage" class="filepond" />
            </div>
        </>
    )
}