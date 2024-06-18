const port = 4000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
const dbURI = "mongodb+srv://eshaghosal2000:Tgpl%402024@cluster0.gpjwfot.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error: ' + err));

// API creation
app.get('/', (req, res) => {
  res.send('Express app is running');
});


const storage= multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upld endpoint images
app.post("/upload",upload.single('product',(req,res)=>{
    res.json({
        success:1 ,
        
    })
}))

app.listen(port, (error) => {
  if (!error) {
    console.log('Server running on port ' + port);
  } else {
    console.log("Error: " + error);
  }
});
