import { useState } from "react"

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);

    return (
        <div className="counter-container">
            <h4>Counter App</h4>
            <div className="counter-value">
                {count}
            </div>
            <div className="counter-actions">
                <button className="counter-increment-btn" onClick={increment}>
                    +
                </button>
                <button className="counter-decrement-btn" onClick={decrement}>
                    -
                </button>
            </div>
        </div>
    )
}

export default Counter;