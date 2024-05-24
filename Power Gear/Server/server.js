const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const userRoutes=require('./routes/userRoutes')
const adminRoutes=require('./routes/adminRoutes')
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.post('/upload', upload.single('image'), (req, res) => {
//   cloudinary.uploader.upload(req.file.buffer, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Image upload failed' });
//     }
//     res.json({ imageUrl: result.secure_url });
//   });
// });

app.use('/User',userRoutes);
app.use('/Admin',adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
