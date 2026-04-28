const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const resourcesRouter = require('./routes/resources');
const chatRouter = require('./routes/chat');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const placesRouter = require('./routes/places');

app.use('/api/resources', resourcesRouter);
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/places', placesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});