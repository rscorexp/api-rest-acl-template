require('dotenv').config() 
import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import helmet from "helmet";

import './database/connect';
import routes from './routes';

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:3000",
  preflightContinue: false,
};

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors(options));
app.use(routes);

app.listen(3000, () =>{
  console.log("🔥 Server started at http://localhost:3000");
})