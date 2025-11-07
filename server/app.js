import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { compileFunction } from "vm";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(express.json());

const buildPath = path.join(__dirname, "dist");
if (fs.existsSync(buildPath)){
app.use(express.static(buildPath));
app.get(/^\/(?!api).*/,(req, res)=>{
    res.sendFile(path.join(buildPath, "index.html"));
})
}

app.get("/api/test", (req, res)=>{
res.json({ message: "Hello from /api/test!"});
})

// error handler
app.use((req, res)=>{
    res.status(404).send("404 - Not Found");
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("500 - Internal Server Error");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});