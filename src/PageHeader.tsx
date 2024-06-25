import { Breadcrumb, BreadcrumbItem, Button, PageSection, Popover, Split, SplitItem, Text, Title } from '@patternfly/react-core'
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons'
import { Fragment, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom-v5-compat'
import { useWindowSizeOrLarger, WindowSize } from './components/useBreakPoint'
import { ThemeE, useTheme } from './Theme'

export interface ICatalogBreadcrumb {
    id?: string
    label: string
    to?: string
    target?: string
    component?: React.ElementType
}

function Breadcrumbs(props: { breadcrumbs: ICatalogBreadcrumb[] }) {
    const navigate = useNavigate()
    if (!props.breadcrumbs) return <Fragment />
    return (
        <Breadcrumb>
            {props.breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                    id={breadcrumb.id}
                    key={breadcrumb.id ?? breadcrumb.label}
                    component={breadcrumb.component}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick={breadcrumb.to ? () => navigate(breadcrumb.to!) : undefined}
                    style={{
                        color: breadcrumb.to ? 'var(--pf-v5-c-breadcrumb__link--Color)' : undefined,
                        cursor: breadcrumb.to ? 'pointer' : undefined,
                    }}
                    isActive={breadcrumb.to === undefined}
                >
                    {breadcrumb.label}
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}

export function PageHeader(props: {
    breadcrumbs?: ICatalogBreadcrumb[]
    title?: string
    titleHelpTitle?: string
    titleHelp?: ReactNode
    description?: string
    navigation?: ReactNode
    actions?: ReactNode
}) {
    const { breadcrumbs, title, description, navigation, actions } = props
    const isXlOrLarger = useWindowSizeOrLarger(WindowSize.xl)
    const [theme] = useTheme()
    return (
        <div
            style={{
                borderBottom: 'thin solid var(--pf-v5-global--BorderColor--100)',
                backgroundColor:
                    theme === ThemeE.Dark ? 'var(--pf-v5-global--BackgroundColor--300)' : 'var(--pf-v5-global--BackgroundColor--100)',
            }}
        >
            <Split>
                <SplitItem isFilled>
                    {(title || breadcrumbs) && (
                        <PageSection
                            style={{ backgroundColor: 'transparent', paddingBottom: navigation ? (isXlOrLarger ? 8 : 4) : undefined }}
                        >
                            {breadcrumbs !== undefined && (
                                <div style={{ paddingBottom: isXlOrLarger ? 8 : 6, marginTop: -6 }}>
                                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                                </div>
                            )}
                            {title && (
                                <Title headingLevel="h1">
                                    {title}
                                    {props.titleHelp && (
                                        <Popover headerContent={props.titleHelpTitle} bodyContent={props.titleHelp}>
                                            <Button
                                                variant="link"
                                                style={{
                                                    padding: 0,
                                                    marginLeft: '8px',
                                                    verticalAlign: 'middle',
                                                }}
                                            >
                                                <OutlinedQuestionCircleIcon />
                                            </Button>
                                        </Popover>
                                    )}
                                </Title>
                            )}
                            {description && (
                                <Text component="p" style={{ opacity: 0.85, paddingTop: 2 }}>
                                    {description}
                                </Text>
                            )}
                        </PageSection>
                    )}
                    {navigation && <div style={{ paddingLeft: isXlOrLarger ? 8 : 0 }}>{navigation}</div>}
                </SplitItem>
                {actions && (
                    <SplitItem>
                        <PageSection style={{ backgroundColor: 'transparent', height: '100%', display: 'flex', alignItems: 'end' }}>
                            {actions}
                        </PageSection>
                    </SplitItem>
                )}
            </Split>
        </div>
    )
}
