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

const allTestData = [[sampleData, outputFromSample]]


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
