import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import addProperty from './routes/addProperty';
import searchProperty from './routes/searchProperty';

const app = express();
const port = 3000;

app.locals.properties = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/property', addProperty);
app.use('/property', searchProperty);
app.all('*', (req: Request, res: Response) => {
  res.send("This is not the query you're looking for.");
});

app.listen(port, () => {
    console.log("App listening on http://localhost:%d\n", port);
});