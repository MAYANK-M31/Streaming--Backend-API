const express = require("express");
const router = express.Router();
const Data = require("../modal/musicmodal");
const ArtistData = require("../modal/artistsmodal")
const fs = require('fs');
const _ = require("underscore")



//to get all data
router.get('/', async (req, res) => {
    try {
        const data = await Data.find()
        res.send(data)
    } catch (err) {
        res.json({ message: err });
    }
})

// to get data by song name
router.get('/:songname', async (req, res) => {
    try {
        const regex = new RegExp(`^${req.params.songname}`, 'gi')
        const data = await Data.find({ $or: [{ title: regex }, { artist: regex }, { album: regex }] })
        res.send(data)
    } catch (err) {
        res.json({ message: err });
    }
})


router.get("/stream/:songname", (req, res) => {
    const path = `./songs/${req.params.songname}.mp3`
    const stat = fs.statSync(path)
    const filesize = stat.size
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : filesize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${filesize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': filesize,
            'Content-Type': 'video/mp4'
        }

        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
})


// // TO POST SONG DATA
// router.post('/uploadonydata', async (req, res) => {
//     try {
//         const data= new Data({
//             url: req.body.url,
//             title: req.body.title,
//             album: req.body.album,
//             artist: req.body.artist,
//             img: req.body.img
//         })
//         data.save()
//         .then(data=>res.json(data))

//     } catch (err) {
//         res.json({ message: err });
//     }
// })


// to upload song on server and file detail to mongodb
router.post("/upload", (req, res) => {

    try {
        const song = req.files.file
        if (song) {
            // console.log(song)
            const path = './songs/' + song.name
            const data = new Data({
                url: song.name.replace(".mp3", ""),
                title: req.body.title,
                album: req.body.album,
                artist: req.body.artist,
                img: req.body.img
            })

            data.save()
                .then(() => res.json({ message: "uploaded successfully", data: data }))

            song.mv(path, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("song uploaded successfully")
                    // res.json("successfully uploaded")
                }
            })
        } else {
            console.log("failed to upload")
        }

    } catch (err) {
        console.log({ message: err })
    }

})

// To send Artists Images 

router.get("/artist/search/:artistname",async (req, res) => {
    try {
        const regex = RegExp(`^${req.params.artistname}`, 'gi')
        const data =await ArtistData.find({artist:regex})
        res.send(data)
    } catch (err) {
        console.log({ message: err })
    }
})




module.exports = router;