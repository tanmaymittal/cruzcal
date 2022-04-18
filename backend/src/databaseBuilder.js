const axios = require('axios')

export const getTerms = async () => {
    try {
        return await axios.get('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json')
    } catch (err) {
        console.error(err)
    }
}

export const getClasses = async (term_code) => {
    try {
        const url = `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/${term_code}.json`
        return await axios.get(url)
    } catch (err) {
        console.error(err)
    }
}

// const classes_spring = 
getClasses(2222)
.then(val => console.log(val.data));
// console.log(classes_spring)


// Make a function that returns all the classes in the specfied 
// format 
//
