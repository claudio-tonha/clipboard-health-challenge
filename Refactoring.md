# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
First of all, I created the unit tests to make sure I didn't change any existing functionality. Then I verified what was duplicated and created a common function to generate the hash. I also noticed that the TRIVIAL PARTITION KEY was returned when some conditions were false. So I put it as the initial value of the candidate. The verification of the candidate length was also redundant in some cases, because its value wasn't assigned when the event was null/undefined. So I started to check for candidate value after checking if the event has value. In the end, I decided to return the generated hash after checking for the absence of the partition key. In this way, the unique else in the code wasn't necessary anymore.