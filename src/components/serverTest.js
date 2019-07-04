const express = require('express')
const axios = require('axios')
// const cors = require('cors')

const app = express()

// const server = express('http').Server(app)

// app.use(cors)
app.use('/', (req, res, next) => {
    axios.post('https://login.globo.com/api/authentication', 
            {
                "payload":
                    {
                        "email": "layssonoliveir4@gmail.com",
                        "password": "m1Gl0b04cc0unt",
                        "serviceId": 438
                    }
            },
            {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json, text/javascript",
            }).then((response) => {
                console.log(response)
                console.log('ID: ')
                console.log(response.data.glbId)
            }).catch((err) => {
                console.log(err)
            })
    next()    
    }
)

app.listen(3333);