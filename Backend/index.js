import express from 'express'
import axios from 'axios';
import cors from 'cors'

const app = express();
const PORT =  3000;

app.use(cors());

const API_URL = "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";


const rules = [
    {
      name: "Valuation Fee Paid",
      evaluate: (data) => data.isValuationFeePaid === true,
    },
    {
      name: "UK Resident",
      evaluate: (data) => data.isUkResident === true,
    },
    {
      name: "Risk Rating Medium",
      evaluate: (data) => data.riskRating === "Medium",
    },
    {
      name: "LTV Below 60%",
      evaluate: (data) => {
        const ltv = (data.loanRequired / data.purchasePrice) * 100;
        return ltv < 60;
      },
    },
  ];

  app.get("/checklist", async (req, res) => {
    try {
        const {data} = await axios.get(API_URL);

        const results = rules.map((rule) => ({
            rule: rule.name,
            status: rule.evaluate(data),
        }))
        res.json(results);
    } catch (error) {
        res.status(500).send("Error fetching data: " + error.message);
    }
  })


app.get('/', (req, res) => {
    res.send('Hello World!!!');
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})