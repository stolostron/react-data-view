import { ButtonVariant } from '@patternfly/react-core'
import { CheckCircleIcon, CircleNotchIcon, ExclamationCircleIcon, GitAltIcon } from '@patternfly/react-icons'
import { Fragment, useCallback, useMemo, useState } from 'react'
import {
    CatalogCardItemType,
    CopyCell,
    getPatternflyColor,
    ICatalogCard,
    IItemFilter,
    ITableColumn,
    ItemView,
    IToolbarAction,
    PatternFlyColor,
    SinceCell,
    TextCell,
    ToolbarActionType,
} from '../src'
import { IItemAction } from '../src/ItemActions'
import { PageHeader } from '../src/PageHeader'
import { RouteE } from './route'

export interface Related {
    created_by: string
    modified_by: string
    last_job: string
    teams: string
    playbooks: string
    inventory_files: string
    update: string
    project_updates: string
    scm_inventory_sources: string
    schedules: string
    activity_stream: string
    notification_templates_started: string
    notification_templates_success: string
    notification_templates_error: string
    access_list: string
    object_roles: string
    copy: string
    organization: string
    last_update: string
    credential?: string
}

export interface Organization {
    id: number
    name: string
    description: string
}

export interface LastJob {
    id: number
    name: string
    description: string
    finished: string
    status: string
    failed: boolean
}

export interface LastUpdate {
    id: number
    name: string
    description: string
    status: string
    failed: boolean
}

export interface CreatedBy {
    id: number
    username: string
    first_name: string
    last_name: string
}

export interface ModifiedBy {
    id: number
    username: string
    first_name: string
    last_name: string
}

export interface AdminRole {
    description: string
    name: string
    id: number
}

export interface UseRole {
    description: string
    name: string
    id: number
}

export interface UpdateRole {
    description: string
    name: string
    id: number
}

export interface ReadRole {
    description: string
    name: string
    id: number
}

export interface ObjectRoles {
    admin_role: AdminRole
    use_role: UseRole
    update_role: UpdateRole
    read_role: ReadRole
}

export interface UserCapabilities {
    edit: boolean
    delete: boolean
    start: boolean
    schedule: boolean
    copy: boolean
}

export interface Credential {
    id: number
    name: string
    description: string
    kind: string
    cloud: boolean
    kubernetes: boolean
    credential_type_id: number
}

export interface SummaryFields {
    organization: Organization
    last_job: LastJob
    last_update: LastUpdate
    created_by: CreatedBy
    modified_by: ModifiedBy
    object_roles: ObjectRoles
    user_capabilities: UserCapabilities
    credential: Credential
}

export interface IProject {
    id: number
    type: string
    url: string
    related: Related
    summary_fields: SummaryFields
    created: string
    modified: string
    name: string
    description: string
    local_path: string
    scm_type: string
    scm_url: string
    scm_branch: string
    scm_refspec: string
    scm_clean: boolean
    scm_track_submodules: boolean
    scm_delete_on_update: boolean
    credential?: number
    timeout: number
    scm_revision: string
    last_job_run: string
    last_job_failed: boolean
    next_job_run?: any
    status: string
    organization?: number
    scm_update_on_launch: boolean
    scm_update_cache_timeout: number
    allow_override: boolean
    custom_virtualenv?: any
    default_environment?: any
    last_update_failed: boolean
    last_updated: string
}

export interface RootObject {
    count: number
    next?: any
    previous?: any
    results: IProject[]
}

const data: RootObject = {
    count: 5,
    next: null,
    previous: null,
    results: [
        {
            id: 8,
            type: 'project',
            url: '/api/v2/projects/8/',
            related: {
                created_by: '/api/v2/users/2/',
                modified_by: '/api/v2/users/2/',
                last_job: '/api/v2/project_updates/73/',
                teams: '/api/v2/projects/8/teams/',
                playbooks: '/api/v2/projects/8/playbooks/',
                inventory_files: '/api/v2/projects/8/inventories/',
                update: '/api/v2/projects/8/update/',
                project_updates: '/api/v2/projects/8/project_updates/',
                scm_inventory_sources: '/api/v2/projects/8/scm_inventory_sources/',
                schedules: '/api/v2/projects/8/schedules/',
                activity_stream: '/api/v2/projects/8/activity_stream/',
                notification_templates_started: '/api/v2/projects/8/notification_templates_started/',
                notification_templates_success: '/api/v2/projects/8/notification_templates_success/',
                notification_templates_error: '/api/v2/projects/8/notification_templates_error/',
                access_list: '/api/v2/projects/8/access_list/',
                object_roles: '/api/v2/projects/8/object_roles/',
                copy: '/api/v2/projects/8/copy/',
                organization: '/api/v2/organizations/1/',
                last_update: '/api/v2/project_updates/73/',
            },
            summary_fields: {
                organization: { id: 1, name: 'Default', description: '' },
                last_job: {
                    id: 73,
                    name: 'ACM Ansible Collection Demo',
                    description: '',
                    finished: '2022-07-13T20:31:26.611063Z',
                    status: 'successful',
                    failed: false,
                },
                last_update: { id: 73, name: 'ACM Ansible Collection Demo', description: '', status: 'successful', failed: false },
                created_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                modified_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                object_roles: {
                    admin_role: { description: 'Can manage all aspects of the project', name: 'Admin', id: 37 },
                    use_role: { description: 'Can use the project in a job template', name: 'Use', id: 38 },
                    update_role: { description: 'May update the project', name: 'Update', id: 39 },
                    read_role: { description: 'May view settings for the project', name: 'Read', id: 40 },
                },
                user_capabilities: { edit: true, delete: true, start: true, schedule: true, copy: true },
            },
            created: '2022-06-13T03:07:21.096610Z',
            modified: '2022-06-29T01:07:33.116874Z',
            name: 'ACM Ansible Collection Demo',
            description: '',
            local_path: '_8__acm_ansible_collection_demo',
            scm_type: 'git',
            scm_url: 'https://github.com/TheRealHaoLiu/acm-ansible-collection-demo.git',
            scm_branch: 'acm-awx-container-group',
            scm_refspec: '',
            scm_clean: false,
            scm_track_submodules: false,
            scm_delete_on_update: false,
            credential: null,
            timeout: 0,
            scm_revision: 'aa58460983252fb649ac6c1ce54db7bd9a070fd4',
            last_job_run: '2022-07-13T20:31:26.611063Z',
            last_job_failed: false,
            next_job_run: null,
            status: 'successful',
            organization: 1,
            scm_update_on_launch: false,
            scm_update_cache_timeout: 0,
            allow_override: false,
            custom_virtualenv: null,
            default_environment: null,
            last_update_failed: false,
            last_updated: '2022-07-13T20:31:26.611063Z',
        },
        {
            id: 6,
            type: 'project',
            url: '/api/v2/projects/6/',
            related: {
                created_by: '/api/v2/users/2/',
                modified_by: '/api/v2/users/2/',
                last_job: '/api/v2/project_updates/70/',
                teams: '/api/v2/projects/6/teams/',
                playbooks: '/api/v2/projects/6/playbooks/',
                inventory_files: '/api/v2/projects/6/inventories/',
                update: '/api/v2/projects/6/update/',
                project_updates: '/api/v2/projects/6/project_updates/',
                scm_inventory_sources: '/api/v2/projects/6/scm_inventory_sources/',
                schedules: '/api/v2/projects/6/schedules/',
                activity_stream: '/api/v2/projects/6/activity_stream/',
                notification_templates_started: '/api/v2/projects/6/notification_templates_started/',
                notification_templates_success: '/api/v2/projects/6/notification_templates_success/',
                notification_templates_error: '/api/v2/projects/6/notification_templates_error/',
                access_list: '/api/v2/projects/6/access_list/',
                object_roles: '/api/v2/projects/6/object_roles/',
                copy: '/api/v2/projects/6/copy/',
                organization: '/api/v2/organizations/1/',
                last_update: '/api/v2/project_updates/70/',
            },
            summary_fields: {
                organization: { id: 1, name: 'Default', description: '' },
                last_job: {
                    id: 70,
                    name: 'Demo Project',
                    description: '',
                    finished: '2022-07-07T14:26:48.046755Z',
                    status: 'successful',
                    failed: false,
                },
                last_update: { id: 70, name: 'Demo Project', description: '', status: 'successful', failed: false },
                created_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                modified_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                object_roles: {
                    admin_role: { description: 'Can manage all aspects of the project', name: 'Admin', id: 16 },
                    use_role: { description: 'Can use the project in a job template', name: 'Use', id: 17 },
                    update_role: { description: 'May update the project', name: 'Update', id: 18 },
                    read_role: { description: 'May view settings for the project', name: 'Read', id: 19 },
                },
                user_capabilities: { edit: true, delete: true, start: true, schedule: true, copy: true },
            },
            created: '2022-06-13T02:55:59.695671Z',
            modified: '2022-06-13T02:55:59.695701Z',
            name: 'Demo Project',
            description: '',
            local_path: '_6__demo_project',
            scm_type: 'git',
            scm_url: 'https://github.com/ansible/ansible-tower-samples',
            scm_branch: '',
            scm_refspec: '',
            scm_clean: false,
            scm_track_submodules: false,
            scm_delete_on_update: false,
            credential: null,
            timeout: 0,
            scm_revision: '347e44fea036c94d5f60e544de006453ee5c71ad',
            last_job_run: '2022-07-07T14:26:48.046755Z',
            last_job_failed: false,
            next_job_run: null,
            status: 'successful',
            organization: 1,
            scm_update_on_launch: true,
            scm_update_cache_timeout: 0,
            allow_override: false,
            custom_virtualenv: null,
            default_environment: null,
            last_update_failed: false,
            last_updated: '2022-07-07T14:26:48.046755Z',
        },
        {
            id: 131,
            type: 'project',
            url: '/api/v2/projects/131/',
            related: {
                created_by: '/api/v2/users/2/',
                modified_by: '/api/v2/users/2/',
                credential: '/api/v2/credentials/103/',
                last_job: '/api/v2/project_updates/136/',
                teams: '/api/v2/projects/131/teams/',
                playbooks: '/api/v2/projects/131/playbooks/',
                inventory_files: '/api/v2/projects/131/inventories/',
                update: '/api/v2/projects/131/update/',
                project_updates: '/api/v2/projects/131/project_updates/',
                scm_inventory_sources: '/api/v2/projects/131/scm_inventory_sources/',
                schedules: '/api/v2/projects/131/schedules/',
                activity_stream: '/api/v2/projects/131/activity_stream/',
                notification_templates_started: '/api/v2/projects/131/notification_templates_started/',
                notification_templates_success: '/api/v2/projects/131/notification_templates_success/',
                notification_templates_error: '/api/v2/projects/131/notification_templates_error/',
                access_list: '/api/v2/projects/131/access_list/',
                object_roles: '/api/v2/projects/131/object_roles/',
                copy: '/api/v2/projects/131/copy/',
                organization: '/api/v2/organizations/111/',
                last_update: '/api/v2/project_updates/136/',
            },
            summary_fields: {
                organization: {
                    id: 111,
                    name: 'Random organization',
                    description: 'Random organization',
                },
                credential: { id: 103, name: 'asdf', description: '', kind: 'scm', cloud: false, kubernetes: false, credential_type_id: 2 },
                last_job: {
                    id: 136,
                    name: 'Project - DarkWeird',
                    description: 'ChallengeBrotherProduceAngleRecoverSideCreditAspectPartMembership䏁',
                    finished: '2022-07-14T19:02:16.606480Z',
                    status: 'successful',
                    failed: false,
                },
                last_update: {
                    id: 136,
                    name: 'Project - DarkWeird',
                    description: 'ChallengeBrotherProduceAngleRecoverSideCreditAspectPartMembership䏁',
                    status: 'successful',
                    failed: false,
                },
                created_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                modified_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                object_roles: {
                    admin_role: { description: 'Can manage all aspects of the project', name: 'Admin', id: 2301 },
                    use_role: { description: 'Can use the project in a job template', name: 'Use', id: 2302 },
                    update_role: { description: 'May update the project', name: 'Update', id: 2303 },
                    read_role: { description: 'May view settings for the project', name: 'Read', id: 2304 },
                },
                user_capabilities: { edit: true, delete: true, start: true, schedule: true, copy: true },
            },
            created: '2022-07-14T19:02:13.107306Z',
            modified: '2022-07-21T18:16:37.421056Z',
            name: 'Project - DarkWeird',
            description: 'ChallengeBrotherProduceAngleRecoverSideCreditAspectPartMembership䏁',
            local_path: '_131__project_darkweird',
            scm_type: 'git',
            scm_url: 'https://github.com/ansible/test-playbooks.git',
            scm_branch: '',
            scm_refspec: '',
            scm_clean: false,
            scm_track_submodules: false,
            scm_delete_on_update: false,
            credential: 103,
            timeout: 0,
            scm_revision: '98b8dc2d4d6671ddceab73a5d3958e94fcdba419',
            last_job_run: '2022-07-14T19:02:16.606480Z',
            last_job_failed: false,
            next_job_run: null,
            status: 'successful',
            organization: 111,
            scm_update_on_launch: false,
            scm_update_cache_timeout: 0,
            allow_override: false,
            custom_virtualenv: null,
            default_environment: null,
            last_update_failed: false,
            last_updated: '2022-07-14T19:02:16.606480Z',
        },
        {
            id: 99,
            type: 'project',
            url: '/api/v2/projects/99/',
            related: {
                created_by: '/api/v2/users/2/',
                modified_by: '/api/v2/users/2/',
                last_job: '/api/v2/project_updates/130/',
                teams: '/api/v2/projects/99/teams/',
                playbooks: '/api/v2/projects/99/playbooks/',
                inventory_files: '/api/v2/projects/99/inventories/',
                update: '/api/v2/projects/99/update/',
                project_updates: '/api/v2/projects/99/project_updates/',
                scm_inventory_sources: '/api/v2/projects/99/scm_inventory_sources/',
                schedules: '/api/v2/projects/99/schedules/',
                activity_stream: '/api/v2/projects/99/activity_stream/',
                notification_templates_started: '/api/v2/projects/99/notification_templates_started/',
                notification_templates_success: '/api/v2/projects/99/notification_templates_success/',
                notification_templates_error: '/api/v2/projects/99/notification_templates_error/',
                access_list: '/api/v2/projects/99/access_list/',
                object_roles: '/api/v2/projects/99/object_roles/',
                copy: '/api/v2/projects/99/copy/',
                last_update: '/api/v2/project_updates/130/',
            },
            summary_fields: {
                last_job: {
                    id: 130,
                    name: 'Project - ErrorDark',
                    description: 'GoTeachingLessonBaseballWomanIllegalDirtFlowConceptDistribution',
                    finished: '2022-07-14T17:49:43.733779Z',
                    status: 'successful',
                    failed: false,
                },
                last_update: {
                    id: 130,
                    name: 'Project - ErrorDark',
                    description: 'GoTeachingLessonBaseballWomanIllegalDirtFlowConceptDistribution',
                    status: 'successful',
                    failed: false,
                },
                created_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                modified_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                object_roles: {
                    admin_role: { description: 'Can manage all aspects of the project', name: 'Admin', id: 1889 },
                    use_role: { description: 'Can use the project in a job template', name: 'Use', id: 1890 },
                    update_role: { description: 'May update the project', name: 'Update', id: 1891 },
                    read_role: { description: 'May view settings for the project', name: 'Read', id: 1892 },
                },
                user_capabilities: { edit: true, delete: true, start: true, schedule: true, copy: true },
            },
            created: '2022-07-14T17:49:40.221351Z',
            modified: '2022-07-14T17:49:40.221379Z',
            name: 'Project - ErrorDark',
            description: 'GoTeachingLessonBaseballWomanIllegalDirtFlowConceptDistribution',
            local_path: '_99__project_errordark',
            scm_type: 'git',
            scm_url: 'https://github.com/ansible/test-playbooks.git',
            scm_branch: '',
            scm_refspec: '',
            scm_clean: false,
            scm_track_submodules: false,
            scm_delete_on_update: false,
            credential: null,
            timeout: 0,
            scm_revision: '98b8dc2d4d6671ddceab73a5d3958e94fcdba419',
            last_job_run: '2022-07-14T17:49:43.733779Z',
            last_job_failed: false,
            next_job_run: null,
            status: 'successful',
            organization: null,
            scm_update_on_launch: false,
            scm_update_cache_timeout: 0,
            allow_override: false,
            custom_virtualenv: null,
            default_environment: null,
            last_update_failed: false,
            last_updated: '2022-07-14T17:49:43.733779Z',
        },
        {
            id: 25,
            type: 'project',
            url: '/api/v2/projects/25/',
            related: {
                created_by: '/api/v2/users/2/',
                modified_by: '/api/v2/users/2/',
                last_job: '/api/v2/project_updates/74/',
                teams: '/api/v2/projects/25/teams/',
                playbooks: '/api/v2/projects/25/playbooks/',
                inventory_files: '/api/v2/projects/25/inventories/',
                update: '/api/v2/projects/25/update/',
                project_updates: '/api/v2/projects/25/project_updates/',
                scm_inventory_sources: '/api/v2/projects/25/scm_inventory_sources/',
                schedules: '/api/v2/projects/25/schedules/',
                activity_stream: '/api/v2/projects/25/activity_stream/',
                notification_templates_started: '/api/v2/projects/25/notification_templates_started/',
                notification_templates_success: '/api/v2/projects/25/notification_templates_success/',
                notification_templates_error: '/api/v2/projects/25/notification_templates_error/',
                access_list: '/api/v2/projects/25/access_list/',
                object_roles: '/api/v2/projects/25/object_roles/',
                copy: '/api/v2/projects/25/copy/',
                organization: '/api/v2/organizations/2/',
                last_update: '/api/v2/project_updates/74/',
            },
            summary_fields: {
                organization: {
                    id: 2,
                    name: 'Organization - TestTone',
                    description: 'MessageWebMaintenanceCashRadioWeekendAirportCallTradeSnow',
                },
                last_job: {
                    id: 74,
                    name: 'Project - PoliticsKiss',
                    description: 'ActLandscapeLawPipeHealthBedIncomeConditionSaveExtent',
                    finished: '2022-07-14T17:30:06.592815Z',
                    status: 'successful',
                    failed: false,
                },
                last_update: {
                    id: 74,
                    name: 'Project - PoliticsKiss',
                    description: 'ActLandscapeLawPipeHealthBedIncomeConditionSaveExtent',
                    status: 'successful',
                    failed: false,
                },
                created_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                modified_by: { id: 2, username: 'admin', first_name: '', last_name: '' },
                object_roles: {
                    admin_role: { description: 'Can manage all aspects of the project', name: 'Admin', id: 145 },
                    use_role: { description: 'Can use the project in a job template', name: 'Use', id: 146 },
                    update_role: { description: 'May update the project', name: 'Update', id: 147 },
                    read_role: { description: 'May view settings for the project', name: 'Read', id: 148 },
                },
                user_capabilities: { edit: true, delete: true, start: true, schedule: true, copy: true },
            },
            created: '2022-07-14T17:30:02.920501Z',
            modified: '2022-07-14T17:30:02.920528Z',
            name: 'Project - PoliticsKiss',
            description: 'ActLandscapeLawPipeHealthBedIncomeConditionSaveExtent',
            local_path: '_25__project_politicskiss',
            scm_type: 'git',
            scm_url: 'https://github.com/ansible/test-playbooks.git',
            scm_branch: '',
            scm_refspec: '',
            scm_clean: false,
            scm_track_submodules: false,
            scm_delete_on_update: false,
            credential: null,
            timeout: 0,
            scm_revision: '98b8dc2d4d6671ddceab73a5d3958e94fcdba419',
            last_job_run: '2022-07-14T17:30:06.592815Z',
            last_job_failed: false,
            next_job_run: null,
            status: 'successful',
            organization: 2,
            scm_update_on_launch: false,
            scm_update_cache_timeout: 0,
            allow_override: false,
            custom_virtualenv: null,
            default_environment: null,
            last_update_failed: false,
            last_updated: '2022-07-14T17:30:06.592815Z',
        },
    ],
}
export function ProjectsDemo() {
    const [items, setItems] = useState(data.results)

    const createItem = () => null

    const deleteItems = useCallback((deleteItems: IProject[]) => {
        setItems((items) => {
            items = items.filter((item) => !deleteItems.includes(item))
            return items
        })
    }, [])

    const [actionsOpen, setActionsOpen] = useState(false)

    const keyFn = useCallback((task: IProject) => task.id.toString(), [])

    const columns: ITableColumn<IProject>[] = useMemo(
        () => [
            {
                header: 'Name',
                cell: (project) => {
                    return <TextCell text={project.name} iconSize="sm" to={project.url} />
                },
                sortFn: (l, r) => l.name.localeCompare(r.name),
            },
            {
                header: 'Status',
                cell: (project) => {
                    const status = getProjectStatus(project)
                    return <TextCell icon={status.icon} text={status.text} iconSize="sm" textColor={PatternFlyColor.Green} />
                },
                sortFn: (l, r) => l.status.localeCompare(r.status),
            },
            {
                header: 'Type',
                cell: (project) => {
                    const scmType = getProjectScm(project)
                    return <TextCell icon={scmType.icon} text={scmType.text} iconSize="md" />
                },
                sortFn: (l, r) => l.scm_type.localeCompare(r.scm_type),
            },
            {
                header: 'Revision',
                cell: (project) => <CopyCell text={project.scm_revision} minWidth={60} />,
                sortFn: (l, r) => l.scm_revision.localeCompare(r.scm_revision),
            },
            {
                header: 'Organization',

                cell: (task) => {
                    if (task.organization) {
                        return (
                            <TextCell
                                text={task.summary_fields.organization.name}
                                to={`/organizations/${task.organization.toString()}/details}`}
                            />
                        )
                    }
                    return (
                        <TextCell
                            icon={<ExclamationCircleIcon color={getPatternflyColor(PatternFlyColor.Red)} />}
                            iconSize="sm"
                            text="Deleted"
                            textColor={PatternFlyColor.Red}
                        />
                    )
                },
                sortFn: (l, r) => (l.summary_fields.organization?.name ?? '').localeCompare(r.summary_fields.organization?.name ?? ''),
            },
            {
                header: 'Last Used',
                cell: (task) => <SinceCell value={task.last_job_run} />,
                sortFn: (l, r) => l.last_job_run.localeCompare(r.last_job_run),
            },
            {
                header: 'Last Modified',
                cell: (task) => <SinceCell value={task.last_updated} />,
                sortFn: (l, r) => l.last_updated.localeCompare(r.last_updated),
            },
            {
                header: 'Created',
                cell: (task) => <SinceCell value={task.created} />,
                sortFn: (l, r) => l.created.localeCompare(r.created),
            },
            // { header: 'Modified', cell: (task) => <DateCell value={task.modified} />, sortFn: (l, r) => l.modified - r.modified },
        ],
        []
    )

    const toolbarActions = useMemo(() => {
        const newToolbarActions: IToolbarAction<IProject>[] = [
            {
                type: ToolbarActionType.button,
                variant: ButtonVariant.primary,
                label: 'Create',
                onClick: createItem,
            },
        ]
        newToolbarActions.push({
            type: ToolbarActionType.bulk,
            variant: ButtonVariant.secondary,
            label: 'Delete',
            onClick: deleteItems,
        })
        newToolbarActions.push({
            type: ToolbarActionType.bulk,
            label: 'Sync',
            onClick: () => null,
        })
        return newToolbarActions
    }, [deleteItems])

    const actions: IItemAction<IProject>[] | undefined = useMemo(
        () => [
            { label: 'Sync', onClick: () => null },
            { label: 'Edit', onClick: () => null },
            { label: 'Copy', onClick: () => null },
            { label: 'Delete', onClick: (item: IProject) => deleteItems([item]) },
        ],
        [deleteItems]
    )

    const statusFilter = useMemo<IItemFilter<IProject>>(
        () => ({
            label: 'Status',
            options: [
                { label: 'Successful', value: 'successful' },
                { label: 'Failure', value: 'failure' },
            ],
            filter: (item: IProject, values: string[]) => values.includes(item.status),
        }),
        []
    )
    const typeFilter = useMemo<IItemFilter<IProject>>(
        () => ({
            label: 'Type',
            options: [{ label: 'Git', value: 'git' }],
            filter: (item: IProject, values: string[]) => {
                // TODO values as Record<string,boolean> for performance
                for (const value of values) {
                    if (item.scm_type === value) {
                        return true
                    }
                }
                return false
            },
        }),
        []
    )

    const filters = useMemo(() => [statusFilter, typeFilter], [statusFilter, typeFilter])

    const horizontal = true
    const taskToCardFn = useCallback<(task: IProject) => ICatalogCard>(
        (project) => {
            const card: ICatalogCard = {
                // icon: task.icon,
                id: project.id.toString(),
                title: project.name,
                // labels: task.labels.map((label) => ({ label })),
                onClick: () => null,
            }
            if (!card.items) card.items = []

            if (project.description) {
                card.items.push({
                    type: CatalogCardItemType.Description,
                    description: project.description,
                })
            }

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Organization',
                horizontal,
                items: [{ text: project.summary_fields.organization?.name }],
            })

            const status = getProjectStatus(project)
            if (project.status) {
                if (!card.items) card.items = []
                card.items.push({
                    type: CatalogCardItemType.List,
                    title: 'Last job status',
                    horizontal,
                    items: [status],
                })
            }

            const scm = getProjectScm(project)
            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Source control type',
                horizontal,
                items: [scm],
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Source control revision',
                horizontal,
                items: [{ text: project.scm_revision }], // TODO <CopyCell text={project.scm_revision} />
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Source control URL',
                horizontal,
                items: [{ text: project.scm_url }], // TODO <CopyCell text={project.scm_revision} />
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Branch',
                horizontal,
                items: [{ text: project.scm_branch }], // TODO <CopyCell text={project.scm_revision} />
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Cache timeout',
                horizontal,
                items: [{ text: project.scm_update_cache_timeout.toString() }], // TODO <CopyCell text={project.scm_revision} />
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Playbook directory',
                horizontal,
                items: [{ text: project.local_path }], // TODO <CopyCell text={project.scm_revision} />
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Created',
                horizontal,
                items: [{ text: project.created }], // TODO <CopyCell text={project.scm_revision} />
            })

            card.items.push({
                type: CatalogCardItemType.List,
                title: 'Last modified',
                horizontal,
                items: [{ text: project.modified }], // TODO <CopyCell text={project.scm_revision} />
            })

            return card
        },
        [horizontal]
    )

    const searchKeys = useMemo(() => [{ name: 'name' }, { name: 'summary_fields.organization.name' }], [])

    const breadcrumbs = useMemo(() => [{ label: 'Home', to: RouteE.Home }, { label: 'Projects' }], [])

    return (
        <Fragment>
            <PageHeader
                title="Projects"
                breadcrumbs={breadcrumbs}
                description="A project is a logical collection of Ansible playbooks, represented in Tower."
                titleHelp={{
                    text: 'You can manage playbooks and playbook directories by either placing them manually under the Project Base Path on your Tower server, or by placing your playbooks into a source code management (SCM) system supported by Tower, including Git, Subversion, Mercurial, and Red Hat Insights.',
                }}
            />
            <ItemView
                items={items}
                columns={columns}
                itemKeyFn={keyFn}
                itemActions={actions}
                toolbarActions={toolbarActions}
                filters={filters}
                itemToCardFn={taskToCardFn}
                searchKeys={searchKeys}
                singular="project"
                plural="projects"
                article="a"
            />
        </Fragment>
    )
}

export function getProjectStatus(project: IProject) {
    switch (project.status) {
        case 'successful':
            return {
                text: 'Successful',
                icon: <CheckCircleIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
            }
        case 'failure':
            return {
                text: 'Failure',
                icon: <ExclamationCircleIcon color={getPatternflyColor(PatternFlyColor.Red)} />,
            }
        default:
            return {
                text: 'Unknown',
                icon: <CircleNotchIcon color={getPatternflyColor(PatternFlyColor.Grey)} />,
            }
    }
}

export function getProjectScm(project: IProject) {
    switch (project.scm_type) {
        case 'git':
            return {
                text: 'Git',
                icon: <GitAltIcon color="#F1502F" />,
            }
        default:
            return {
                text: 'Unknown',
                icon: <CircleNotchIcon color={getPatternflyColor(PatternFlyColor.Grey)} />,
            }
    }
}
