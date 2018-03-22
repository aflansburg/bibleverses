const request = require('request-promise-native');
const api_key = 'KvreiLEYou3I0gBDWrCDMIk3nnmXy899AZAiBR2g';
const striptags = require('striptags');

function matchVerseString(passage){
    const passageRegex = /(\d \w+|\D+)\s(\d+:\d+-\d+|\d+:\d+)/i;
    let passageResults = passageRegex.exec(passage);

    if (passageResults && passageResults.length > 2){
        return [passageResults[1], passageResults[2]]
    }
    else {
        throw `Error: Verse argument ${passage} did not match standard verse notation`;
    }
}

async function retrievePassage(passage, version, timeout){
    let ver = 'eng-KJV';
    let tOut = 7500;
    if (version){
        ver = version;
    }
    if (timeout){
        tOut = timeout;
    }
    try {
        let searchPassage = matchVerseString(passage);

        let options = {
            uri: `https://${api_key}@bibles.org/v2/passages.json?q[]=${searchPassage[0]}+${searchPassage[1]}&version=${ver}`,
            timeout: tOut
        };

        return await request(options)
            .then(res => {
                const verseDigitRegex = /(\d+)[a-z]/gi;
                const verseDigitAlphaSplit = /(\d+)([a-z])/i;
                try {
                    let passageText = striptags(JSON.parse(res).passages[0].text);
                    let matches = passageText.match(verseDigitRegex);
                    matches.forEach(m => {
                        let vAlphaSplits = m.match(verseDigitAlphaSplit);
                        passageText = passageText
                            .replace(vAlphaSplits[1], vAlphaSplits[1] + ': ');
                    });
                    return passageText;
                }
                catch (e){
                    return `Requested passage not found in the ${version}. Check your passage and version!`
                }

            })
            .catch(err =>{
                if (err.message === 'Error: ESOCKETTIMEDOUT'){
                    return 'Request timed out. Check your passage and version or try again!';
                }
                else {
                    // name,message,cause,error,options,response
                    return 'An error occured. Full error details: \n\t\t' + err.message;

                }
            })
    }
    catch (e){
        console.log(e);
    }
}

async function listVersions(language){
    try {
        let options = {
            uri: `https://${api_key}@bibles.org/v2/versions.js`
        };
        return await request(options)
            .then(res => {
                try {
                    let versionData = JSON.parse(res).response.versions;
                    if (language){
                        let matched_lang_versions = [];
                        versionData.forEach(version => {
                            if (language.toLowerCase() === version.lang_name.toLowerCase() || language.toLowerCase() === version.lang_name_eng.toLowerCase()) {
                                matched_lang_versions.push({
                                    id: version.id,
                                    name: version.name,
                                    lang_name: version.lang_name,
                                    lang_name_eng: version.lang_name_eng
                                });
                            }
                        });
                        if (matched_lang_versions.length > 0){
                            return matched_lang_versions;
                        }
                        else {
                            return 'No matches found for supplied language.'
                        }
                    }
                    else {
                        let all_versions = [];
                        versionData.forEach(version => {
                            all_versions.push({
                                id: version.id,
                                name: version.name,
                                lang_name: version.lang_name,
                                lang_name_eng: version.lang_name_eng
                            });
                        });
                        return all_versions;
                    }
                }
                catch (e) {
                    return 'Error retrieving version list from bibles.org API.\n' + e;
                }
            })
    }
    catch (e){
        console.log(e);
        return "Error retrieving verion list from bibles.org API.";
    }
}

module.exports = {
    retrievePassage, listVersions
};