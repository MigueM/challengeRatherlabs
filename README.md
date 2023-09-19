Challenge Brief
A survey company wants to make a new quiz form that rewards users with tokens for participating in
the survey.
They create surveys, loading them into JSON format and they want you to develop a responsive web
application using React and TypeScript for people to answer and submit the results, getting tokens
in the process.

Requirements:
● Vite, Parcel or Next.js for the front end infrastructure, taking into account the
architecture of the project hierarchy and organization of directories, routing, conventions
and good practices of clean code, good design patterns for the app itself but also for the
react components.
● For the app state use React Query (preferred), Contexts or Mobx State Tree.
● Material UI or Tailwind for components.
● Add a descriptive “Readme” file, it should also include links to any resources or
documentation used to solve the challenge and a description about the implementation
of the solution.
The web should behave as follows:
● Connect a Metamask wallet
● Ensure user is connected to Goerli, if not show a button to auto switch networks.
● Show balance of $QUIZ token (address below).
● Once the page is loaded, present the title of the daily trivia with its picture and a button that
allows you to begin answering.
● Once the survey starts, display the current question, which will be available for the amount of
seconds in the lifetimeSeconds property.
● Answered or not it should move onto the next question.
● Once all the questions are finished, show an overview with all the answers.
● Show a button to submit the questions to the validator contract
● Refresh the balance of $QUIZ
