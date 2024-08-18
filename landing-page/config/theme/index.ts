import { createTheme as createMuiTheme, Theme } from '@mui/material/styles'
import typography from './typography'
import paletteBase from './palette-base'
import paletteLight from './palette-light'
import paletteDark from './palette-dark'

// default
const createTheme = (darkMode?: boolean): Theme => {
  const palette = darkMode ? { ...paletteBase, ...paletteDark } : { ...paletteBase, ...paletteLight }
  return createMuiTheme({
    palette,
    typography,
  })
}

const theme = createTheme(false)

export { paletteBase, paletteLight, paletteDark, typography }
export default theme
