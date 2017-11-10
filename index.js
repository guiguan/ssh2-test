/**
 * @Author: Guan Gui <guiguan>
 * @Date:   2017-11-10T14:08:19+11:00
 * @Email:  root@guiguan.net
 * @Last modified by:   guiguan
 * @Last modified time: 2017-11-10T16:50:22+11:00
 */

const Client = require('ssh2').Client;

const conn = new Client();
conn
  .on('ready', function() {
    console.log('Client :: ready');
    conn.shell(function(err, stream) {
      if (err) throw err;

      stream
        .on('close', function() {
          console.log('Stream :: close');
          conn.end();
        })
        .on('data', function(data) {
          // console.log('STDOUT: ' + JSON.stringify(data.toString()));
          console.log('STDOUT: ' + data.toString());
        })
        .stderr.on('data', function(data) {
          // console.log('STDERR: ' + JSON.stringify(data.toString()));
          console.log('STDERR: ' + data.toString());
        })
        .on('error', error => {
          console.log(error);
        });

      stream.end('dir\r');
    });
  })
  .connect({
    host: '10.0.0.167',
    port: 22,
    username: 'guiguan',
    password: ''
    // privateKey: require('fs').readFileSync('/here/is/my/key')
  });
