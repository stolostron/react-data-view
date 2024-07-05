import { Fragment, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom-v5-compat'
import { CatalogCardItemType, CatalogColor, ICatalogCard, ItemView } from '../src'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'
import { GreenCheckIcon } from './GreenCheckIcon'

export function Home() {
    const navigate = useNavigate()

    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'demo',
                title: 'Item View Demo',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Demo showing an item view with 1,000 items.',
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Features',
                        icon: <GreenCheckIcon />,
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
                onClick: () => navigate(RouteE.Demo),
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
                        icon: <GreenCheckIcon />,
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
                onClick: () => navigate(RouteE.Infrastructure),
            },
        ]
        return cards
    }, [navigate])

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
