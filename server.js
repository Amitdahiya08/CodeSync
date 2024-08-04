// Server Code (server.js)
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path=require("path");
const app = express();
const port = 3000;

app.get("/run-code",(req,res)=>{
    console.log("code is running");
});
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
