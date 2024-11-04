# Forms Collator for velut (obsolete)

https://www.duncanritchie.co.uk/velut-forms-collator/

I used this for my [Latin rhyming dictionary, velut](https://github.com/DuncanRitchie/velut). It simply converts a column of words (where each word has a list of the lemmata that it is a form of) to a Json object of lemmata (where each lemma has a list of its forms).

It has a webpage for a user-interface for demo purposes. For the brief time I was using the Collator, I would copy data from the velut Excel file into a text file, then run collator.js in Node. This contains hardcoded filepaths to read the input data from and write output data to.

_If you’re not me, you’re unlikely to have much use for the Forms Collator.
And I no longer use it myself, since I no longer use Excel for velut._

The Forms Collator is similar in structure to my [Word Data Generator](https://github.com/DuncanRitchie/velut-word-data-generator), but a lot simpler in function.

## Input

Each line of input must be a word, whitespace, and the space-separated list of lemmata. For example:

```txt
Latīnus	Latīnus[prn] Latīnus[adj]
Latīna	Latīnus[adj]
Latīnum	Latīnus[prn] Latīnus[adj]
Latīnī	Latīnus[prn] Latīnus[adj]
Latīnae	Latīnus[adj]
Latīnō	Latīnus[prn] Latīnus[adj]
Latīnīs	Latīnus[prn] Latīnus[adj]
Latīnam	Latīnus[adj]
Latīnōs	Latīnus[prn] Latīnus[adj]
Latīnās	Latīnus[adj]
Latīnā	Latīnus[adj]
Latīne	Latīnus[prn] Latīnus[adj]
Latīnōrum	Latīnus[prn] Latīnus[adj]
Latīnārum	Latīnus[adj]
```

(In velut I use brackets to disambiguate between lemmata that are the same except for their parts of speech. For example, the word <i lang="la">Latīnus</i> is form of the proper noun <i lang="la">Latīnus</i> and the adjective <i lang="la">Latīnus</i>, etc.)

There is a “Load sample” button to give you more examples.

## Output

The example above gives this output:

```json
{
	"Latīnus[prn]": [
		"Latīnus",
		"Latīnum",
		"Latīnī",
		"Latīnō",
		"Latīnīs",
		"Latīnōs",
		"Latīne",
		"Latīnōrum"
	],
	"Latīnus[adj]": [
		"Latīnus",
		"Latīna",
		"Latīnum",
		"Latīnī",
		"Latīnae",
		"Latīnō",
		"Latīnīs",
		"Latīnam",
		"Latīnōs",
		"Latīnās",
		"Latīnā",
		"Latīne",
		"Latīnōrum",
		"Latīnārum"
	]
}
```

## Context

Although the velut website uses a MongoDB database, and the Forms Collator produces Json data that could go into a MongoDB database, I privately have a large Excel file that I used for generating and storing the data in velut.
Excel was what I knew when I first got interested in coding, but it’s far from ideal for this sort of thing.

I have a long-term project of converting my Excel file into websites and scripts that are easier to share and maintain.
This includes a script (the [Inflector](https://github.com/DuncanRitchie/velut-inflector)) that receives a list of lemmata and produces all the inflected forms.
To test that the Inflector generates all the forms that I had in Excel, I needed to convert the Excel data into a format more readable for the Inflector.
That’s what the Forms Collator did.

I don’t need it anymore because I’m no longer editing the data in Excel.

For more information, see the [About section](https://www.duncanritchie.co.uk/velut-forms-collator/#about) of the webpage.

## Quick links

- [velut website](https://www.velut.co.uk)
- [My personal website](https://www.duncanritchie.co.uk)
