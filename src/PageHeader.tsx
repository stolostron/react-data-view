import { Breadcrumb, BreadcrumbItem, PageSection, Stack, Text, Title } from '@patternfly/react-core'
import { Fragment, useMemo } from 'react'
import { useWindowSizeOrLarger, WindowSize } from './components/useBreakPoint'

export interface ICatalogBreadcrumb {
    id?: string
    label: string
    to?: string
    target?: string
    component?: React.ElementType
}

export function PageHeader(props: { breadcrumbs?: ICatalogBreadcrumb[]; title?: string; description?: string }) {
    const { breadcrumbs: breadcrumb, title, description } = props
    const isXlOrLarger = useWindowSizeOrLarger(WindowSize.xl)

    const breadcrumbs = useMemo(() => {
        if (!props.breadcrumbs) return <Fragment />
        return (
            <Breadcrumb>
                {props.breadcrumbs.map((breadcrumb) => (
                    <BreadcrumbItem
                        id={breadcrumb.id}
                        key={breadcrumb.id ?? breadcrumb.label}
                        to={breadcrumb.to}
                        target={breadcrumb.target}
                        component={breadcrumb.component}
                    >
                        {breadcrumb.label}
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        )
    }, [props.breadcrumbs])

    const header = useMemo(
        () => (
            <Fragment>
                {(title || breadcrumb) && (
                    <PageSection variant="light" style={{ paddingBottom: 0 }}>
                        <Stack>
                            {breadcrumb !== undefined && (
                                <div style={{ paddingBottom: isXlOrLarger ? 8 : 6, marginTop: -6 }}>{breadcrumbs}</div>
                            )}
                            {title && <Title headingLevel="h2">{title}</Title>}
                            {description && (
                                <Text component="p" style={{ opacity: 0.8 }}>
                                    {description}
                                </Text>
                            )}
                        </Stack>
                    </PageSection>
                )}
            </Fragment>
        ),
        [breadcrumb, breadcrumbs, description, isXlOrLarger, title]
    )

    return header
}
