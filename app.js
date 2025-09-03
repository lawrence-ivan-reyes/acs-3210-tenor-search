// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Middleware
const handlebars = require('express-handlebars');

const hbs = handlebars.create({
    helpers: {
        foo() { return 'FOO!'; },
        bar() { return 'BAR!'; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    Tenor.Search.Query(term, "10")
        .then(response => {
            const gifs = response;
            res.render('home', { gifs })
        }).catch(console.error);
  })

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.render('greetings', { name });
  })

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});

const Tenor = require("tenorjs").client({
    "Key": "AIzaSyDOQPgewIp7yCqW7DG5cCVM_WXg4Xw9Irg", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
  });
