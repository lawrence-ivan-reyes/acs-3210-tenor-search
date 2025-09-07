// Require Libraries
const express = require('express');
const Tenor = require("tenorjs").client({
    "Key": "AIzaSyDOQPgewIp7yCqW7DG5cCVM_WXg4Xw9Irg", 
    "Filter": "high", 
    "Locale": "en_US",
});

// App Setup
const app = express();

// Middleware
app.use(express.static('public'));

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
    if (req.query.term && req.query.term.trim()) {
        const term = req.query.term.trim();
        Tenor.Search.Query(term, "10")
            .then(response => {
                const gifs = response;
                res.render('home', { gifs })
            }).catch(console.error);
    } else {
        // if no search term, render empty state
        res.render('home', { gifs: null });
    }
})

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.render('greetings', { name });
})

// Start Server
app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});
