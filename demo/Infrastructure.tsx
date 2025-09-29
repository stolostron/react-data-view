import { Button } from '@patternfly/react-core'
import {
    AmazonIcon,
    AzureIcon,
    CloudIcon,
    ExternalLinkAltIcon,
    GoogleIcon,
    OpenstackIcon,
    RedhatIcon,
    ServerIcon,
    VirtualMachineIcon,
} from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom-v5-compat'
import { CatalogCardItemType, CatalogColor, ICatalogCard, ItemView } from '../src'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

const learnMore = 'https://github.com/stolostron/react-data-view'

export function Infrastructure() {
    const navigate = useNavigate()
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
                badge: 'Technology preview',
                badgeColor: CatalogColor.orange,
                badgeTooltip: 'Technology preview description goes here.',
                badgeTooltipTitle: 'Technology preview',
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                // onClick: () => history.push(RouteE.ControlPlane),
                alertTitle: 'Operator must be enabled in order to continue',
                alertVariant: 'info',
                alertContent: (
                    <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="right" isInline href=".">
                        View documentation
                    </Button>
                ),
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
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
                labels: [{ label: 'Saved credentials', color: CatalogColor.green }],
                learnMore,
                onClick: () => navigate(RouteE.ControlPlane),
            },
        ]
        return cards
    }, [navigate])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(() => [{ label: 'Home', to: RouteE.Home }, { label: 'Infrastructure' }], [])

    const onBack = useCallback(() => navigate(RouteE.Home), [navigate])
    const onCancel = useCallback(() => navigate(RouteE.Home), [navigate])

    return (
        <Fragment>
            <PageHeader title="Infrastructure" description="First, choose your infrastructure provider." breadcrumbs={breadcrumbs} />
            <ItemView items={cards} itemKeyFn={keyFn} itemToCardFn={(card) => card} onBack={onBack} onCancel={onCancel} />
        </Fragment>
    )
}
