import csv
import json
import re
import os

# Open CSV file
csvfile = open('self_only.csv', 'rU')
reader = csv.reader(csvfile)
rows = [row for row in reader]

header = rows[0] # Get header (key names)
rows = rows[1:] # Get data by row (1 row = 1 subject's values)

# Desired replacements (see line 25)
rep = {'"{': '{', '}"': '}', '"[': '[', ']"': ']'}

for row in rows:
	# Create key-value pairs
	jsontxt = dict(zip(header, row))

	# Write each row of CSV to a separate JSON file
	rawfile = open(jsontxt['AssignmentId'] + '_raw.json', 'w')
	jsonfile = open(jsontxt['AssignmentId'] + '.json', 'w')
	json.dump(jsontxt, rawfile)

	rawfile.close()
	rawfile = open(jsontxt['AssignmentId'] + '_raw.json', 'r')

	# Replace system, trials with objects
	# (by default, json.dump parses these as strings)
	for line in rawfile:
		for k, v in rep.iteritems():
			line = line.replace(k, v)
		jsonfile.write(line)

	# Close JSON file after writing
	rawfile.close()
	jsonfile.close()

	os.remove(jsontxt['AssignmentId'] + '_raw.json')
