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
        channel.assertQueue(queueName,{
            durable: false
        })
        channel.consume(queueName, (message) => {
            console.log(`Recieved : ${message.content.toString()}`);
            
            // deleting the message explicity
            channel.ack(message)
        },
        // deleting the message implicitly
        //
        // {
        //     noAck:true
        // }
        )
    })
})