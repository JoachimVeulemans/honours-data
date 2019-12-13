import json
import os
from flask import jsonify

class FileReader:
    def __init__(self, file: str):
        if not os.path.isfile(file):
            fileLoc = open(file, "w")
            fileLoc.close()
        self.file = file

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
        if not os.path.isfile(file):
            fileLoc = open(file, "w")
            fileLoc.close()
        self.file = file

    def write_lines(self, lines: []):
        for line in lines:
            self.write_line(line)

    def write_line(self, line: str):
        f = open(self.file, "w")
        f.write(str(line) + "\n")
        f.close()

    def clear(self):
        f = open(self.file, "w")
        f.close()
