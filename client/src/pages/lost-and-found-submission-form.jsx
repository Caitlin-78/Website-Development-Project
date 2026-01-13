export function SubmitLostItem() {
    return (
        <>
            <head> <link href="filepond.css" rel="stylesheet" /></head>
            <h1>Lost Item Submission Page</h1>
            <form>
                <div>
                <label>Item Image</label>
                    <input type="file" name="itemImage" className="filepond" />
                </div>
                <button type="submit"></button>
            </form>
        </>
    )
}