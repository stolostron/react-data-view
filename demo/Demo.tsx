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
} from '@patternfly/react-core'
import { BarsIcon } from '@patternfly/react-icons'
import { BrowserRouter, Link, useHistory, useLocation } from 'react-router-dom'
import { ThemeSwitcher } from '../src/theme'
import { DataViewDemo } from './DataViewDemo'
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
                {/* <PageSection variant="darker" style={{ borderTop: 'thin solid var(--pf-global--BorderColor--100)' }}>
                    dsdsd
                </PageSection> */}
            </Page>
        </BrowserRouter>
    )
}

export function DemoRouter(): JSX.Element {
    const location = useLocation()
    const history = useHistory()
    switch (location.search) {
        case RouteE.Catalog:
            return <DataViewDemo />

        default:
            history.push(RouteE.Catalog)
            return <div />
    }
}

function DemoHeader() {
    return (
        <Masthead display={{ default: 'inline' }}>
            <MastheadToggle>
                <PageToggleButton variant="plain" aria-label="Global navigation">
                    <BarsIcon />
                </PageToggleButton>
            </MastheadToggle>
            <MastheadMain>
                <MastheadBrand>
                    <Title headingLevel="h2" style={{ color: 'white' }}>
                        Solostron PatternFly Extensions
                    </Title>
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
        <PageSidebar
            nav={
                <Nav>
                    <NavList>
                        <NavItem isActive={location.search === RouteE.Catalog}>
                            <Link to={RouteE.Catalog}>Data View</Link>
                        </NavItem>
                    </NavList>
                </Nav>
            }
        />
    )
}
