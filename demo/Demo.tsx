import {
    Masthead,
    MastheadBrand,
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
import { BarsIcon } from '@patternfly/react-icons'
import { BrowserRouter, Link, useLocation, Navigate } from 'react-router-dom-v5-compat'
import { useWindowSizeOrLarger, WindowSize } from '../src'
import { ThemeSwitcher } from '../src/Theme'
import { ControlPlane } from './ControlPlane'
import { Home } from './Home'
import { Hosted } from './Hosted'
import { Infrastructure } from './Infrastructure'
import { ItemViewDemo } from './ItemViewDemo'
import { RouteE } from './route'
import { Truncate } from '../src/components/Truncate'

export default function Demo() {
    return (
        <BrowserRouter>
            <Page
                header={<DemoHeader />}
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
    const isSmallOrLarger = useWindowSizeOrLarger(WindowSize.sm)
    return (
        <Masthead display={{ default: 'inline' }}>
            <MastheadToggle>
                <PageToggleButton variant="plain" aria-label="Global navigation">
                    <BarsIcon />
                </PageToggleButton>
            </MastheadToggle>
            {isSmallOrLarger ? (
                <MastheadMain>
                    <MastheadBrand component="a">
                        <Title headingLevel="h2" style={{ color: 'white' }}>
                            <Truncate content="Stolostron / React Item View" />
                        </Title>
                    </MastheadBrand>
                </MastheadMain>
            ) : (
                <MastheadMain>
                    <MastheadBrand component="a">
                        <Title headingLevel="h2" style={{ color: 'white' }}>
                            <Truncate content="Item View" />
                        </Title>
                    </MastheadBrand>
                </MastheadMain>
            )}
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
                            <Link to={RouteE.Infrastructure}>Hyershift Demo</Link>
                        </NavItem>
                    </NavList>
                </Nav>
            </PageSidebarBody>
        </PageSidebar>
    )
}
