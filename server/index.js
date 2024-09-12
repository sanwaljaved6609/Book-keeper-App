import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import routers from './routers/routers.js';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000',
//   method: ['GET','POST','PUT','DELETE'],
//   allowedHeader: ['Content-Type'],
// }))



// app.get('/', (req, res)=>{
//     console.log(req);
//     return res.status(200).send("Welcome")
// })

app.use('/book', routers);





mongoose
.connect(mongoDBURL)
.then(()=>{
  console.log("MongoDB is connceted")
  app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
  })
})
.catch((error)=>{
  console.log("MongoDB is not Connected:",error)
});
