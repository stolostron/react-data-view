import { Breadcrumb, BreadcrumbItem, PageSection, Stack, Text, Title } from '@patternfly/react-core'
import { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useWindowSizeOrLarger, WindowSize } from './components/useBreakPoint'

export interface ICatalogBreadcrumb {
    id?: string
    label: string
    to?: string
    target?: string
    component?: React.ElementType
}

function Breadcrumbs(props: { breadcrumbs: ICatalogBreadcrumb[] }) {
    const history = useHistory()
    if (!props.breadcrumbs) return <Fragment />
    return (
        <Breadcrumb>
            {props.breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                    id={breadcrumb.id}
                    key={breadcrumb.id ?? breadcrumb.label}
                    component={breadcrumb.component}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick={breadcrumb.to ? () => history.push(breadcrumb.to!) : undefined}
                    style={{
                        color: breadcrumb.to ? 'var(--pf-c-breadcrumb__link--Color)' : undefined,
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

export function PageHeader(props: { breadcrumbs?: ICatalogBreadcrumb[]; title?: string; description?: string }) {
    const { breadcrumbs, title, description } = props
    const isXlOrLarger = useWindowSizeOrLarger(WindowSize.xl)
    return (
        <Fragment>
            {(title || breadcrumbs) && (
                <PageSection variant="light" style={{ paddingBottom: 0 }}>
                    <Stack>
                        {breadcrumbs !== undefined && (
                            <div style={{ paddingBottom: isXlOrLarger ? 8 : 6, marginTop: -6 }}>
                                <Breadcrumbs breadcrumbs={breadcrumbs} />
                            </div>
                        )}
                        {title && <Title headingLevel="h2">{title}</Title>}
                        {description && (
                            <Text component="p" style={{ opacity: 0.9 }}>
                                {description}
                            </Text>
                        )}
                    </Stack>
                </PageSection>
            )}
        </Fragment>
    )
}
