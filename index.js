const express = require('express')

const cors = require('cors');
const helmet = require('helmet');
const server = express();

const userRouter = require('./Users/UsersRoutes');
const authenticate = require('./Users/authentication/authMiddleWare');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/accounts', userRouter)

server.get('/', (req, res) => {
    res.send('welcome to fish friends API')
})

server.get('/testing', (req, res) => {
    res.json("test completed")
})

const port = 7000
server.listen(port, console.log(`listening on port ${port}`))