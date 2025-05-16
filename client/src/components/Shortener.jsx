import { useState } from "react"
import PulseLoader from "react-spinners/PulseLoader";

export default function Shortener(props) {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    async function handleClick() {
        if (input.trim() === '') return;

        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: input })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message || "Something went wrong")
                setInput("")
                return
            }

            props.addLink({
                url: input,
                shortUrl: data.shortUrl
            })

            setInput("")
        } catch (err) {
            alert("Server Error. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const override = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    return (
        <div className="shortener rounded-lg">
            <form>
                <div className="input-area">
                    <input
                        type="url"
                        placeholder="Shorten a link here..."
                        onChange={handleInputChange}
                        value={input}
                    />
                    <p className="warning">Please add a link</p>
                </div>
                <button
                    className="btn-cta"
                    type="button"
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? (
                        <PulseLoader
                            color="white"
                            cssOverride={override}
                            size={11}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        'Shorten it!'
                    )}
                </button>
            </form>
        </div>
    )
}
