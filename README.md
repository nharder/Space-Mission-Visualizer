Space Mission Visualizer
------------------------

The goal of this project is to create a website that displays 3D map of man-made objects in orbit around the earth at a given point in time. Filtering by time of launch and categories as well as color coding can be applied to master the large amount of objects. Additional Information of each object can be accessed by clicking on it.

This prototype was created at the NASA Space Apps Challenge 2014 and tried to solve the [Space Adventure: From the Earth To the Limits of the Solar System](https://2014.spaceappschallenge.org/challenge/space-adventure-earth-limits-solar-system/) Challenge. It is not even close to be complete.

I'd like to thank the ESA Business Incubation Centre Noordwijk and Verhaert for hosting the event.

Technologies
============
Technologies currently used are HTML5, JavaScript with WebGL, JSON for Data exchange and Python. Orbit Calculations are done using the SGP4 Python Module.

JavaScript Frontend
===================
The frontend code currently consists mainly of the rendering engine since since all transformation of orbit data is done in the backend.

The frontend consists of JavaScript code using the THREEJS engine.

Python Backend
==============

The backend script is quite basic and does not contain any error checking. It does need the following packages:

pip install flask
pip install sgp4

The script acts as simple webserver and provides the html/css/js/img files and also provides two operations: /model for requesting the model and /calculate for transforming TLE data to usable coordinates.

After starting the backend with 'python server.py' the frontend can be reached at http://127.0.0.1:5000/app/index.html and it should be able to request the "model" which right now is a JSON file.

Ressources
==========
## THREEJS ##
http://threejs.org

## Two Line Element Set Data Explanation and data sources ##

http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html
http://en.wikipedia.org/wiki/Two-line_element_set
http://www.satobs.org/tletools.html
http://www.amsat.org/amsat/ftp/keps/current/nasa.all