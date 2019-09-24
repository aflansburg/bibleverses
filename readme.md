# bibleverses - Simple wrapper for bible.org
[![Build Status](https://travis-ci.org/aflansburg/bibleverses.svg?branch=master)](https://travis-ci.org/aflansburg/bibleverses)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://nodejs.org/en/)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Usage

Super simple usage.

Install:
```
npm install bibleverses --save
```

_retrievePassage()_ returns a Promise.

###### Example - retrieve a passage of Scripture:
```
const bibleverses = require('bibleverses');

bibleverses.retrievePassage('John 1:1-3')
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    });
```

Output:
```
1: In the beginning was the Word, and the Word was with God, and the Word was God. 2: The same was in the beginning with God. 3: All things were made by him; and without him was not any thing made that was made.
```

## Table of contents
- [Usage](#usage)
- [Timeout](#timeout)
- [Versions](#versions)
- [_listVersions()_ method](#listversions)
- [Languages](#languages)
- [Notes](#notes)

## Timeout

I list timeout early on in the readme as there are times when the response times from Bibles.org are a bit longer than expected.

By default the timeout is set to 7500ms. If issues arise, try increasing this timeout.

You may provide a third argument to _retrievePassage()_ to specifiy a specific timeout. Upon timeout you will receive an error message as depicted in the output below.

##### Example - Timeout argument provided
```
bibleverses.retrievePassage('Juan 3:16', 'spa-RVR1960', 5000)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });

```

Timeout error output:
```
Request timed out. Check your passage and version or try again!
```


## Versions

`retrievePassage()` requires at least the first argument, which is the book, chapter, and verse in the standard notation `Book CHAPTER:VERSE`

You may also pass a [language+version code](#listversions) such as `eng-KJV` (which is the default) to the method.

###### Example - retrieve passage from 'Biblia Reina Valera 1960' en Español:
```
bibleverses.retrievePassage('Juan 3:16', 'spa-RVR1960')
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
```
[back to top](#table-of-contents)

## _listVersions_

With the listVersions() method you may retrieve a list of all version/languages available from Bibles.org as an array.

_Omitting_ the argument will list all versions across all languages.

###### Example - retrieve all available language+versions for Español:
```
bibleverses.listVersions('Español')
    .then(response => {
        if (Array.isArray(response)){
            response.forEach(r => {
                console.log(r);
            })
        }
        else {
            console.log(response);
        }
    })
    .catch(err => {
        console.log(err);
    });
```

JSON Output:
```
{ id: 'spa-RVR1960',
  name: 'Biblia Reina Valera 1960',
  lang_name: 'Español',
  lang_name_eng: 'Spanish' }
```
[back to top](#table-of-contents)

## Notes

- For some reason, requests for more than 3 verses will still only return 3 verses. This may be a feature of the API.
- This is currently using my bibles.org API key - which should not be an issue as authentication is single-step.
I will add support at a later date for utilizing your own API key.

## Languages

List of languages retrieved from [bibles.org/versions](https://bibles.org/versions/)

See [languages.json](https://github.com/aflansburg/bibleverses/blob/master/languages.json) for current Bibles.org language support.

This list may be incomplete. I plan to utilize the Bibles.org built in API method for listing versions in the near future.

[back to top](#table-of-contents)

