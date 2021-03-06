#!/usr/bin/python3

import os
from flask import Flask, jsonify, request, Response, make_response
from fileManager import FileReader, FilesReader, FileWriter
from flask_cors import *
import logging

base_url = "https://honourdata.joachimveulemans.be"

origin = os.getenv('ORIGIN')
if origin is None:
    origin = base_url

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False
CORS(app, supports_credentials=True, resources={
    r"/*": {"origins": [base_url + ":443/*"]}})

logging.getLogger('flask_cors').level = logging.DEBUG
path_to_files = "/var/www/public/ideas/"
deleted_path_to_files = "/var/www/public/deleted/"
app.debug = True


@app.route("/")
def hello():
    return "Data node is up & running!"


@app.route("/list", methods=['GET', 'OPTIONS'])
def call_list():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        return _build_cors_actual_response(jsonify(get_ideas()))


@app.route("/<id>", methods=['GET', 'DELETE', 'POST', 'OPTIONS'])
def call_idea(id):
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    if request.method == "GET":
        if id == "favicon.ico":
            return _build_cors_actual_response(jsonify({'success': 'false'}))
        return _build_cors_actual_response(jsonify(get_idea(id)))
    if request.method == 'DELETE':
        clear_idea(id)
        return _build_cors_actual_response(jsonify({'success': 'true'}))
    if request.method == "POST":
        send_idea(request.get_json(), id)
        return _build_cors_actual_response(jsonify({'success': 'true'}))


def send_idea(idea, id):
    file_writer = FileWriter(path_to_files + id + ".txt")
    file_writer.write_line(idea)


def clear_idea(id):
    file_writer = FileWriter(path_to_files + id + ".txt")
    file_writer.remove(deleted_path_to_files + id + ".txt")


def get_idea(id):
    file_reader = FileReader(path_to_files + id + ".txt")
    return file_reader.get_json()


def get_ideas():
    files_reader = FilesReader(path_to_files)
    return files_reader.get_list()


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
    os.mkdir(path_to_files)
    app.run(debug=True)
