var user = require('./controllers/user')
  , tile = require('./controllers/tile')
  , home = require('./controllers/home');

app.get('/', home.index);
app.get('/users', user.read);
app.get('/tiles', tile.read);

app.post('/users', user.update);
app.post('/tiles', tile.update);

app.del('/tiles/:id', tile.del);