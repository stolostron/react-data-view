import { CheckIcon } from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { CatalogCardItemType, ICatalogCard, ItemView } from '../src'
import { getPatternflyColor, PatternFlyColor } from '../src/components/patternfly-colors'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

const learnMore = 'https://github.com/stolostron/react-data-view'

export function ControlPlane() {
    const history = useHistory()

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
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [
                            { text: 'Better hardware utilization', help: 'Popover example' },
                            { text: 'Network and trusted segmentation between control plane and workers' },
                            { text: 'Rapid cluster creation' },
                        ],
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Available cluster types',
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [{ text: 'Hosted cluster' }],
                    },
                ],
                learnMore,
                onClick: () => history.push(RouteE.Hosted),
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
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [
                            { text: 'Increased resiliency with multiple masters' },
                            { text: 'Isolation of workload creates secure profile' },
                            { text: 'Dedicated control plane nodes' },
                        ],
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: 'Available cluster types',
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [{ text: 'ACM Hub' }, { text: 'Hosting service cluster' }],
                    },
                ],
                learnMore,
                onClick: () => alert('Standalone'),
            },
        ]
        return cards
    }, [history])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(
        () => [{ label: 'Home', to: RouteE.Home }, { label: 'Infrastructure', to: RouteE.Infrastructure }, { label: 'Control Plane' }],
        []
    )

    const onBack = useCallback(() => history.push(RouteE.Infrastructure), [history])

    return (
        <Fragment>
            <PageHeader
                title="Control Plane"
                titleHelp="Example popup help"
                description="Next, select a control plane type for your on-premise machine."
                breadcrumbs={breadcrumbs}
            />
            <ItemView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} onBack={onBack} />
        </Fragment>
    )
}
