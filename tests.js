const buttonTest = document.getElementById('test');

//// Data to use in tests:

const outputFromSample = {
	"vocābulum": [
		"vocābulōrum"
	],
	"excellēns": [
		"excellentium"
	],
	"excellō": [
		"excellentium"
	],
	"Latīnus[prn]": [
		"Latīnōrum"
	],
	"Latīnus[adj]": [
		"Latīnōrum"
	],
	"ūtilis": [
		"ūtilēs"
	],
	"tabula": [
		"tabulae"
	]
}

const latinusSample = `
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
`

const outputFromLatinusSample = {
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

const allTestData = [
	[sampleData, outputFromSample],
	[latinusSample, outputFromLatinusSample],
]


//// Tests looping over the above arrays:

const testAllFunctions = () => {
	for (const inputAndExpectedOutput of allTestData) {
		const input = inputAndExpectedOutput[0];
		const expectedOutput = inputAndExpectedOutput[1];
		const actualOutput = convertInputToOutputData(input.split('\n'));

		if (expectedOutput === undefined) {
			console.warn(`Expected output hasn’t been defined — ${JSON.stringify(sampleData)} => ${JSON.stringify(actualOutput)}`);
		}
		else if (JSON.stringify(actualOutput) === JSON.stringify(expectedOutput)) {
			console.log(`Yay! Output is as expected — ${JSON.stringify(sampleData)} => ${JSON.stringify(expectedOutput)}`);
		}
		else {
			console.error({input, expected: expectedOutput, actual: actualOutput});
		}
	}
}

//// Event-listener:

buttonTest.addEventListener('click', ()=>{
	testAllFunctions();
});
