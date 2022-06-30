import '@patternfly/react-core/dist/styles/base.css'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from '../src/Theme2'
import Demo from './Demo'

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
