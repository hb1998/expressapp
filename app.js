const express = require('express')
const enableWs = require('express-ws')

const app = express()

enableWs(app)

var weapon = [], anomaly= [], speech=[];

app.ws('/', (ws, req) => {
    ws.on('message', msg => {
        let temp = JSON.parse(msg)
        console.log(temp)
        if(temp.weapon){

            weapon.push(temp.weapon)
        }
        else if(temp.anomaly){
            weapon.push(temp.anomaly)

        }
        else if(temp.speech){
            weapon.push(temp.speech)

        }
        // ws.send(JSON.stringify({
        //     data:{
        //         weapon:weapon,
        //         anomaly:anomaly,
        //         speech:speech
        //     }
        // }))


    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
        console.log(weapon)
        
    })
})

app.get('/',(req,res)=>{
    res.send({
        data:{
            weapon:weapon,
            anomaly:anomaly,
            speech:speech
        }
    })
})


app.listen(80,()=>{
    console.log('Web socket connection started')
})