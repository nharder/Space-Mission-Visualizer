JavaScript Frontend
===================
The frontend code currently consists mainly of the rendering engine since since all transformation of orbit data is done at the backend.


Python Backend
==============

The Backend Script is quite basic and does not contain any error checking. It does however need the following packages:

pip install flask
pip install sgp4

After starting the backend with 'python server.py' the frontend should be able to request the "model" which right now is a JSON file.

The script acts as simple webserver and provides the html/css/js/img files and also provides two operations: /model for requesting the model and /calculate for transforming TLE data to usable coordinates

Ressources
==========

Two Line Element Set Data Explanation and data sources

http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html
http://en.wikipedia.org/wiki/Two-line_element_set
http://www.satobs.org/tletools.html
http://www.amsat.org/amsat/ftp/keps/current/nasa.all

