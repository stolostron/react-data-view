import { Breadcrumb, BreadcrumbItem, Button, PageSection, Popover, Split, SplitItem, Content, Title } from '@patternfly/react-core'
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons'
import { Fragment, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom-v5-compat'
import { useWindowSizeOrLarger, WindowSize } from './components/useBreakPoint'

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
                        color: breadcrumb.to ? 'var(--pf-t--global--text--color--link--default)' : undefined,
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
    return (
        <div
            style={{
                borderBottom: '1px solid var(--pf-t--global--border--color--default)',
                backgroundColor: 'var(--pf-t--global--background--color--primary--default)', // Same as cards for consistent color
            }}
        >
            <Split>
                <SplitItem isFilled>
                    {(title || breadcrumbs) && (
                        <PageSection
                            hasBodyWrapper={false}
                            style={{
                                backgroundColor: 'transparent',
                                paddingBottom: navigation
                                    ? isXlOrLarger
                                        ? 'var(--pf-t--global--spacer--sm)'
                                        : 'var(--pf-t--global--spacer--xs)'
                                    : undefined,
                            }}
                        >
                            {breadcrumbs !== undefined && (
                                <div
                                    style={{
                                        paddingBottom: isXlOrLarger ? 'var(--pf-t--global--spacer--sm)' : 'var(--pf-t--global--spacer--xs)',
                                        marginTop: '-6px',
                                    }}
                                >
                                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                                </div>
                            )}
                            {title && (
                                <Title headingLevel="h1">
                                    {title}
                                    {props.titleHelp && (
                                        <Popover headerContent={props.titleHelpTitle} bodyContent={props.titleHelp}>
                                            <Button
                                                icon={<OutlinedQuestionCircleIcon />}
                                                variant="link"
                                                style={{
                                                    padding: 0,
                                                    marginLeft: 'var(--pf-t--global--spacer--sm)',
                                                    verticalAlign: 'middle',
                                                }}
                                            ></Button>
                                        </Popover>
                                    )}
                                </Title>
                            )}
                            {description && (
                                <Content component="p" style={{ opacity: 0.85, paddingTop: 'var(--pf-t--global--spacer--xs)' }}>
                                    {description}
                                </Content>
                            )}
                        </PageSection>
                    )}
                    {navigation && <div style={{ paddingLeft: isXlOrLarger ? 'var(--pf-t--global--spacer--sm)' : 0 }}>{navigation}</div>}
                </SplitItem>
                {actions && (
                    <SplitItem>
                        <PageSection
                            hasBodyWrapper={false}
                            style={{ backgroundColor: 'transparent', height: '100%', display: 'flex', alignItems: 'end' }}
                        >
                            {actions}
                        </PageSection>
                    </SplitItem>
                )}
            </Split>
        </div>
    )
}
