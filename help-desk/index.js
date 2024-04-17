const express = require('express');
const cors = require('cors');
const app = express();
const { signUp, signIn } = require('./controller/user.controller');
const { createTicket, updateTicketStatus, updateTicketCompletedBy, updateTicketCompletedTime, getAllTickets, getTicket, getUserTickets } = require('./controller/ticket.controller');

const { NODE_ENV } = process.env;
const environment = NODE_ENV === 'production' ? 'prod.env' : 'local.env';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'environments', environment) });

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.userId = new mongoose.Types.ObjectId('65e182f83a0043a73af0f86e')
    next();
});

const connectDB = require('./db.config');
const { default: mongoose } = require('mongoose');

app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/tickets', getAllTickets);
app.get('/user-tickets', getUserTickets);
app.get('/ticket', getTicket);
app.post('/create-ticket', createTicket);
app.post('/ticket-status', updateTicketStatus);
app.post('/ticket-completed-by', updateTicketCompletedBy);
app.post('/ticket-completed-time', updateTicketCompletedTime);

connectDB();

const { APP_PORT } = process.env;
const appPort = APP_PORT || 3001;
app.listen(Number(appPort), () => console.log(`App running on http://localhost:${Number(appPort)}`));
// dotenv.config