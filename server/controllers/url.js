const Url = require('../models/Url')
const validateUrl = require('../utils/validateUrl')
const generateUniqueId = require('../utils/generateUniqueId')

async function createShortUrl(req, res) {
    const { url } = req.body
    // Use BASE_URL env variable, fallback to localhost for dev
    const clientUrl = process.env.BASE_URL 
    console.log('BASE_URL:', clientUrl)

    if (!validateUrl(url)) {
        return res.status(400).json({ message: 'Invalid URL' })
    }

    try {
        // Check if URL already exists in DB
        const urlDoc = await Url.findOne({ url })
        if (urlDoc) {
            const shortUrl = `${clientUrl}/${urlDoc.shortUrlId}`
            return res.status(200).json({ shortUrl, clicks: urlDoc.clicks })
        }

        // Generate unique short ID
        const shortUrlId = await generateUniqueId()

        const newUrlDoc = new Url({
            url,
            shortUrlId,
            date: new Date()
        })
        await newUrlDoc.save()

        const shortUrl = `${clientUrl}/${shortUrlId}`
        res.status(200).json({ shortUrl, clicks: 0 })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

async function redirectToOriginalUrl(req, res) {
    const { shortUrlId } = req.params

    try {
        const urlDoc = await Url.findOne({ shortUrlId })

        if (!urlDoc) {
            return res.status(404).json({ message: 'No URL found' })
        }

        // Increment click count
        await Url.findByIdAndUpdate(urlDoc._id, { $inc: { clicks: 1 } })

        // Redirect to original URL
        return res.redirect(urlDoc.url)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

async function deleteUrl(req, res) {
    const { url } = req.body
    try {
        const deletedUrl = await Url.deleteOne({ url })
        if (deletedUrl.deletedCount === 0) {
            return res.status(400).json({ message: 'No such URL found' })
        }
        res.status(200).json({ message: `URL ${url} deleted` })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

module.exports = {
    createShortUrl,
    redirectToOriginalUrl,
    deleteUrl
}
