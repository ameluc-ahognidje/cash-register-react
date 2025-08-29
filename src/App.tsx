export default function App()
{
    return (<>
        <div className="frame">
            <h2>Welcome to my store</h2>
        </div>

        <div className="frame">
            <label htmlFor="cash">Please enter cash</label>
            <input id="cash" type="number" min="0"/>
        </div>

        <div className="frame">
            <button id="purchase-btn">Purchase</button>
        </div>

        <div className="frame" id="change-due">
        </div>
    </>)
}
