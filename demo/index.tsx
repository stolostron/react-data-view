import '@patternfly/react-core/dist/styles/base.css'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { themeInit, ThemeProvider } from '../src/Theme'
import Demo from './Demo'

themeInit()

const root = document.createElement('div')
document.body.appendChild(root)
render(
    <StrictMode>
        <ThemeProvider>
            <Demo />
        </ThemeProvider>
    </StrictMode>,
    root
)
