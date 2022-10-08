////
//// This file is used from the HTML page, or can be run by itself in Node.
//// It has a section at the end that only runs in Node.
//// The Node-only section reads from a hardcoded filepath, writes to a second
//// hardcoded filepath, and compares the output to a third hardcoded filepath.
////
//// Contents:
//// - Functions for building the output Json
//// - Node-only code
////



////
//// Functions for building the output Json:
////

//// `outputAsArray` gets modified by `convertInputToOutputData` inside `generateJson`
//// and either gets displayed in the second text-area by `displayOutput` (in web.js)
//// or gets written to a file (in the Node-only section).
let outputAsObject = {};

const addToOutput = (word, lemmataAsString) => {
	const lemmata = `${lemmataAsString}`.split(/\s+/);
	for (const lemma of lemmata) {
		if (outputAsObject[lemma]) {
			outputAsObject[lemma].push(word);
		}
		else {
			outputAsObject[lemma] = [word];
		}
	}
};

const convertInputToOutputData = (allInputRows) => {
	outputAsObject = {}; // Clear the output in case there’s anything from previous runs.
	const countRows = allInputRows.length;

	//// For each line of values in the input...
	for (let i = 0; i < countRows; i++) {
		//// Skip empty lines.
		if (allInputRows[i] === '') {
			continue;
		}

		const inputRow = allInputRows[i].trim();
		//// The first appearance of whitespace in the row is where the split is between the word & lemmata.
		const positionOfWordLemmataSplit = /\s/.exec(inputRow)?.index;

		if (positionOfWordLemmataSplit) {
			const word = inputRow.substring(0, positionOfWordLemmataSplit).trim();
			const lemmataAsString = inputRow.substring(positionOfWordLemmataSplit).trim();

			addToOutput(word, lemmataAsString);
		} else {
			console.error(
				`Parsing error: Cannot pull a word and lemmata out of ${inputRow}`
			);
		}
	}
	return outputAsObject;
};


////
//// TO DO: MAKE THIS MAKE SENSE FOR THE FORMS COLLATOR.
//// Code that only runs in Node:
//// (Divided into functions for easier commenting-out when debugging.)
////

// if (typeof require !== 'undefined') {

// 	const fs = require('fs');

// 	const runAllWords = () => {

// 		//// Input data look like "vocābulōrum\tvocābulum\rexcellentium\texcellēns excellō\r"
// 		const inputFileUrl =
// 			'C:/Users/Duncan Ritchie/Documents/Code/velutSideAssets/Excel/words/velut-words-word-and-lemmata.txt';
// 		//// Output data are generated in batches & each batch is written to a file.
// 		//// This allows me to track the output in Git without tracking a huge file.
// 		const getOutputFileUrlForBatch = (batchNumber) =>
// 			`C:/Users/Duncan Ritchie/Documents/Code/velutSideAssets/Json/words-from-generator_mongo_batch${batchNumber}.json`;
// 		const batchSize = 50_000;
// 		//// The output batches are concatenated into one file, for Git to ignore and me to import to MongoDB.
// 		const outputFileUrl =
// 			'C:/Users/Duncan Ritchie/Documents/Code/velutSideAssets/Json/words-from-generator_mongo.json';
// 		//// For regression testing, I have a file of expected output, that the actual output is compared against.
// 		const expectedOutputFileUrl =
// 			'C:/Users/Duncan Ritchie/Documents/Code/velutSideAssets/Json/expected-words_mongo.json';

// 		try {
// 			let batchFilepaths = [];

// 			const generateOutputAndSaveInBatches = () => {
// 				console.time('generatingOutput');

// 				const data = fs.readFileSync(inputFileUrl, 'utf8');
// 				const inputRows = data.split('\n');

// 				//// Eg [1,2,3,4,5,6,7], 2 => [[1,2],[3,4],[5,6],[7]]
// 				// from https://stackoverflow.com/a/54029307
// 				const splitArrayIntoBatches = (array, size) =>
// 					array.length > size
// 						? [array.slice(0, size), ...splitArrayIntoBatches(array.slice(size), size)]
// 						: [array];
// 				const inputRowsBatched = splitArrayIntoBatches(inputRows, batchSize);

// 				let outputRowsBatched = [];
// 				inputRowsBatched.forEach((batch, index, array) => {
// 					const outputBatch = convertInputToOutputData(batch);
// 					outputRowsBatched.push([...outputBatch]);
// 				});

// 				batchFilepaths = outputRowsBatched
// 					.map((batch, _) => batch.join('\n'))
// 					.map((batch, batchNumber) => {
// 						const filepath = getOutputFileUrlForBatch(batchNumber)
// 						fs.writeFileSync(filepath, batch);
// 						return filepath;
// 					});
// 				console.log('Output all data! See your file at ' + outputFileUrl + ' or ' + batchFilepaths);

// 				console.timeEnd('generatingOutput');
// 			}

// 			const concatenateBatches = () => {
// 				console.time('concatenatingOutput');

// 				let output = '';
// 				batchFilepaths.forEach(filename => {
// 					output += fs.readFileSync(filename, 'utf8') + '\n';
// 				})
// 				fs.writeFileSync(outputFileUrl, output);

// 				console.timeEnd('concatenatingOutput');
// 			}

// 			const checkAgainstExpected = () => {
// 				console.time('checkingOutput');

// 				const outputRows = fs.readFileSync(outputFileUrl, 'utf8').split('\n');

// 				const expectedOutput = fs.readFileSync(expectedOutputFileUrl, 'utf8');
// 				const expectedOutputRows = expectedOutput.split('\n');

// 				let errorCount = 0;
// 				let lastWordSeen = '';
// 				for (
// 					let i = 0;
// 					i < outputRows.length && i < expectedOutputRows.length;
// 					i++
// 				) {
// 					if (outputRows[i].startsWith('"Word":')) {
// 						lastWordSeen = outputRows[i];
// 					}

// 					if (outputRows[i] === expectedOutputRows[i]) {
// 						// console.log('Yay!');
// 					} else {
// 						// if (
// 						// 	// !outputRows[i].startsWith('"Scansion"')
// 						// 	!lastWordSeen.startsWith('"Word": "coic') &&
// 						// 	!lastWordSeen.startsWith('"Word": "caelit') &&
// 						// 	!lastWordSeen.startsWith('"Word": "coiēns"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "conlātaque"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "deiēns"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "dein"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "deinde"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "hymenaeus"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "ignōrātiō') &&
// 						// 	!lastWordSeen.startsWith('"Word": "introiēns"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "iūsiūrandum"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "īnspectemque"') &&
// 						// 	!lastWordSeen.startsWith('"Word": "nūmin') &&
// 						// 	!lastWordSeen.includes('nf') &&
// 						// 	!lastWordSeen.includes('ifer') &&
// 						// 	!lastWordSeen.includes('iger') &&
// 						// 	!outputRows[i].startsWith('"LemmaCount"') &&
// 						// 	!outputRows[i].startsWith('"IsFitForDactyl"') &&
// 						// 	!outputRows[i].startsWith('"Uncompounded"')
// 						// 	// !outputRows[i].startsWith('"RhymeConsonants"')
// 						// ) {
// 						errorCount++;
// 						console.error({
// 							message: `Mismatch at line ${i}`,
// 							excelSays: expectedOutputRows[i],
// 							javascriptSays: outputRows[i],
// 							for: lastWordSeen,
// 						});
// 						// }
// 					}
// 				}
// 				console.warn(`There were ${errorCount} mismatches.`);

// 				console.timeEnd('checkingOutput');
// 			};

// 			generateOutputAndSaveInBatches();
// 			concatenateBatches();
// 			checkAgainstExpected();

// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};

// 	runAllWords();
// }
