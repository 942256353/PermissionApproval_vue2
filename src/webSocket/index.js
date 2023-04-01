//WebSocket
let WebSocket = require('ws');
let port = 3002
let wss = new WebSocket.Server({ port });

// let randomOption = () => Math.floor(Math.random() * 750 + 50);
let randomOption3 = () => Math.floor(Math.random() * 10 + 20);
let randomOption4 = () => Math.floor(Math.random() * 122 + 1);
let count = 1;
let data = [100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540];
wss.on('connection', function (ws) {
    console.log("WeSocket链接成功");
    setInterval(() => {
        let optionData = [
        data[0]<800?data[0]+=12:data[0]=100,
        data[1]<800?data[1]+=11:data[1]=140,
        data[2]<800?data[2]+=10:data[2]=180,
        data[3]<800?data[3]+=9:data[3]=220,
        data[4]<800?data[4]+=8:data[4]=260,
        data[5]<800?data[5]+=7:data[5]=300,
        data[6]<800?data[6]+=6:data[6]=340,
        data[7]<800?data[7]+=5:data[7]=380,
        data[8]<800?data[8]+=4:data[8]=420,
        data[9]<800?data[9]+=3:data[9]=460,
        data[10]<800?data[10]+=2:data[10]=500,
        data[11]<800?data[11]+=1:data[11]=540]
      //  let optionData = [randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption(), randomOption()]
        let option2Data = [
            {
                value: count<=100?++count:(1,count=1),
                name: "SCORE",
            },
        ]
        let option3Data = [
            { value: randomOption3(), name: "rose 3" },
            { value: randomOption3(), name: "rose 4" },
            { value: randomOption3(), name: "rose 5" },
            { value: randomOption3(), name: "rose 6" },
            { value: randomOption3(), name: "rose 7" },
        ]
        let option4Data = [randomOption4(),randomOption4(),randomOption4(),randomOption4(),randomOption4(),randomOption4(),randomOption4(),randomOption4()]
        let res = {
            optionData,
            option2Data,
            option3Data,
            option4Data
        }
        ws.send(JSON.stringify(res))
    }, 3000)
})