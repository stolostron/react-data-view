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

export function Hypershift() {
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
                onClick: () => null,
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
                onClick: () => null,
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
                onClick: () => null,
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
                onClick: () => null,
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
                onClick: () => null,
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
                onClick: () => null,
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
                onClick: () => null,
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
                onClick: () => null,
            },
        ]
        return cards
    }, [])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(() => [{ label: 'Home', to: RouteE.Home }, { label: 'Infrastructure' }], [])

    const history = useHistory()
    const onBack = useCallback(() => history.push(RouteE.Home), [history])

    return (
        <Fragment>
            <PageHeader title="Infrastructure" description="First, choose your infrastructure provider." breadcrumbs={breadcrumbs} />
            <DataView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} onBack={onBack} />
        </Fragment>
    )
}
