import {
  Logger,
  LoggerConfiguration
} from './logger'

const errMsg: string = 'This is testing error'
const myErr: Error = new Error(errMsg)
const context: string = 'testError'
const extraData: unknown = {
  name: 'John Doe',
  age: 26,
  male: true,
  contact: [
    {
      type: 'home',
      address: '50/45 Nhat Chi Mai st, w.13, dist.TB, HCM ct',
      phone: '0933200894',
      people: [
        'Jane',
        'Smith',
        'Steve'
      ]

    },
    {
      type: 'work',
      address: '414 Cong Hoa st, w.13, dist.TB, HCM ct',
      phone: '0933200894',
      people: [
        'Jane',
        'Smith',
        'Steve'
      ]
    }
  ],
  languages: [
    'English',
    'Vietnamese',
    'Japanese'
  ]
}
const loggerConfig: LoggerConfiguration = {
  verbose: false,
  timestamp: true,
  color: true,
  showHidden: false,
  depth: true
}

const logger: Logger = Logger.getInstance(loggerConfig)

logger.info(
  errMsg,
  context
)

logger.warn(
  errMsg,
  context,
  extraData
)

logger.error(
  errMsg,
  myErr,
  context
)

Logger.info(
  errMsg + ' from static',
  context,
  extraData,
  {
    ...loggerConfig,
    showData: true
  }
)
