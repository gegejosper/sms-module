const serialportgsm = require('serialport-gsm')

let modem = serialportgsm.Modem()
let options = {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    rtscts: false,
    xon: false,
    xoff: false,
    xany: false,
    autoDeleteOnReceive: true,
    enableConcatenation: true,
    incomingCallIndication: true,
    incomingSMSIndication: true,
    pin: '',
    customInitCommand: '',
    cnmiCommand: 'AT+CNMI=2,1,0,2,1',
    logger: console
}

modem.open('COM4', options,{})

modem.on('open', data => {	
    // initialize modem
    modem.initializeModem(() => {
        console.log('modem initialized');
        //send sms 
        modem.sendSMS('639177222631', 'Hello there Gege!', true, (data) => {
            console.log(data);
           
        });
        // modem.checkModem((data) => {
        //     console.log(data)
        // })
        // modem.getNetworkSignal((data) => {
        //         console.log(data)
        // })

        // modem.getSimInbox((data) => {
        //                 console.log(data)
        //         });
        // modem.getOwnNumber((data) => {
        //             console.log(data)
        //     })
    });
});

modem.on('onSendingMessage', result => { 
    console.log(result);
})

// modem.getOwnNumber((data) => {
//     console.log('getting number',data);
// })