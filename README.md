# RatherLabs Frontend Challenge

A survey company wants to make a new quiz form that rewards users with tokens for participating in the survey. They create surveys, loading them into JSON format and they want you to develop a responsive web application using React and TypeScript for people to answer and submit the results, getting tokens in the process.

**Project Requirements:**

- Vite, Parcel or Next.js for the front end infrastructure, taking into account the architecture of the project hierarch and organization of directories, routing, conventions and good practices of clean code, good design patterns for the app itself but also for the react components.
- For the app state use React Query (preferred), Contexts or Mobx State Tree.
- Material UI or Tailwind for components.
- Add a descriptive “Readme” file, it should also include links to any resources or documentation used to solve the challenge and a description about the implementation of the solution.

**Features:**

- Connect with MetaMask

- Complete surveys

- Update survey results to a validator smart contract

- Obtain $QUIZ tokens

**Tech stack:**

- Next.js

- Material UI

- TypeScript

- Ethers.js

**Usage:**

1. Intall or login to MetaMask wallet.

2. Connect your MetaMask wallet to the Goerli testnet.

3. Load quiz form.

4. Click the "Start Survey" button.

5. Answer the survey questions.

6. Click the "Submit Survey" button.

7. Claim your $QUIZ tokens.

**Requirements:**

- MetaMask wallet

**Screenshots:**

[Screenshot of web application]

## Development notes

**Environment variables:**

- `REACT_APP_QUIZ_CONTRACT_ADDR`: The address of the QUIZ smart contract.

- `REACT_APP_ACCOUNT_ADD_PREFIX`: The prefix to add to user account addresses on certain calls.

**Context variables:**

**`wallet`:** This context variable contains the user's wallet information, including their account addresses, balance, and chain ID. This information is used throughout the application to provide information about the user's wallet and to interact with the QuizValidator smart contract.

**`hasProvider`:** This context variable is used to determine whether the user has a MetaMask provider installed. If the user does not have a MetaMask provider installed, they will not be able to use your application.

**`error: !!errorMessage`:** This context variable is used to determine whether there is an error message stored in the `errorMessage` context variable. If there is an error message, the value of this context variable will be `true`. Otherwise, the value of this context variable will be `false`.

**`errorMessage`:** This context variable is used to display error messages to the user. If the user encounters an error while using your application, the error message will be stored in this context variable.

**`isConnecting`:** This context variable is used to indicate whether the user is currently connecting to MetaMask. If the user is connecting to MetaMask, they will not be able to interact with your application until the connection is complete.

**`surveyData`:** This context variable contains the survey data that is used to display the survey form to the user.

**`connectMetaMask`:** This context variable is a function that can be used to connect the user's MetaMask wallet to your application.

**`clearError`:** This context variable is a function that can be used to clear the error message stored in the `errorMessage` context variable.

**`changeToGoerlyNetwork`:** This context variable is a function that can be used to switch the user's MetaMask wallet to the Goerli testnet.

**`addQuizToken`:** This context variable is a function that can be used to add the QUIZ token to the user's MetaMask wallet.

**`submitSurvey`:** This context variable is a function that can be used to submit the user's survey results to the QuizValidator smart contract.

## Useful links:

- Next.js documentation: https://nextjs.org/docs: The Next.js documentation provides information on how to use Next.js to build web applications.

- MetaMask documentation: https://docs.metamask.io: This documentation provides information on how to use MetaMask to connect to the Ethereum blockchain and interact with decentralized applications.

- TypeScript documentation: https://www.typescriptlang.org/docs/: The TypeScript documentation provides information on how to use TypeScript to write type-safe JavaScript code.

- Ethers.js documentation: https://docs.ethers.io/v5/: The Ethers.js documentation provides information on how to use Ethers.js to interact with the Ethereum blockchain.

- Material Design UI documentation: https://m2.material.io/design: This documentation provides information on the Material Design UI design system and how to use it to create user interfaces.

- Goetly ETH Faucet: https://testnet-faucet.com/goerli/: This website that provides free testnet tokens to Ethereum developers for testing smart contracts and decentralized applications.

- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/: This is a lightweight convention for writing commit messages that makes it easier to understand the changes made in a codebase.

- Gitmoji: https://gitmoji.dev/: Like Conventional Commits this is a convention that makes it easier to understand the type of change.

- Supplyed Links:
  -- [Smart contract](https://goerli.etherscan.io/token/0x437eF217203452317C3C955Cf282b1eE5F6aaF72?a=0x437ef217203452317c3c955cf282b1ee5f6aaf72)
  -- [blockchain-challenge-utils](https://github.com/rather-labs/blockchain-challenge-utils)

**Author:**

Miguel Molina

https://github.com/MigueM - https://www.linkedin.com/in/miguel-molina-7143b61b5/