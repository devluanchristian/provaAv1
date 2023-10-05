import express from 'express'
import { appRoutes } from './routes.js'

export const app = express()

app.use(express.json())
app.use(appRoutes)
