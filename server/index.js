require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const app = express();

const port = process.env.PORT || 9000;
const corsOpts = {};

// middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

// start
app.listen(port, () => console.log(`Server is running on port ${port}`));
