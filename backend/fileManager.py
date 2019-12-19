import json
import os
from os import listdir
from os.path import isfile, join
from json import JSONDecodeError
from shutil import copyfile


class FileReader:
    def __init__(self, file: str):
        if not os.path.isfile(file):
            fileLoc = open(file, "w")
            fileLoc.close()
        self.file = file

    def get_json(self):
        f = open(self.file, 'r')
        lines = str(f.readline())
        f.close()
        if lines == "":
            lines = '{"Ideas": []}'
        try:
            return_value = json.loads(lines)
        except JSONDecodeError as error:
            print(error)
            return_value = "Je hebt geen geldige JSON meegegeven met je POST request. Dit is wat je gestuurd hebt: " + lines

        return return_value


class FilesReader:
    def __init__(self, path: str):
        self.path = path

    def get_list(self):
        onlyfiles = [f for f in listdir(self.path) if isfile(join(self.path, f))]
        correctFiles = []
        for file in onlyfiles:
            if (file.__contains__(".txt")):
                correctFiles.append(file.split(".txt")[0])
        return correctFiles


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
        line = str(line)
        line = line.replace("{'", '{\"')
        line = line.replace("'}", '\"}')
        line = line.replace("':", '\":')
        line = line.replace(", '", ', \"')
        line = line.replace(": '", ': \"')
        line = line.replace("', ", '\", ')
        line = line.replace("['", '[\"')
        line = line.replace("']", '\"]')

        f.write(line)
        f.close()

    def clear(self):
        f = open(self.file, "w")
        f.close()

    def remove(self, delete_path):
        copyfile(self.file, delete_path)
        os.remove(self.file)
