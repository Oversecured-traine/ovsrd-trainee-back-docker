const express = require('express');
const app = express();
const uploadRoutes = require('./routes/uploadRoutes');

app.use(express.json());
app.use(uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});