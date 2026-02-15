const express = require('express');
const app=express();
const PORT =8001;
const urlRoute = require('./routes/url');
const connectToMongoDB = require('./connect');

app.use(express.json());
app.use("/url",urlRoute);
connectToMongoDB('mongodb://localhost:27017/url-shortener').then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Failed to connect to MongoDB", err);
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})