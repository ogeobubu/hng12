const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const digitSum = (num) => {
  return num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
};

const isArmstrong = (num) => {
  const digits = num.toString().split("");
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), digits.length),
    0
  );
  return sum === num;
};

app.get("/api/classify-number", async (req, res) => {
  const number = parseInt(req.query.number);

  if (isNaN(number)) {
    return res.status(400).json({ number: req.query.number, error: true });
  }

  const prime = isPrime(number);
  const perfect = false;
  const armstrong = isArmstrong(number);
  const properties = [];

  if (armstrong) properties.push("armstrong");
  properties.push(number % 2 === 0 ? "even" : "odd");

  try {
    const response = await axios.get(`http://numbersapi.com/${number}/math`);
    const funFact = response.data;
    res.json({
      number: number,
      is_prime: prime,
      is_perfect: perfect,
      properties: properties,
      digit_sum: digitSum(number),
      fun_fact: funFact,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fun fact" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
