import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import { SheetsRegistry } from 'jss'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#fff'
    }
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
