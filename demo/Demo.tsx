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
    Truncate,
} from '@patternfly/react-core'
import { BarsIcon } from '@patternfly/react-icons'
import { BrowserRouter, Link, useHistory, useLocation } from 'react-router-dom'
import { useWindowSizeOrLarger, WindowSize } from '../src'
import { ThemeSwitcher } from '../src/Theme'
import { ControlPlane } from './ControlPlane'
import { DataViewDemo } from './DataViewDemo'
import { Home } from './Home'
import { Hosted } from './Hosted'
import { Infrastructure } from './Infrastructure'
import { RouteE } from './route'

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
    const history = useHistory()
    switch (location.search) {
        case RouteE.Home:
            return <Home />
        case RouteE.Demo:
            return <DataViewDemo />
        case RouteE.Infrastructure:
            return <Infrastructure />
        case RouteE.ControlPlane:
            return <ControlPlane />
        case RouteE.Hosted:
            return <Hosted />
        default:
            history.push(RouteE.Home)
            return <div />
    }
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
                    <MastheadBrand>
                        <Title headingLevel="h2" style={{ color: 'white' }}>
                            <Truncate content="Stolostron / React Data View" />
                        </Title>
                    </MastheadBrand>
                </MastheadMain>
            ) : (
                <MastheadMain>
                    <MastheadBrand>
                        <Title headingLevel="h2" style={{ color: 'white' }}>
                            <Truncate content="Data View" />
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
        <PageSidebar
            nav={
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
            }
        />
    )
}
