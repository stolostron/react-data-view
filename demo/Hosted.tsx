import { Fragment, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom-v5-compat'
import { CatalogCardItemType, ICatalogCard, ItemView } from '../src'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

const learnMore = 'https://github.com/stolostron/react-data-view'

export function Hosted() {
    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'use-existing-hosts',
                title: 'Use existing hosts',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Create a cluster from hosts that have been discovered and made available in your host inventory.',
                    },
                ],
                learnMore,
                onClick: () => alert('Use existing hosts'),
            },
            {
                id: 'discover-new-hosts',
                title: 'Discover new hosts',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Discover new hosts while creating the cluster without an existing host inventory.',
                    },
                ],
                learnMore,
                onClick: () => alert('Discover new hosts'),
            },
        ]
        return cards
    }, [])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(
        () => [
            { label: 'Home', to: RouteE.Home },
            { label: 'Infrastructure', to: RouteE.Infrastructure },
            { label: 'Control Plane', to: RouteE.ControlPlane },
            { label: 'Hosts' },
        ],
        []
    )

    const navigate = useNavigate()
    const onBack = useCallback(() => navigate(RouteE.ControlPlane), [navigate])

    return (
        <Fragment>
            <PageHeader title="Hosts" description="Choose an option based on your hosts." breadcrumbs={breadcrumbs} />
            <ItemView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} onBack={onBack} />
        </Fragment>
    )
}
