# Forms Collator for velut

https://www.duncanritchie.co.uk/velut-forms-collator/

I use this for my [Latin rhyming dictionary](https://github.com/DuncanRitchie/velut). It simply converts a column of words (where each word has a list of lemmata) to a Json object of lemmata (where each lemma has a list of words).

It has a webpage for a user-interface for demo purposes. When I refresh all the “words” data in velut, I run collator.js in Node. This contains hardcoded filepaths to read input data from and write output data to.

_If you’re not me, you’re unlikely to have much use for the Forms Collator._

The Forms Collator is similar in structure to my Word Data Generator, but a lot simpler in function.

## Input

Each line of input must be a word, whitespace, and the space-separated list of lemmata. For example:

```txt
vocābulōrum	vocābulum
excellentium	excellēns excellō
```

There is a “Load sample” button to give you more examples.

## Output

The Json generated does not have commas separating the objects, or square brackets around the entire array. This is not the standard Json format, but is the format required by mongoimport (which is the tool my script uses to import into the database).

The example above gives this output:

```json
{
	"vocābulum": [
		"vocābulōrum"
	],
	"excellēns": [
		"excellentium"
	],
	"excellō": [
		"excellentium"
	]
}
```

## Context

Although the velut website uses a MongoDB database, and the Forms Collator produces Json data that could go into a MongoDB database, I privately have a large Excel file for generating and storing the data in velut. Excel was what I knew when I first got interested in coding, but it’s far from ideal for this sort of thing. I have a long-term project of converting my Excel file into websites and webpages that are easier to share and maintain. I’m very much in a transition period of using the Excel file for some things and my newer websites/webpages for others. But the Forms Collator is another step in the process.

For more information, see the [About section](https://www.duncanritchie.co.uk/velut-forms-collator/#about) of the webpage.

## Quick links

- [All the important code](https://github.com/DuncanRitchie/velut-forms-collator/blob/main/collator.js)
- [Tests](https://github.com/DuncanRitchie/velut-forms-collator/blob/main/tests.js) which can be run from the [webpage](https://www.duncanritchie.co.uk/velut-forms-collator/)
- [velut website](https://www.velut.co.uk)
- [My personal website](https://www.duncanritchie.co.uk)
