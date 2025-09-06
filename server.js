const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://1nt23ec113pruthvik_db_user:Black220405@cluster0.9fxfwhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB Atlas connection error:', err));

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);  

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('EcoFinds Backend Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

