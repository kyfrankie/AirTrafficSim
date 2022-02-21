const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { spawn } = require('child_process');
const Tail = require('tail').Tail;

module.exports = {
    simulation: simulation = (socket) => {
        console.log("function - simulation");

        const python = spawn('python', ['../simulation', '--headless']);

        python.stdout.on('data', function (data) {
            // console.log(data.toString());
        });

        python.stderr.on('data', function (data) {
            console.log(data.toString());
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });


        // const parser = parse({columns: true, skip_empty_lines: true}, (err, records) => {
        //     console.log(records)
        // });


        var flight_data = [];

        const tail = new Tail('./data/simulation.csv', {nLines: 50});

        tail.on("line", (data) => {
            console.log(data)
            const content = parse(data, {

            });
            console.log(content)
        })

        tail.on("error", function(error) {
            console.log('ERROR: ', error);
        });

        // http.request("http://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=90%2C-90%2C105%2C125&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1", (res) => {
        //     var data = "";
        //     res.on("data", (chunk) => {
        //         data += chunk;
        //     });
        //     res.on("end", () => {
        //         let content = JSON.parse(data);
        //         delete content.version;
        //         delete content.full_count;
        //         delete content.stats;

        //         var time = new Date();
        //         console.log(time.toISOString());
        //         const aircrafts = [
        //             {
        //                 "id": "document",
        //                 "name": "My Document",
        //                 "version": "1.0",
        //                 // "clock": {
        //                 //     "currentTime": time.toISOString()
        //                 // }
        //             }
        //         ];

        //         Object.keys(content).forEach((key) => {
        //             const aircraft = {
        //                 "id": key,
        //                 "name": content[key][13],
        //                 "description": `${content[key][2]}, ${content[key][1]}, ${content[key][4]}`,
        //                 "epoch": time.toISOString(),
        //                 "position": {
        //                     "cartographicDegrees": [content[key][2], content[key][1], content[key][4]/3.2808]
        //                 },
        //                 "point": {"pixelSize": 5},
        //                 "label": {
        //                     "text": `${content[key][13]}, ${content[key][8]}\n${content[key][11]}-${content[key][12]}\n${content[key][4]}, ${content[key][5]}`,
        //                     "font": "9px sans-serif",
        //                     "horizontalOrigin": "LEFT",
        //                     "pixelOffset": {
        //                         "cartesian2": [10, 15],
        //                     },
        //                     "distanceDisplayCondition": {
        //                         "distanceDisplayCondition": [0, 1000000]
        //                     },
        //                     "showBackground": true,
        //                     "backgroundColor": {
        //                         "rgba": [0, 0, 0, 100]
        //                     }
        //                 }
        //             }
        //             aircrafts.push(aircraft);
        //         });
 
        //         socket.volatile.emit("realtime:all", aircrafts); 
        //     });
        // }).end();
    }
}