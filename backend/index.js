const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
app.use(cors());

app.get("/api/data", async (req, res) => {
    try {
        res.set('Content-Type', 'application/json; charset=utf8');
        const tempFile = fs.createReadStream('uploads/chart.json');
        return tempFile.pipe(res);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

app.post("/api/data", async (req, res) => {
    try {
        const url = 'https://openapi.naver.com/v1/datalab/search';
        const {startDate, endDate, timeUnit, device, gender, ages, keywordGroups } = req.body;
        const request_body = {
            startDate: startDate,
            endDate: endDate,
            timeUnit: timeUnit,
            device: device === "all" ? "" : device,
            gender: gender === "all" ? "" : gender,
            ages: ages,
            keywordGroups: keywordGroups
        }
        const headers = {
            'X-Naver-Client-Id': process.env.CLIENT_ID,
            'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
            'Content-Type': 'application/json'
        }
        const result = await axios.post(url, request_body, {
            headers
        });
        console.log(result.data);
        fs.writeFile('./uploads/chart.json', JSON.stringify(result.data['results']), function(error) {
            console.log(error);
            if (error) throw error;
        });
        return res.json({status: "OK"});
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

app.delete("/api/data", async (req, res) => {
    try {
        fs.unlink('uploads/chart.json', function(err) {
            if (error) {
                console.log(error);
                return res.json(error);
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

app.listen(PORT, () => console.log(`PORT : ${PORT}`));