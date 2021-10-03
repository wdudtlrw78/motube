import './db';
import './models/Video';
import app from './app';

const PORT = 3011;

const handleListening = () => console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
