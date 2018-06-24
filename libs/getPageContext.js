import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'

const theme = createMuiTheme({
  spacing: {
    unit: 16
  }
})

const createPageContext = () => ({
  theme,
  sheetsManager: new Map(),
  sheetsRegistry: new SheetsRegistry(),
  generateClassName: createGenerateClassName()
})

export default () => {
  if (!process.browser) {
    return createPageContext()
  }

  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext()
  }

  return global.__INIT_MATERIAL_UI__
}
