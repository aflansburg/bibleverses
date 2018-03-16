### bibleverses

##### Simple wrapper for bible.org's API (json response)

Usage is very simple.

Install:
```npm install bibleverses --save```


```
const bibleverses = require('bibleverses');
bibleverses.retrievePassage('John 1: 1-3');
```

Note that, for some reason, requests for more than 3 verses will still only return 3 verses.

Output:
```
1: In the beginning was the Word, and the Word was with God, and the Word was God. 2: The same was in the beginning with God. 3: All things were made by him; and without him was not any thing made that was made.
```

###### Contributions and PRs welcome.

