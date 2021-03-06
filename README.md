## About 
This repo is forked from  [IBM Sensor Tag](https://github.com/IBM-Bluemix/iot-sensor-tag
)

## Application

With the application you can e.g. check your environmental values (temperature, pressure & humidity) when your boss is breathing on your neck.

![Application](https://raw.githubusercontent.com/Atihinen/iot-sensor-tag/master/display/public/media/app.png)
Application utilizes [IBM BlueMix™](http://www-01.ibm.com/software/bluemix/) and Texas Instruments [CC2541 SensorTag](http://www.ti.com/tool/cc2541dk-sensor)

With this application you can set thresholds to temperature (C), humidity (%) and for pressure (mbar) and it will also store the values to temp file in `/tmp/sensor.log` and also to MongoDB in BlueMix.

![MongoLab](https://raw.githubusercontent.com/Atihinen/iot-sensor-tag/master/display/public/media/mongolab.png)

## Requirements

* OS: OSX/Linux
* TI CC2541 SensorTag
* BlueMix account
    * Internet of Things (IoT) service with apikey
    * MongoLab service


## Setup
* Login to BlueMix
    * Add IoT service
    * Add MongoLab service
    * ![BlueMix](https://raw.githubusercontent.com/Atihinen/iot-sensor-tag/master/display/public/media/bluemix.png)
* Create 2 config.properties files
    * ./blueconnector/

```
org=<xxxx>
type=iotsample-ti-bbst
id=<your-comp-mac-address-without-colon>
auth-method=token
auth-token=<xxxxxx>
```

Values are from BueMix IoT launch

    * ./display/


```
apikey=<xxxx>
apitoken=<xxxx>
mongoDB=<user>:<password>@<host>.mongolab.com:<port>/<DB>
```
Values are from BlueMix IoT apikey + Mongolab service

* Install needed requirements
	* ``` cd ./blueconnector ```
	* ``` npm install ```
	* ``` node sensort-tag.js ```
    *     **NOTICE** if you can't connect to  sensortag, check this [guide](https://github.com/IBM-Bluemix/iot-sensor-tag/blob/master/publish/README.md)
    * ``` cd ./display ```
    * ``` npm install ```
    *  ```node app.js ```
    * Open browser with [http://localhost:9999](http://localhost:9999)

You're ready to go!


## License
This code is licensed under Apache v2.  See the LICENSE file in the root of
the repository.