import { Fragment, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom-v5-compat'
import { CatalogCardItemType, ICatalogCard, ItemView } from '../src'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'
import { GreenCheckIcon } from './GreenCheckIcon'

const learnMore = 'https://github.com/stolostron/react-data-view'

export function ControlPlane() {
    const navigate = useNavigate()

    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'hosted',
                title: 'Hosted',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description:
                            'Run OpenShift in a hyperscale manner with many control planes hosted on a central hosting service cluster.',
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Features',
                        icon: <GreenCheckIcon />,
                        items: [
                            { text: 'Better hardware utilization', help: 'Popover example' },
                            { text: 'Network and trusted segmentation between control plane and workers' },
                            { text: 'Rapid cluster creation' },
                        ],
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Available cluster types',
                        icon: <GreenCheckIcon />,
                        items: [{ text: 'Hosted cluster' }],
                    },
                ],
                learnMore,
                onClick: () => navigate(RouteE.Hosted),
            },
            {
                id: 'standalone',
                title: 'Standalone',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Run an OpenShift cluster with dedicated control planes nodes.',
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Features',
                        icon: <GreenCheckIcon />,
                        items: [
                            { text: 'Increased resiliency with multiple masters' },
                            { text: 'Isolation of workload creates secure profile' },
                            { text: 'Dedicated control plane nodes' },
                        ],
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Available cluster types',
                        icon: <GreenCheckIcon />,
                        items: [{ text: 'ACM Hub' }, { text: 'Hosting service cluster' }],
                    },
                ],
                learnMore,
                onClick: () => alert('Standalone'),
            },
        ]
        return cards
    }, [navigate])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(
        () => [{ label: 'Home', to: RouteE.Home }, { label: 'Infrastructure', to: RouteE.Infrastructure }, { label: 'Control Plane' }],
        []
    )

    const onBack = useCallback(() => navigate(RouteE.Infrastructure), [navigate])

    return (
        <Fragment>
            <PageHeader
                title="Control Plane"
                titleHelp="Example popup help"
                description="Choose a control plane type for your cluster."
                breadcrumbs={breadcrumbs}
            />
            <ItemView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} onBack={onBack} />
        </Fragment>
    )
}
