const {nanoid} = require('nanoid');
const URL = require('../models/url.js');


const generateNewShortUrl = async(req, res) => {
    const body = req.body;

    if(!body.url){
        return res.status(400).json({message : "url required"});
    }
    const shortID = nanoid(8);

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : []
    })

    return res.render('home', {
        id: shortID,
    })
    // return res.json({id : shortID});
}


const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    if(!result){
        return res.status(404).json({message : "Short URL not found"})
    }

    return res.json({
        totalClicks : result.visitHistory.length, 
        analytics : result.visitHistory
    });

}

module.exports = {
    generateNewShortUrl,
    handleGetAnalytics
}
