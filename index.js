const express = require ("express");
var cors = require('cors');
const mongoose = require ("mongoose");
const bodyParser = require("body-parser")
const { modelCat, modelUser } = require("./schema.js");

/* connect to mongo */
(async() => {
    await mongoose.connect("mongodb://localhost:27017/cat", {
        useNewUrlParser: true, useUnifiedTopology: true 
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully connected");
        }
    });
})();


/* APP */
const app = express();

app.listen(8080, () => {console.log("on port 8080")});
app.use(bodyParser.json());
app.use(cors());

/* API requests */ 
app.post('/create', async (req, res) => {
    const record = req.body;
    let response = {};
    
    try {
        response = await modelCat.create(record);
    } catch (err) {
        res.json({status: 1, error: err});
    }
    res.json({status: 0, response: response});
})

app.get('/', async (req, res) => {
    let records = [];
    try {
        records = await modelCat.find();
    } catch (err) {
        res.json({
            status: 1,
            error: err
        })
    }
    res.json({
        status: 0,
        cats: records
    })
})

app.post('/update', async (req, res) => {
    const record = req.body;
    var objectId = mongoose.Types.ObjectId(record._id);

    const query = {
        _id: objectId
    };
    const filter = {
        $set: {
            name: record.name,
            age: record.age,
            lastUpdate: Math.floor(Date.now() / 1000) 
        }
    };

    try {
        const recordExisting = await modelCat.findOne(query);
        if(!recordExisting) {
            res.json({
                status: 1,
                error: "Cat not found in the database"
            })
        }
        await modelCat.updateOne(query, filter);
    } catch (err) {
        res.json({
            status: 1,
            error: err
        })
    }

    res.json({
        status: 0,
        updateInfo: record
    })
})

app.delete('/', async (req, res) => {
    const record = req.body;
    var objectId = mongoose.Types.ObjectId(record._id);

    const query = {
        _id: objectId
    };

    try {
        await modelCat.deleteOne({}, query);
    } catch (err) {
        res.json({status: 1, error: err});
    }
    res.json({status: 0});
})

/* USER requests */
app.post('/user/create', async (req, res) => {
    const record = req.body;
    let response = {};
    
    try {
        response = await modelUser.create(record);
    } catch (err) {
        res.json({status: 1, error: err});
    }
    res.json({status: 0, response: response});
})

app.get('/user', async (req, res) => {
    const record = req.body;
    var objectId = mongoose.Types.ObjectId(record._id);
    const query = {
        _id: objectId
    };

    let user = {};
    try {
        user = await modelUser.find(query);
    } catch (err) {
        res.json({
            status: 1,
            error: err
        })
    }
    res.json({
        status: 0,
        user: user
    })
})