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

// const classes_spring =
// getClasses(2222)
// .then(val => console.log(val.data));
// console.log(classes_spring)


// Make a function that returns all the classes in the specfied
// format
//
const databaseBuilder = (classJson) => {
  // gets a full json and parses it
  // makes arrays out of those
  // [ string, number, string, string, json, json ]
  //
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
  //    console.log(classJson)
  // eslint-disable-next-line guard-for-in

  for (const key in classJson) {
    // console.log(key);
    // console.log(classJson[key]);
    // console.log(typeof classJson[key]);
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
    //    console.log(`${child.n} ${child.c}`)
       // design a json object 
       var jsonObj = {
           "location" : child.loct
       }
       const classInfoArray = [child.n, child.num, key, child.c, jsonObj]
       console.log(classInfoArray)
        // return
    })
    // break;
    // for (const childKey in key) {
        // console.log(childKey);
    //   console.log(classJson.jsonData[key][childKey]);
    //   for (const childValue in classJson.jsonData[key][childKey]) {
    //     console.log(classJson.jsonData[key][childKey][childValue]);
    //   }
    // }
  }
//    const emptyDatabase = classJson.data.map(function (department) {
//     // parse every department
//     const emptyDepartment = department['data'].map(function (class_info) {
//         // now design the array
//         console.log(`${class_info.n} ${class_info.c}`);
//     });
//    });
};

// const classes_spring =
// getClasses(2222)
//   .then((val) => databaseBuilder(val.data));
// console.log(classes_spring)



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
        console.log(dataOfKey)
        break;
       }
    })
}

makeDB()