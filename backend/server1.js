
/*

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1',
  port: 5432,
});

app.get('/api/contacts', (req, res) => {
  pool.query('SELECT * FROM contacts', (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    } else {
      res.send(result.rows);
    }
  });
});

app.post('/api/contacts', body('number').isMobilePhone(), body('name').isLength({min:1}), (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
        success: false,
        errors: errors.array()
    });
  }

  pool.query(`INSERT INTO contacts (name, number) VALUES ($1, $2) RETURNING *`, [name, number], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    } else {
      res.send(result.rows[0]);
    }
  });
});



app.delete('/api/contacts/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM contacts WHERE id = $1', [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});




*/



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize('postgres://postgres:1@localhost:5432/postgres');

const Contact = sequelize.define('contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isMobilePhone: true
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()')
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.send(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/contacts', body('number').isMobilePhone(), body('name').isLength({min:1}), async (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
        success: false,
        errors: errors.array()
    });
  }

  try {
    const contact = await Contact.create({
      name,
      number
    });
    res.send(contact);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Contact.destroy({
      where: {
        id
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
