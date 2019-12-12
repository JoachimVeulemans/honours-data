#!/usr/bin/python3
import os
from flask import Flask, jsonify, request, Response, make_response
from fileManager import FileReader, FileWriter
from flask_cors import *
from flask_login import LoginManager, current_user, login_user, login_required, logout_user
import logging

origin = os.getenv('ORIGIN')
if origin is None:
    origin = 'https://honourlogs.jocawebs.be'

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
    r"/*": {"origins": ["https://honourlogs.jocawebs.be:443/*"]}})

logging.getLogger('flask_cors').level = logging.DEBUG
path_to_file = "/var/www/public/data.txt"
app.debug = True


@app.route("/")
def hello():
    return "Data node is up & running!"


@app.route("/ideas", methods=['GET', 'OPTIONS', 'DELETE'])
def call_get_logs():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(jsonify(get_logs()))
    if request.method == 'DELETE':
        # clear_logs()
        return _build_cors_actual_response(jsonify({'success': 'true'}))


@app.route("/ideas", methods=['POST', 'OPTIONS'])
def call_post_log():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "POST":
        send_log(request.get_json())
        return _build_cors_actual_response(jsonify({'success': 'true'}))


def send_log(log):
    file_writer = FileWriter(path_to_file)
    file_writer.write_line(log)


def clear_logs():
    file_writer = FileWriter(path_to_file)
    file_writer.clear()


def get_logs():
    file_reader = FileReader(path_to_file)
    return file_reader.get_json()


def _build_cors_prelight_response():
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['content-type'] = 'application/json'
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    return response


def _build_cors_actual_response(response):
    response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


if __name__ == "__main__":
    file = open(path_to_file, "w+")
    file.close()
    app.run(debug=True)
