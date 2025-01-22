
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import multer from "multer"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
// DataBase Connection
import connection from "./DataBase/DbConnection.js";
connection();
// Env config
import dotenv from "dotenv"
dotenv.config();

//  middlewares
app.use(express.json());
app.use(express.static("public"))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"https://mern-ecommerce-frontend-peach.vercel.app",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials:true,
    
}))
// userRoutes
import categoryRouter from "./routes/categoryRoutes.js";
import userRoute from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/order/",orderRoutes)

// port
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);

})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null,  file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  // POST route to handle image upload
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ message:"Successfully uploaded image" });
  });


  const fileDownloadEndpoint = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName);
  
    try {
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).send('File not found.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('Internal server');
    }
  };

  app.get('/download/:filename', fileDownloadEndpoint);



