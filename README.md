# js-interview-test
A JavaScript problem to solve before interviews.

[![API Doc](https://doclets.io/atsolberg/js-interview-test/master.svg)](https://doclets.io/atsolberg/js-interview-test/master)

### Convert an array of `Persons` objects to a tree of `PersonTreeNode` objects.

## TO SETUP
- Clone the repo.
- Open `index.html` in your browser.
- Open `js/Person.js`, `js\PersonTreeNode.js`, and `js/answer.js` in your favorite editor.
- Add your code to the `generateTree` function in `answer.js`.

## SOLVING THE TEST
- The test uses two JavaScript classes `Person` and `PersonTreeNode`.
- The `generateTree` function recieves a list of `Person` objects and should return the root `PersonTreeNode` (the ceo).
- Each `PersonTreeNode`'s `directReports` array should contain a `PersonTreeNode` for each direct report of that person (someone who reports directly for you, i.e. you are their manager).
- The app will use your `generateTree` function to see if passes the test.
- Refresh the page or click the button to rerun the test.
