import json
import os
from flask import jsonify


class NotFoundException(Exception):
    pass


class FileReader:
    def __init__(self, file: str):
        if os.path.isfile(file):
            self.file = file
        else:
            raise NotFoundException("file was not found")

    def get_json(self):
        f = open(self.file, 'r')
        lines = str(f.readlines())
        f.close()
        lines = lines.replace("\\n", "")
        lines = lines.replace("\"", "")
        lines = lines.replace("'", '"')
        print(lines)
        return json.loads(lines)


class FileWriter:
    def __init__(self, file):
        if os.path.isfile(file):
            self.file = file
        else:
            raise NotFoundException("file was not found")

    def write_lines(self, lines: []):
        for line in lines:
            self.write_line(line)

    def write_line(self, line: str):
        f = open(self.file, "a+")
        f.write(str(line) + "\n")
        f.close()

    def clear(self):
        f = open(self.file, "w")
        f.close()
