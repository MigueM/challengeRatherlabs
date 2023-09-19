//Remember to add .env to .gitignore

declare global {
  interface Window {
    ethereum: any
  }
}
declare namespace NodeJS {
  interface ProcessEnv {
    QUIZ_TOKEN_ADDR: string
  }
}

QUIZ_TOKEN_ADDR = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'
