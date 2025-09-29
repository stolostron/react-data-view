import {
    Masthead,
    MastheadBrand,
    MastheadLogo,
    MastheadContent,
    MastheadMain,
    MastheadToggle,
    Nav,
    NavItem,
    NavList,
    Page,
    PageSidebar,
    PageToggleButton,
    Title,
    PageSidebarBody,
} from '@patternfly/react-core'

import { BrowserRouter, Link, useLocation, Navigate } from 'react-router-dom-v5-compat'
import { useWindowSizeOrLarger, WindowSize } from '../src'
import { ThemeSwitcher, useTheme, ThemeE } from '../src/Theme'
import { ControlPlane } from './ControlPlane'
import { Home } from './Home'
import { Hosted } from './Hosted'
import { Infrastructure } from './Infrastructure'
import { ItemViewDemo } from './ItemViewDemo'
import { RouteE } from './route'
import './demo.css'

export default function Demo() {
    return (
        <BrowserRouter>
            <Page
                masthead={<DemoHeader />}
                sidebar={<DemoSidebar />}
                isManagedSidebar
                defaultManagedSidebarIsOpen={false}
                style={{ height: '100vh' }}
            >
                <DemoRouter />
            </Page>
        </BrowserRouter>
    )
}

export function DemoRouter(): JSX.Element {
    const location = useLocation()
    if (location.search.startsWith(RouteE.Home)) return <Home />
    if (location.search.startsWith(RouteE.Demo)) return <ItemViewDemo />
    if (location.search.startsWith(RouteE.Infrastructure)) return <Infrastructure />
    if (location.search.startsWith(RouteE.ControlPlane)) return <ControlPlane />
    if (location.search.startsWith(RouteE.Hosted)) return <Hosted />
    return <Navigate to={{ search: RouteE.Home }} />
}

function DemoHeader() {
    const isSmallOrLarger = useWindowSizeOrLarger(WindowSize.xs)
    const [theme] = useTheme()
    const textColor = theme === ThemeE.Dark ? 'white' : '#151515'

    return (
        <Masthead display={{ default: 'inline' }}>
            <MastheadMain className="demo-masthead-main">
                <MastheadToggle>
                    <PageToggleButton isHamburgerButton variant="plain" aria-label="Global navigation" className="demo-toggle-button" />
                </MastheadToggle>
                <MastheadBrand>
                    <MastheadLogo>
                        <Title headingLevel="h2" className="demo-title" style={{ color: textColor }}>
                            {isSmallOrLarger ? 'Stolostron / React Item View' : 'Item View'}
                        </Title>
                    </MastheadLogo>
                </MastheadBrand>
            </MastheadMain>
            <MastheadContent>
                <span style={{ flexGrow: 1 }} />
                <ThemeSwitcher />
            </MastheadContent>
        </Masthead>
    )
}

function DemoSidebar() {
    const location = useLocation()
    return (
        <PageSidebar>
            <PageSidebarBody>
                <Nav>
                    <NavList>
                        <NavItem isActive={location.search === RouteE.Demo}>
                            <Link to={RouteE.Demo}>Data View</Link>
                        </NavItem>
                        <NavItem isActive={location.search === RouteE.Infrastructure}>
                            <Link to={RouteE.Infrastructure}>Hypershift Demo</Link>
                        </NavItem>
                    </NavList>
                </Nav>
            </PageSidebarBody>
        </PageSidebar>
    )
}
