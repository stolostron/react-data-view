import { CheckIcon } from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { CatalogCardItemType, CatalogColor, ICatalogCard, ItemView } from '../src'
import { getPatternflyColor, PatternFlyColor } from '../src/components/patternfly-colors'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

export function Home() {
    const history = useHistory()

    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'demo',
                title: 'Item View Demo',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Demo showing an item view with 100,000 items.',
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Features',
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [
                            { text: 'Supports sorting, filtering, and fuzzy searching.' },
                            { text: 'Support table and catalog views.', subTitles: ['First demo subtitle', 'Second demo subtitle'] },
                            {
                                text: 'Horizontal table scrolling with shadows.',
                                subTitles: ['First demo subtitle', 'Second demo subtitle'],
                            },
                            { text: 'Virtual table rensdering for performance.' },
                        ],
                    },
                ],
                badgeList: [
                    {
                        badge: 'Tech Preview',
                        badgeColor: CatalogColor.orange,
                    },
                    {
                        badge: 'CLI Creation',
                        badgeColor: CatalogColor.orange,
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
                        items: [
                            {
                                text: 'Catalog views with the table view hidden.',
                                subTitles: ['First demo subtitle', 'Second demo subtitle'],
                            },
                        ],
                    },
                ],
                badge: 'Classic',
                badgeColor: CatalogColor.purple,
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
                title="React Item View"
                description="A react component for viewing items as a table or catalog card view."
                breadcrumbs={breadcrumbs}
            />
            <ItemView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} />
        </Fragment>
    )
}
