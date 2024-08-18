//require express
const express = require('express')
const morgan = require('morgan');
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression')
const path = require('path');
dotenv.config({ path: 'config.env' })
//require cors
const cors = require('cors')
//require connectDB
const connectDB = require('./config/connectDB')
const mountRoutes = require('./routes')

const ApiError = require('./utils/apiError')
const globalError = require('./middlewares/error')

//connectDB
connectDB();

//init express 
const app = express()

//cors 
app.use(cors())
app.options('*', cors())

// compress all responses
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`node:${process.env.NODE_ENV}`)
}

app.use(mongoSanitize());

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000,
    message:
        'Too many accounts created from this IP, please try again after an hour',
});

// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

//Middleware 
app.use(express.json({ limit: '20kb' }))

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
    hpp({
        whitelist: [
            'price',
            'sold',
            'quantity',
            'ratingsAverage',
            'ratingsQuantity',
        ],
    })
);

//routes
app.use('/uploads/invoices', express.static(path.join(__dirname, 'uploads/invoices')));
app.use('/uploads/medical-files', express.static(path.join(__dirname, 'uploads/medical-files')));
// Mount Routes
mountRoutes(app);

app.all('*', (req, res, next) => {
    next(new ApiError(`can t find this route ${req.originalUrl}`, 400))
});

// Global error handling middleware for express
app.use(globalError);

//create port 
const PORT = process.env.PORT || 8000
//launch the server
const server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
)

//Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhanledRejection Errors : ${err.name} | ${err.message}`)
    server.close(() => {
        console.error(`Shutting down ...`);
        process.exit(1);
    })
})
