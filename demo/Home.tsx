import { Fragment, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { DataView, ICatalogCard } from '../src'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

export function Home() {
    const history = useHistory()

    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'demo',
                title: 'Data View Demo',
                onClick: () => history.push(RouteE.Demo),
            },
            {
                id: 'infrastructure',
                title: 'Create infrastucture',
                onClick: () => history.push(RouteE.Infrastructure),
            },
        ]
        return cards
    }, [history])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(() => [{ label: 'Home' }], [])

    return (
        <Fragment>
            <PageHeader
                title="React Data View"
                description="A react component for viewing data as a table or catalog card view."
                breadcrumbs={breadcrumbs}
            />
            <DataView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} />
        </Fragment>
    )
}
