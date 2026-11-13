import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) //extended: true means that it can parse nested objects
app.use(express.static('public')) //to serve static files from the public folder, which would get saved in server if image aur anything get uploaded.. "public" is folder name where it will get saved
app.use(cookieparser())

export {app}