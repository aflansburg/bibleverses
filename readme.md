### bibleverses

#### Simple wrapper for bible.org's API (json response)

Written using ES6 syntax and available features. Uses `request-promise-native`.

Usage is very simple.

Install:
```npm install bibleverses --save```

`retrievePassage` returns a Promise.

Example:
```
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

*Note that, for some reason, requests for more than 3 verses will still only return 3 verses.

**This is currently using my bibles.org API key - which should not be an issue as authentication is single-step.

###### Contributions and PRs welcome.

