
import { useState } from "react"

export default function UrlList(props) {
    const urlList = props.urlList
    const [copiedUrl, setCopiedUrl] = useState(null)

    const handleCopy = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl)
        setCopiedUrl(shortUrl)
        setTimeout(() => setCopiedUrl(null), 2000) // Reset after 2 seconds
    }

    return (
        <ul className="list grid grid-cols-1 gap-5">
            {urlList.map((element, index) => (
                <li className="list-item" key={index} id={index}>
                    <div className="links">
                        <a
                            href={element.url}
                            className="full-url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {element.url.slice(0, 100)}
                        </a>
                        <a
                            href={element.shortUrl}
                            className="short-url font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {element.shortUrl}
                        </a>
                    </div>
                    <button
                        type="button"
                        className={`btn-cta btn-copy ${
                            copiedUrl === element.shortUrl ? "bg-green-500 text-white" : ""
                        }`}
                        onClick={() => handleCopy(element.shortUrl)}
                    >
                        {copiedUrl === element.shortUrl ? "Copied!" : "Copy"}
                    </button>
                </li>
            ))}
        </ul>
    )
}
