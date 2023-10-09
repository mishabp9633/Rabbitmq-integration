// advance messaging queue protocol library (amqplib)
const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`,(err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) => {
        if(err){
            throw err;       
        }
        let queueName = 'RabbitMq';
        let message = 'This is a Rabbit mq service'
        channel.assertQueue(queueName,{
            durable: false
        })
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`message : ${message}`);
        setTimeout(() => {
            connection.close();
        }, 1000);
    })
})