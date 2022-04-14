const axios = require('axios')

const getTerms = async () => {
    try {
        return await axios.get('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json')
    } catch (err) {
        console.error(err)
    }
}

const getClasses = async (term_code) => {
    try {
        const url = `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/${term_code}.json`
        return await axios.get(url)
    } catch (err) {
        console.error(err)
    }
}