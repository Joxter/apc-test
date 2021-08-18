#Technical assignment, Morozov Nikolay

Create single page application that allows to browse GitHub issues.

## Main comands

Basic install `npm install`

To run dev mode build `npm run dev`

To run tests `npm run test`

## Notes

### Folders:

`/UI-components` - dumb components, state features are banned, no logic here

`/pages` - react components which can connect with the state, router and can contain some logic

`/Model`- state (effector), business logic, tests here.
Contains feature-folders which can communicate with each other.
The feature can have its own types and utils. 

Basic feature structure:
`index.ts` is for public API, import from 'model' file possible only for inner tests;
`model.js` for creating units; 
`init.ts` for connections, can't export anything (to prevent cyclic links)

`/Types` - types of whole App, features can have their own types incise their own folders 

`/utils` just utils with tests, please, be careful

**All of it below can be discussed.**

**This code is not perfect but good enough and has a good balance between test-task/quality/time-limit.
I wrote '//todo' comments sometimes for like "better to fix this for production".
A lot of tests, localStorage for bookmarks, aborting requests and other rare cases and features left deliberatelly, just not to waste time before a deadline.**
