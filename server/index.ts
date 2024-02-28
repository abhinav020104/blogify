const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
app.listen(4000 , ()=>{
    console.log("server listening at port 4000");
})