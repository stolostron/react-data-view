import { CheckIcon } from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { CatalogCardItemType, DataView, ICatalogCard } from '../src'
import { getPatternflyColor, PatternFlyColor } from '../src/components/patternfly-colors'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

export function Home() {
    const history = useHistory()

    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'demo',
                title: 'Data View Demo',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Demo showing a data view with 100,000 items.',
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Features',
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [
                            { text: 'Supports sorting, filtering, and fuzzy searching.' },
                            { text: 'Support table and catalog views.' },
                            { text: 'Horizontal table scrolling with shadows.' },
                            { text: 'Virtual table rensdering for performance.' },
                        ],
                    },
                ],
                onClick: () => history.push(RouteE.Demo),
            },
            {
                id: 'infrastructure',
                title: 'Create Infrastucture',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Demo showing a catalog flow for creating Kubernetes clusters on infrastructure providers.',
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Features',
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [{ text: 'Catalog views with the table view hidden.' }],
                    },
                ],
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
