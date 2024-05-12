const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const ytGet = require('yt-get');

router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));

router.use(cors());
router.use(bodyParser.json());

router.post('/getLinksmp3', async (req, res) => {
    const { videoUrl } = req.body;
    try {
        const result = await ytGet.getVideoMP3Base64(videoUrl);
        const { base64, title } = result;
        console.log("Video Title:", title);
        res.json({ base64, title });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error downloading MP3.' });
    }
});

module.exports = router;
