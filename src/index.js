const express = require('express');
const app = express();
const routes = require('./routes/routes');
const logger = require('./utils/logger');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
