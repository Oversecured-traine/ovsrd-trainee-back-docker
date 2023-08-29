const express = require('express');
const app = express();
const uploadRoutes = require('./routes/uploadRoutes');
const rootRoutes = require('./routes/rootRoutes');

app.use(express.json());
app.use(uploadRoutes);
app.use(rootRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
