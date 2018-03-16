const testPassage = 'John 1:1-10';
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

function retrievePassage(passage){

    try {
        let searchPassage = matchVerseString(passage);
        let options = {
            uri: `https://${api_key}@bibles.org/v2/passages.json?q[]=${searchPassage[0]}+${searchPassage[1]}&version=eng-KJV`
        };

        request(options)
            .then(res => {
                console.log(res);
                const verseDigitRegex = /(\d+)[a-z]/gi;
                const verseDigitAlphaSplit = /(\d+)([a-z])/i;
                let passageText = striptags(JSON.parse(res).passages[0].text);
                let matches = passageText.match(verseDigitRegex);
                matches.forEach(m => {
                    let vAlphaSplits = m.match(verseDigitAlphaSplit);
                    passageText = passageText
                        .replace(vAlphaSplits[1], vAlphaSplits[1] + ': ');
                });
                console.log(passageText);
            })
            .catch(err =>{
                console.log(err);
            })
    }
    catch (e){
        console.log(e);
    }
}

module.exports = {
    retrievePassage
};