from flask import Flask, url_for, request, send_from_directory,jsonify
from sgp4.earth_gravity import wgs72
from sgp4.io import twoline2rv

app = Flask(__name__)
app.debug = True

@app.route('/model')
def api_model():
    with open ("../model/model.json", "r") as myfile:
        data=myfile.read().replace('\n', '')
    return data;

@app.route('/calculate', methods = ['POST'])
def api_calculate():
    if request.headers['Content-Type'] == 'application/json':
    	satellite = twoline2rv(request.json['line1'], request.json['line2'], wgs72)
    	result = satellite.propagate(request.json['year'], request.json['month'], request.json['day'], request.json['hour'], request.json['minute'], request.json['second'])
        return jsonify(position=result[0],velocity=result[1]);
    else:
        return "415 Unsupported Media Type ;)"

@app.route('/app/<path:filename>', methods = ['GET'])
def send_file(filename):
    return send_from_directory('../', filename)

if __name__ == '__main__':
    app.run()