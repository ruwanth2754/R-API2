const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { slsubA, MoviePage,DownloadLink } = require('./slsub.js');
const {image} = require('./gis.js')
const {news,news2} = require('./news.js')
const {text} = require('./txt.js')
const app = express();



app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"))
hbs.registerPartials(path.join(__dirname, "views/temp"));



app.get("/", (req,res)=>{
  res.render('index')
});
app.get("/DOC", async(req,res)=>{
  res.render("doc");
})
app.get("/slsub", async (req, res) => {
  const seach = req.query.seach || "Gest";

  if (seach === "Gest") {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "not Data"
    });
  }

  try {
    const data = await slsubA(seach);
    res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": data
    });
  } catch (error) {
    res.status(500).json({
      "status": "false",
      "error": "Internal Server Error"
    });
  }
});
app.get("/slsubdl1", async (req, res) => {
  const seach = req.query.dl || "Gest";

  if (seach === "Gest") {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "not Data"
    });
  }

  if (!seach.startsWith("https://")) {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "link Error"
    });
  }

  try {
    const data = await MoviePage(seach);
    res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": data
    });
  } catch (error) {
    res.status(500).json({
      "status": "false",
      "error": "Internal Server Error"
    });
  }
});
app.get("/slsubdl2", async (req, res) => {
  const seach = req.query.dl || "Gest";

  if (seach === "Gest") {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "not Data"
    });
  }

  if (!seach.startsWith("https://")) {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "link Error"
    });
  }

  try {
    const data = await DownloadLink(seach);
    res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": data
    });
  } catch (error) {
    res.status(500).json({
      "status": "false",
      "error": "Internal Server Error"
    });
  }
});
app.get("/image", async(req,res)=>{
  const seach = req.query.seach || "Gest";

  if (seach === "Gest") {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "not Data"
    });
  }
  try {
    const data = await image(seach);
    res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": data
    });
  } catch (error) {
    res.status(500).json({
      "status": "false",
      "error": "Internal Server Error"
    });
  }
});
app.get("/news", async(req,res)=>{
  try{
    const data = await news();
    res.json({
      "status":"true",
      "createdBy":"Ruwantha-ofcali",
      "data": data
    })
  }catch(error){
    res.json({
      "status":"false",
      "createdBy":"Ruwantha-ofcali",
      "data": error
    })
  }
});
app.get("/txt", async(req,res)=>{
  const seach = req.query.txt || "Gest";

  if (seach === "Gest") {
    return res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "data": "not Data"
    });
  }
  try{
    const data = await text(seach);
    res.json({
      "status": "true",
      "createdBy": "Ruwantha-ofcali",
      "youText": seach,
      "data": data
    })
  }catch(error){
    return error;
  }
});
// Start Server
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log("🚀 Server is running on port " + port);
});