# imports
# from bs4 import BeautifulSoup
from pathlib import Path
from types import SimpleNamespace
import requests
import json

filePath = './geforce-now-searcher/src/assets/response.json'

# Make the request
url = 'https://static.nvidiagrid.net/supported-public-game-list/locales/gfnpc-en-US.json?JSON'
req = requests.get(url)
res = req.text

# Save request response to file
file = open(filePath, "a")
file.write(res)
file.close()

# Read the cached response
content = Path(filePath).read_text()
# print(content)

# Parse the JSON response to an object with attributes corresponding to dict keys.
# {
#   "id":100932911,
#   "title":"41 Hours",
#   "sortName":"41_hours",
#   "isFullyOptimized":false,
#   "steamUrl":"https://store.steampowered.com/app/1358020",
#   "store":"Steam",
#   "publisher":"Valkyrie Initiative",
#   "genres":[ "Action", "First-Person Shooter" ],
#   "status":"AVAILABLE"
# }
gamesListFull = json.loads(content, object_hook=lambda d: SimpleNamespace(**d))
print(gamesListFull[0].title)
