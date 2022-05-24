import { Breadcrumb, BreadcrumbItem, PageSection, Stack, Title } from '@patternfly/react-core'
import { Fragment, useMemo } from 'react'
import { useWindowSizeOrLarger, useWindowSizeOrSmaller, WindowSize } from './components/useBreakPoint'

export interface ICatalogBreadcrumb {
    id?: string
    label: string
    to?: string
    target?: string
    component?: React.ElementType
}

export function PageHeader(props: { breadcrumbs?: ICatalogBreadcrumb[]; title?: string }) {
    const isXlOrLarger = useWindowSizeOrLarger(WindowSize.xl)
    const isXs = useWindowSizeOrSmaller(WindowSize.xs)
    const { breadcrumbs: breadcrumb, title } = props

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
                        <Stack hasGutter>
                            {isXlOrLarger && breadcrumb && breadcrumbs}
                            {title && <Title headingLevel="h2">{title}</Title>}
                        </Stack>
                    </PageSection>
                )}
            </Fragment>
        ),
        [breadcrumb, breadcrumbs, isXlOrLarger, title]
    )

    if (isXs) {
        return <Fragment />
    }
    return header
}
