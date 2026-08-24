const express = require('express');
const reportsRoutes = require('./routes/reportsRoutes');
const logger = require('./middleware/logger');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(logger);


app.get("/" , (req, res) => {
    res.json({
        message: "Çalışıyor"
    });
});


app.use("/reports", reportsRoutes);


app.listen(PORT, () => {
    console.log(`PORT: ${PORT} Adresinde Çalışıyor.\nTam Bağlantı: http://localhost:${PORT}`);
});
