/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, books) {
    let results = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    books.forEach(book => {
        book.Content.forEach(content => {
            if (content.Text.includes(searchTerm)) {
                results.Results.push({
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line
                });
            }
        });
    });
    return results;
}


/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Since we are not using a testing framework, like Jest, I define a basic function to 
 * run our tests with in plain JS. 
 */
function runTest(testName, actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(testName + ": Passed");
    } else {
        console.error(testName + ": Failed", { expected: expected, actual: actual });
    }
}

// Positive Test
let books = [{
    "Title": "Sample Book",
    "ISBN": "1234567890",
    "Content": [{
        "Page": 1,
        "Line": 1,
        "Text": "This is a sample text."
    }]
}];
let result = findSearchTermInBooks("sample", books);
runTest("Positive Test", 1, result.Results.length);

// Negative Test
result = findSearchTermInBooks("nonexistent", books);
runTest("Negative Test", 0, result.Results.length);

// Case-Sensitive Test
result = findSearchTermInBooks("Sample", books);
runTest("Case-Sensitive Test", 0, result.Results.length);

// Empty array of books
let emptyBooks = [];
let resultForEmptyBooks = findSearchTermInBooks("any", emptyBooks);
let expectedOutputForEmptyBooks = {
    "SearchTerm": "any",
    "Results": []
};
runTest("Empty Book List Test", resultForEmptyBooks, expectedOutputForEmptyBooks);

// Book list with one book, no scanned content
let bookWithNoContent = [{
    "Title": "Empty Content Book",
    "ISBN": "1112223334",
    "Content": []
}];
let resultForNoContent = findSearchTermInBooks("text", bookWithNoContent);
let expectedOutputForNoContent = {
    "SearchTerm": "text",
    "Results": []
};
runTest("Book With No Scanned Content Test", resultForNoContent, expectedOutputForNoContent);


// Multiple books, some with scanned content
let mixedBooks = [{
    "Title": "Book With Content",
    "ISBN": "5556667778",
    "Content": [{
        "Page": 1,
        "Line": 1,
        "Text": "This book has content."
    }]
}, {
    "Title": "Book Without Content",
    "ISBN": "9998887776",
    "Content": []
}];
let resultForMixedBooks = findSearchTermInBooks("content", mixedBooks);
let expectedOutputForMixedBooks = {
    "SearchTerm": "content",
    "Results": [{
        "ISBN": "5556667778",
        "Page": 1,
        "Line": 1
    }]
};
runTest("Mixed Content Books Test", resultForMixedBooks, expectedOutputForMixedBooks);
