import time
from flask_socketio import emit
from datetime import datetime, timedelta
import numpy as np
import pandas as pd
import csv
from pathlib import Path

from utils.unit import Unit_conversion
from traffic.traffic import Traffic


class Environment:

    def __init__(self, N=1000, file_name="default"):
        # User setting
        self.start_time = datetime.utcnow()
        """The simulation start time [datetime object]"""
        self.end_time = 60
        """The simulation end time [s]"""

        # Simulation variable
        self.traffic = Traffic(N)
        self.global_time = 0                    # [s]

        # Handle io
        self.socket = False                    # Whether to send message to client through socket
        self.datetime = datetime.utcnow()
        self.last_sent_time = time.time()
        # Buffer
        self.time = []
        self.lat = []
        self.long = []
        self.alt = []
        self.cas = []

        # File IO
        self.folder_path = Path(__file__).parent.parent.parent.resolve().joinpath('data/replay/simulation/'+file_name+'-'+self.datetime.isoformat(timespec='seconds'))
        self.folder_path.mkdir()
        self.file_path = Path(__file__).parent.parent.parent.resolve().joinpath('data/replay/simulation/'+file_name+'-'+self.datetime.isoformat(timespec='seconds')+'.csv')
        self.writer = csv.writer(open(self.file_path, 'w+'))
        header = ['timestep','timestamp', 'id', 'callsign', 'lat', 'long', 'alt', 'heading', 'cas', 'tas', 'mach', 'vs', 'weight', 'fuel_consumed',
                    'bank_angle', 'trans_alt', 'accel', 'drag', 'esf', 'thrust', 'flight_phase', 'speed_mode', 'ap_speed_mode']
        self.writer.writerow(header)


    def atc_command(self):
        pass


    def run(self, socketio=None):
        for i in range(self.end_time):
            # One timestep
            start_time = time.time()
            print("")
            print("Environment - step(), time = ", self.global_time)
            print("")

            self.atc_command()

            print("update states")
            self.traffic.update()
            print("Save to file")
            self.save()
            
            if(self.socket):
                # Save to buffer
                self.time.append((self.datetime + timedelta(seconds=self.global_time)).isoformat())
                self.lat.append(self.traffic.lat)
                self.long.append(self.traffic.long)
                self.alt.append(self.traffic.alt)
                self.cas.append(self.traffic.cas)

                now = time.time()
                if ((now - self.last_sent_time) > 5) or (self.global_time == (self.end_time-1)):
                    self.send_to_client(socketio)
                    # socketio.sleep(0)
                    self.last_sent_time = now
                    self.time = []
                    self.lat = []
                    self.long = []
                    self.alt = []
                    self.cas = []

            self.global_time += 1
            print("Environment - step() finish at", time.time() - start_time)

        print("")
        print("Export to CSVs")
        self.export_to_csv()
        print("")
        print("Simulation finished")


    def save(self):
        """
        Save all states variable of one timestemp to csv file.
        """
        data = np.column_stack((np.full(self.traffic.n, self.global_time), np.full(self.traffic.n, (self.datetime + timedelta(seconds=self.global_time)).isoformat(timespec='seconds')), np.arange(self.traffic.n), self.traffic.call_sign[:self.traffic.n], self.traffic.lat[:self.traffic.n], self.traffic.long[:self.traffic.n], self.traffic.alt[:self.traffic.n], self.traffic.heading[:self.traffic.n], 
                        self.traffic.cas[:self.traffic.n], self.traffic.tas[:self.traffic.n], self.traffic.mach[:self.traffic.n], self.traffic.vs[:self.traffic.n], self.traffic.mass[:self.traffic.n], self.traffic.fuel_consumed[:self.traffic.n],
                        self.traffic.bank_angle[:self.traffic.n], self.traffic.trans_alt[:self.traffic.n], self.traffic.accel[:self.traffic.n], self.traffic.drag[:self.traffic.n], self.traffic.esf[:self.traffic.n], self.traffic.thrust[:self.traffic.n], self.traffic.flight_phase[:self.traffic.n], self.traffic.speed_mode[:self.traffic.n], self.traffic.ap.speed_mode[:self.traffic.n])) #debug
        self.writer.writerows(data)


    def export_to_csv(self):
        df = pd.read_csv(self.file_path)
        for id in df['id'].unique():
            df[df['id'] == id].to_csv(self.folder_path.joinpath(str(id)+'.csv'), index=False)


    def send_to_client(self, socketio):
        # print("send to client")
        if self.global_time == 0:
            document = [{
                    "id": "document",
                    "name": "simulation",
                    "version": "1.0",
                    "clock": {
                        "interval": self.datetime.isoformat()+"/"+(self.datetime + timedelta(seconds=self.end_time)).isoformat(),
                        "currentTime": self.datetime.isoformat(),
                    }
                }]
        else:
            document = [{
                    "id": "document",
                    "name": "simulation",
                    "version": "1.0",
                    "clock": {
                        "interval": self.datetime.isoformat()+"/"+(self.datetime + timedelta(seconds=self.end_time)).isoformat(),
                        "currentTime": self.datetime.isoformat(),
                    }
                }]

        lat = np.vstack(tuple(self.lat))
        long = np.vstack(tuple(self.long))
        alt = np.vstack(tuple(self.alt))
        cas = np.vstack(tuple(self.cas))

        for i in range(self.traffic.n):
            positions = np.column_stack((np.array(self.time, dtype="object"), long[:,i], lat[:,i], Unit_conversion.feet_to_meter(alt[:,i]))).flatten().tolist()
            label = [{"interval": time+"/"+(self.datetime + timedelta(seconds=self.end_time)).isoformat(), 
                    "string": self.traffic.call_sign[i]+"\n"+str(np.floor(alt))+"ft "+str(np.floor(cas))+"kt"} 
                    for time, alt, cas in zip(self.time, alt[:,i], cas[:,i])]
            
            trajectory = {
                    "id": self.traffic.call_sign[i],
                    "position": {
                        "cartographicDegrees": positions
                    },
                    "point": {
                        "pixelSize": 5,
                        "color": {
                            "rgba": [39, 245, 106, 215]
                        }
                    },
                    "path": {
                        "leadTime": 0,
                        "trailTime": 20,
                        "distanceDisplayCondition": {
                            "distanceDisplayCondition": [0, 1500000]
                        }
                    },
                    "label": {
                        "text": label,
                        "font": "9px sans-serif",
                        "horizontalOrigin": "LEFT",
                        "pixelOffset": {
                            "cartesian2": [20, 20],
                        },
                        "distanceDisplayCondition": {
                            "distanceDisplayCondition": [0, 1500000]
                        },
                        "showBackground": "false",
                        "backgroundColor": {
                            "rgba": [0, 0, 0, 50]
                        }
                    }
                }
            document.append(trajectory)
        
        emit('simulationData', document)
        
