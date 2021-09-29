import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/motube', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to MongoDB');
const handleError = (err) => console.log('❌ DB Error', err);

// Events
db.on('error', handleError);
db.once('open', handleOpen);
