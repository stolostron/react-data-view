import '@patternfly/react-core/dist/styles/base.css'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { initTheme } from '../src/theme'
import Demo from './Demo'
import '@patternfly/patternfly/patternfly-theme-dark.css'

initTheme()

const root = document.createElement('div')
document.body.appendChild(root)
render(
    <StrictMode>
        <Demo />
    </StrictMode>,
    root
)
