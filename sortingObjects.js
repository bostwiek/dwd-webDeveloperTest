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
  let acctInfo = Object.entries(accountData), biggestCreatedAt;
  for(const [key, value] of acctInfo) {
    let currentCreatedAt = parseInt(value.createdAt);
    if(!biggestCreatedAt || currentCreatedAt > biggestCreatedAt) {
      // whenever new biggest number appears, update biggestCreatedAt
      biggestCreatedAt = currentCreatedAt
    };
  }
  return biggestCreatedAt;
}

function findSmallestCreatedAt(accountData) {
  let acctInfo = Object.entries(accountData), smallestCreatedAt;
  for(const [key, value] of acctInfo) {
    let currentCreatedAt = parseInt(value.createdAt);
    if(!smallestCreatedAt || smallestCreatedAt > currentCreatedAt) {
      // whenever new smallest number appears, update smallestCreatedAt
      smallestCreatedAt = currentCreatedAt
    };
  }
  return smallestCreatedAt;
}

function sortCreatedAt(accountData) {
  let acctArr = [], newArr = [], newObj = {};
	// loop through objects, and populate new array with date and id
	for (const [key, value] of Object.entries(accountData)) {
    let acctValues = Object.values(accountData[key]);
    acctArr.push({ id: key, createdAt: parseInt(acctValues[0]) });
  }
  // sort new array by createdAt, build new Object with original object key & return
  acctArr
    .sort((a, b) => a.createdAt - b.createdAt)
    .forEach((e, i)=>{
      newObj[e.id] = accountData[e.id];
      newArr.push(e.id)
    });
  // return newArr returns array of sorted IDs,
  //  return newObj returns rebuilt object of all accounts, in order
  return newArr;
}

sortCreatedAt(accountData);
