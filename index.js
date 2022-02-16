const fs = require('fs');
const axios = require('axios');

const checkData = 'QmWj4nCkPT92VsqvybK4eDXcSVGY54FAURpTE9ryk5ahXa';
var okgateways = [];

function filecontenttoarray(file) {
	var file = fs.readFileSync(file, 'utf8');
	var array = file.split('\n');
	return array;
}

async function axioscall(url) {
	return await axios
		.get(url)
		.then(function (response) {
			return response.data;
		})
		.catch(function () {
			return false;
		});
}

async function fetchTest() {
	const lines = await filecontenttoarray('list.txt');

	for (let i = 0; i < lines.length; i++) {
		try {
			var gateway = lines[i].trim();

			var checkIPFSr = await axioscall(gateway + checkData);

			if (checkIPFSr.server) {
				console.log(`OK : ${gateway}`);
				okgateways.push(gateway);
			} else {
				console.log(`OK : ${gateway}`);
			}
		} catch (error) {
			console.log(error);
		}
	}
}

(async function runs() {
	await fetchTest();

	// save array to json
	fs.writeFileSync('./dist/list.json', JSON.stringify(okgateways));

	var random = okgateways[Math.floor(Math.random() * okgateways.length)];

	fs.writeFileSync('./dist/random.json', JSON.stringify(random));
})();
