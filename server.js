const mongoose = require("mongoose");
const express = require("express")
const app = express();
const fs = require("fs");
const bodyparser = require("body-parser");
const cors = require("cors");
const fileupload = require("express-fileupload")


// MIDDLEWARE
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded())
app.use(fileupload({useTempFiles : true}));
app.use(express.static(__dirname));
app.use(express.json())

app.listen("5000", (req, res) => {
    console.log("server is started on port 5000")
})

// password = FXDHPcgV7VrwydPS
mongoose.connect("mongodb+srv://mayank31m:FXDHPcgV7VrwydPS@cluster0.whfu1.mongodb.net/music?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database music'))


const dataroutes = require("./routes/data")
app.use("/data",dataroutes)

// app.get("/stream", (req, res) => {
//     const path = "./songs/Toosie Slid.mp3"
//     const stat = fs.statSync(path)
//     const filesize = stat.size
//     const range = req.headers.range;
//     if (range) {
//         const parts = range.replace(/bytes=/, "").split("-");
//         const start = parseInt(parts[0], 10);
//         const end = parts[1] ? parseInt(parts[1], 10) : filesize - 1;
//         const chunksize = (end - start) + 1;
//         const file = fs.createReadStream(path, { start, end });
//         const head = {
//             'Content-Range': `bytes ${start}-${end}/${filesize}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': chunksize,
//             'Content-Type': 'video/mp4'
//         }
//         res.writeHead(206, head);
//         file.pipe(res);
//     } else {
//         const head = {
//             'Content-Length': filesize,
//             'Content-Type': 'video/mp4'
//         }

//         res.writeHead(200, head);
//         fs.createReadStream(path).pipe(res);
//     }
// })


