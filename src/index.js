const express = require('express');
const app = express();
const getUrlRoutes = require('./routes/getUrlRoutes');
const rootRoutes = require('./routes/rootRoutes');

app.use(express.json());
app.use(getUrlRoutes);
app.use(rootRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
