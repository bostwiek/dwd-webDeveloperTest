const accountData = {
  '33fb0cb9-b24e-4f11-b16c-ed9055a78459':{
    'createdAt':1005,
    'name':'Player1'
  },
  'e1e4624e-dd90-4009-9fc6-9cad750b8fda':{
    'createdAt':79,
    'name':'Player2'
  },
  '6d0153b1-9522-4a5b-b793-e6185b5e4dbe':{
    'createdAt':'5000',
    'name':'Player3'
  },
  '3d914cd1-5163-4678-b081-053f6a7fbd64':{
    'createdAt':92,
    'name':'Player4'
  },
}

function findBiggestCreatedAt(accountData) {
	let acctInfo = Object.entries(accountData),
			biggestCreatedAt, biggestName;
	for(const [key, value] of acctInfo) {
		let currentCreatedAt = parseInt(value.createdAt);
		if(!biggestCreatedAt || currentCreatedAt > biggestCreatedAt) {
			// whenever new biggest number appears, update biggest vars
			biggestName = value.name,	biggestCreatedAt = currentCreatedAt
		};
	}
	console.log(biggestName);
	return biggestName;
}
function findSmallestCreatedAt(accountData) {
	let acctInfo = Object.entries(accountData),
			smallestCreatedAt, smallestName;
	for(const [key, value] of acctInfo) {
		let currentCreatedAt = parseInt(value.createdAt);
		if(!smallestCreatedAt || smallestCreatedAt > currentCreatedAt) {
			// whenever new smallest number appears, update smallest vars
			smallestName = value.name, smallestCreatedAt = currentCreatedAt
		};
	}
	return smallestName;
}

function sortCreatedAt(accountData) {
	let acctArr = [], sortedIds = [];
	// create new array populated with objects containing all account properties
	for(const [key, value] of Object.entries(accountData)) {
		let acctValues = Object.values(accountData[key]);
		acctArr.push({ id: key, createdAt: parseInt(acctValues[0]), name: acctValues[1] });
	}
	// sort that array by createdAt asc, push the IDs tied to the order to a new Array and return
	acctArr
		.sort((a, b) => a.createdAt - b.createdAt)
		.forEach((acct) => sortedIds.push(acct.id));
	// if this was supposed to return sorted NAME instead of ID, replace push with acct.name
	return sortedIds;
}

sortCreatedAt(accountData);
