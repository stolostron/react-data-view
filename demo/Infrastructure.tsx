import {
    AmazonIcon,
    AzureIcon,
    CloudIcon,
    GoogleIcon,
    OpenstackIcon,
    RedhatIcon,
    ServerIcon,
    VirtualMachineIcon,
} from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { CatalogCardItemType, DataView, ICatalogCard } from '../src'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

const learnMore = 'https://github.com/stolostron/react-data-view'

export function Infrastructure() {
    const history = useHistory()
    const cards = useMemo(() => {
        const cards: ICatalogCard[] = [
            {
                id: 'aws',
                icon: <AmazonIcon />,
                title: 'Amazon Web Services',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'An OpenShift cluster in your AWS account that uses the ACM multicloud API.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'baremetal',
                icon: <ServerIcon />,
                title: 'Bare Metal',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'An OpenShift cluster running in a bare metal environment in you on-premises data center.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'alibaba',
                icon: <CloudIcon />,
                title: 'Alibaba',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'An OpenShift cluster running in your ALIBABA subscription that uses the ACM multicloud API.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                // onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'google',
                icon: <GoogleIcon />,
                title: 'Google',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'An OpenShift cluster running in your Google Cloud subscription that uses the ACM multicloud API.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'azure',
                icon: <AzureIcon />,
                title: 'Microsoft Azure',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'An OpenShift cluster running in your Azure subscription that uses the ACM multicloud API.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'openstack',
                icon: <OpenstackIcon />,
                title: 'OpenStack',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Create and manage your clusters hosted on virtual machines.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'rhv',
                icon: <RedhatIcon />,
                title: 'RHV',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'Create and manage your clusters hosted on virtual machines.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
            {
                id: 'vsphere',
                icon: <VirtualMachineIcon />,
                title: 'VSphere',
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: 'An OpenShift cluster running in a vSphere environment in your on-premises data center.',
                    },
                ],
                labels: ['Saved credentials'],
                learnMore,
                onClick: () => history.push(RouteE.ControlPlane),
            },
        ]
        return cards
    }, [history])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(() => [{ label: 'Home', to: RouteE.Home }, { label: 'Infrastructure' }], [])

    const onBack = useCallback(() => history.push(RouteE.Home), [history])

    return (
        <Fragment>
            <PageHeader title="Infrastructure" description="First, choose your infrastructure provider." breadcrumbs={breadcrumbs} />
            <DataView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} onBack={onBack} />
        </Fragment>
    )
}
