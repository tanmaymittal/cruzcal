/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
const axios = require('axios');

const getTerms = async () => {
  try {
    return await axios.get('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json');
  } catch (err) {
    console.error(err);
  }
};

const getClasses = async (term_code) => {
  try {
    const url = `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/${term_code}.json`;
    return await axios.get(url);
  } catch (err) {
    console.error(err);
  }
  // within this funcition return arrays
};

// Make a function that returns all the classes in the specfied
// format
const databaseBuilder = (classJson) => {
  /*
    Structure of incoming json
    {
        CSE: [],
        YIDD: [
            {},
            {
                c: '3',
                l: null,
                n: 'First-Year Yiddish',
                s: '01',
                cap: null,
                ins: [Object],
                num: 65065,
                loct: [Array]
            }
        ]
    }
    */
  // eslint-disable-next-line guard-for-in
  const result = []
  for (const key in classJson) {
    // so key is my department name 
    const arr = classJson[key].map (function (child) {
      // console.log(typeof child)
      //  child is a json object of type 
      /*
            {
                c: '3',
                l: null,
                n: 'First-Year Yiddish',
                s: '01',
                cap: null,
                ins: [Object],
                num: 65065,
                loct: [Array]
            }
        */
      var jsonObj = {
        "location" : child.loct
      }
      const classInfoArray = [child.n, child.num, key, child.c, jsonObj]
      result.push(classInfoArray)
    })
  }
  return result
};

// so make a function that first gets all the terms using the term api
// then calls databaseBuilder and get classes. It also adds the data 
// from the term api to the current class
function makeDB () {
  const terms =  getTerms().then((val) => {
    return val.data
  });
  terms.then((val) => {
    // returns an array of the type 
    /*
        [
            {
                code: '2224',
                date: { end: '08/26/22', start: '07/25/22' },
                name: '2022 Summer Quarter'
            },
            {
                code: '2222',
                date: { end: '06/03/22', start: '03/28/22' },
                name: '2022 Spring Quarter'
            },
        ]
        */
    // now loop over this object
    for (const key in val) {
      //    console.log(val[key])
      // run the database function over code of this code
      // console.log(val[key]['code'])
      const dataOfKey = getClasses(val[key]['code']).then((val) => {
        return databaseBuilder(val.data)
      });
      dataOfKey.then((data) => {
        //   console.log(data)
          // data is an array of arrays of the type 
        //   [
            // [ 'Math Methods I', 70071, 'AM', '10', { location: [Array] } ],
            // [ 'Math Methods II', 70312, 'AM', '20', { location: [Array] } ]
        //   ]
          // loop over this array and add the object for the term 
          // of type
        //   {
        //     "code": 2222,
        //     "name": "string",
        //     "date": 
        //     {
        //         "start": "2022-04-12",
        //         "end": "2022-04-12"
        //     }
        //   }
          for (const obj in data) {
              data[obj].push(val[key])
          }
            console.log(data)
      })
    //   console.log(dataOfKey)
    }
  })
}

makeDB();