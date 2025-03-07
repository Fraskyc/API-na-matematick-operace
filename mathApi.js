const express = require('express');
const app = express();
const port = 3000;

function parseNumbers(query) {
  const numbers = query.split(',').map(Number);
  if (numbers.some(isNaN)) {
    throw new Error('Neplatný vstup. Všechny vstupy musí být čísla.');
  }
  return numbers;
}

app.get('/add', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.numbers);
    const vysledek = numbers.reduce((a, b) => a + b, 0);
    res.json({ "Součet je": vysledek });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/sub', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.numbers);
    const vysledek = numbers.slice(1).reduce((a, b) => a - b, numbers[0]);
    res.json({ "Rozdíl je": vysledek });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/mult', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.numbers);
    const vysledek = numbers.reduce((a, b) => a * b, 1);
    res.json({ "Násobek je": vysledek });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/div', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.numbers);
    const vysledek = numbers.slice(1).reduce((a, b) => {
      if (b === 0) throw new Error('Dělení nulou není povoleno.');
      return a / b;
    }, numbers[0]);
    res.json({ "Dělitel je": vysledek });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/pow', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.numbers);
    const vysledek = numbers.slice(1).reduce((a, b) => Math.pow(a, b), numbers[0]);
    res.json({ "Mocnitel je": vysledek });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/root', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.numbers);
    if (numbers.length !== 2) {
      throw new Error('Vyžaduje přesně dvě čísla.');
    }
    const [root, number] = numbers;
    if (root <= 0) {
      throw new Error('Číslo musí být větší než 0');
    }
    const vysledek = Math.pow(number, 1 / root);
    res.json({ "Odmocnitel je": vysledek });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Neplatná operace' });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
