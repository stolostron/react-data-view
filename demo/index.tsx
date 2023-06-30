import '@patternfly/react-core/dist/styles/base.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { themeInit, ThemeProvider } from '../src/Theme'
import Demo from './Demo'

themeInit()

const div = document.createElement('div')
document.body.appendChild(div)
const root = createRoot(div)

root.render(
    <StrictMode>
        <ThemeProvider>
            <Demo />
        </ThemeProvider>
    </StrictMode>
)
