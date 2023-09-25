const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('COM4', { baudRate: 9600 }); // Adjust the serial port as needed
const parser = new Readline();

// Function to send AT command and listen for the response
function sendATCommand(command) {
    return new Promise((resolve, reject) => {
        port.write(command + '\r\n', (err) => {
            if (err) {
                reject(err);
            }
        });

        parser.once('data', (data) => {
            resolve(data.trim());
        });
    });
}

port.on('open', async () => {
    console.log('Serial port is open.');

    try {
        // Send AT command to check signal strength
        const signalResponse = await sendATCommand('AT+CSQ');
        console.log('Signal Strength:', signalResponse);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the serial port
        port.close((err) => {
            if (err) {
                console.error('Error:', err.message);
            }
            console.log('Serial port closed.');
        });
    }
});

port.on('error', (err) => {
    console.error('Error:', 'error');
});
