//Remember to add .env to .gitignore

REACT_APP_QUIZ_CONTRACT_ADDR = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'
REACT_APP_ACCOUNT_ADD_PREFIX = '0x70a08231000000000000000000000000'

declare global {
  interface Window {
    ethereum: any
  }
}
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_QUIZ_CONTRACT_ADDR: string
    REACT_APP_ACCOUNT_ADD_PREFIX: string
  }
}
