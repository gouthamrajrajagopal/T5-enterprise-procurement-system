import { useEffect, useMemo, useState } from 'react'
import { Add, ArrowForward, Assessment, Business, FactCheck, ReceiptLong, RequestQuote, VerifiedUser } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { dashboardApi, requestApi } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { DataTable, ErrorState, LoadingState, PageHeader, StatusBadge } from '../components/UI'
import { date, message, money } from '../utils'

const pendingFor = {
  MANAGER: 'PENDING_MANAGER_APPROVAL',
  FINANCE: 'PENDING_FINANCE_APPROVAL',
  PROCUREMENT: 'PENDING_PROCUREMENT_APPROVAL'
}

const labels = {
  EMPLOYEE: [
    'My procurement',
    'Track your purchase requests and submit new needs.'
  ],
  MANAGER: [
    'Approval workspace',
    'Review requests waiting for your managerial decision.'
  ],
  FINANCE: [
    'Financial review',
    'Prioritize requests requiring finance approval.'
  ],
  PROCUREMENT: [
    'Procurement operations',
    'Move approved requests through supplier selection and purchasing.'
  ],
  ADMIN: [
    'System & procurement analytics',
    'Monitor organization-wide procurement activity and master data.'
  ],
  OWNER: [
    'Executive overview',
    'Review available procurement activity.'
  ],
  VENDOR: [
    'Vendor overview',
    'Review available procurement activity.'
  ]
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')

  const load = async () => {
    setError('')

    try {
      const [dashboard, list] = await Promise.all([
        dashboardApi.summary(),
        requestApi.list()
      ])

      setSummary(dashboard.data)
      setRequests(list.data)
    } catch (e) {
      setError(message(e))
    }
  }

  useEffect(() => {
    load()
  }, [])

  const role = user.role

  const data = useMemo(
      () => buildData(role, user, requests, summary || {}),
      [role, user, requests, summary]
  )

  if (error) {
    return <ErrorState error={error} retry={load} />
  }

  if (!summary) {
    return <LoadingState />
  }

  const [title, description] = labels[role] || labels.EMPLOYEE

  return (
      <div className={`role-dashboard role-${String(role).toLowerCase()}`}>
        <PageHeader
            title={title}
            description={description}
            action={data.action}
        />

        <div className="role-banner">
          <div>
            <p className="eyebrow">{data.kicker}</p>
            <h2>{data.headline}</h2>
            <p>{data.supporting}</p>
          </div>

          {data.primaryLink && (
              <Link
                  className="button secondary"
                  to={data.primaryLink.to}
              >
                {data.primaryLink.label}
                <ArrowForward fontSize="small" />
              </Link>
          )}
        </div>

        <div className="stat-grid role-stats">
          {data.cards.map(([label, value, Icon]) => (
              <article className="stat-card" key={label}>
            <span className="stat-icon">
              <Icon />
            </span>

                <div>
                  <p>{label}</p>
                  <strong>{value ?? 0}</strong>
                </div>
              </article>
          ))}
        </div>

        {data.analytics && (
            <section className="panel analytics-panel">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Procurement analytics</p>
                  <h2>{data.analytics.title}</h2>
                  <p>{data.analytics.description}</p>
                </div>
              </div>

              <div className="analytics-grid">
                {data.analytics.values.map(([label, value]) => (
                    <div className="analytics-metric" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                ))}
              </div>
            </section>
        )}

        <section className="panel dashboard-panel">
          <div className="section-title">
            <div>
              <h2>{data.tableTitle}</h2>
              <p>{data.tableDescription}</p>
            </div>

            <Link to={data.tableLink}>
              View all
              <ArrowForward fontSize="small" />
            </Link>
          </div>

          <DataTable
              rows={data.rows.slice(0, 6)}
              columns={tableColumns(data.showRequester)}
              emptyTitle={data.emptyTitle}
              emptyDescription={data.emptyDescription}
          />
        </section>
      </div>
  )
}

function buildData(role, user, requests, summary) {
  const count = (status) =>
      requests.filter((request) => request.status === status).length

  const approved = requests.filter((request) =>
      ['APPROVED', 'VENDOR_SELECTED', 'PO_GENERATED'].includes(
          request.status
      )
  )

  const pending = requests.filter((request) =>
      String(request.status).startsWith('PENDING_')
  )

  const totalValue = (rows) =>
      money(
          rows.reduce(
              (sum, request) => sum + Number(request.estimatedAmount || 0),
              0
          )
      )

  const base = {
    kicker: 'ProcureFlow workspace',
    headline: `Welcome back, ${user.fullName?.split(' ')[0] || 'there'}`,
    supporting: 'Your live procurement activity is ready to review.',
    tableLink: '/purchase-requests',
    showRequester: role !== 'EMPLOYEE'
  }

  if (role === 'EMPLOYEE') {
    const mine = requests.filter(
        (request) => request.createdBy === user.fullName
    )

    return {
      ...base,
      kicker: 'Personal procurement',
      headline: 'Your purchase-request workspace',
      supporting:
          'Create, track, and follow the progress of your procurement needs.',
      action: (
          <Link
              className="button primary"
              to="/purchase-requests/new"
          >
            <Add fontSize="small" />
            Create request
          </Link>
      ),
      primaryLink: {
        to: '/purchase-requests/new',
        label: 'New purchase request'
      },
      cards: [
        ['My requests', mine.length, RequestQuote],
        [
          'Draft requests',
          mine.filter((r) => r.status === 'DRAFT').length,
          ReceiptLong
        ],
        [
          'Pending review',
          mine.filter((r) =>
              String(r.status).startsWith('PENDING_')
          ).length,
          FactCheck
        ],
        [
          'Approved',
          mine.filter((r) =>
              ['APPROVED', 'VENDOR_SELECTED', 'PO_GENERATED'].includes(
                  r.status
              )
          ).length,
          VerifiedUser
        ]
      ],
      tableTitle: 'My recent requests',
      tableDescription:
          'Your latest requests and current workflow status.',
      rows: mine,
      showRequester: false,
      emptyTitle: 'No personal requests yet',
      emptyDescription:
          'Create a request to begin your procurement workflow.'
    }
  }

  if (['MANAGER', 'FINANCE'].includes(role)) {
    const stage = pendingFor[role]
    const queue = requests.filter(
        (request) => request.status === stage
    )

    return {
      ...base,
      kicker:
          role === 'MANAGER'
              ? 'Approval management'
              : 'Financial review',
      headline:
          role === 'MANAGER'
              ? 'Requests need your managerial approval'
              : 'Financial requests awaiting review',
      supporting:
          'Focus on the requests currently assigned to your approval stage.',
      primaryLink: {
        to: '/approvals',
        label: 'Review approval queue'
      },
      cards: [
        [
          role === 'MANAGER'
              ? 'Manager approvals'
              : 'Finance approvals',
          queue.length,
          FactCheck
        ],
        ['All pending requests', pending.length, RequestQuote],
        ['Approved requests', approved.length, VerifiedUser],
        ['Approved value', totalValue(approved), ReceiptLong]
      ],
      tableTitle:
          role === 'MANAGER'
              ? 'Manager approval queue'
              : 'Finance approval queue',
      tableDescription:
          'Requests that currently require your decision.',
      rows: queue,
      emptyTitle: 'Your approval queue is clear',
      emptyDescription:
          'There are no requests assigned to your approval stage.'
    }
  }

  if (role === 'PROCUREMENT') {
    const procurementQueue = requests.filter(
        (request) => request.status === pendingFor.PROCUREMENT
    )

    const supplierReady = requests.filter(
        (request) => request.status === 'APPROVED'
    )

    const poReady = requests.filter(
        (request) => request.status === 'VENDOR_SELECTED'
    )

    return {
      ...base,
      kicker: 'Operations workspace',
      headline: 'Keep procurement moving',
      supporting:
          'Review approvals, select suppliers, and prepare purchase orders.',
      primaryLink: {
        to: '/approvals',
        label: 'Review procurement approvals'
      },
      cards: [
        [
          'Procurement approvals',
          procurementQueue.length,
          FactCheck
        ],
        [
          'Supplier selection',
          supplierReady.length,
          Business
        ],
        ['Ready for PO', poReady.length, ReceiptLong],
        [
          'Purchase orders',
          summary.purchaseOrders,
          VerifiedUser
        ],
        [
          'Procurement value',
          money(summary.totalSpend),
          Assessment
        ]
      ],
      analytics: {
        title: 'Workflow health',
        description:
            'Reliable live counts from the purchase-request workflow.',
        values: [
          ['Pending procurement', procurementQueue.length],
          ['Supplier selection', supplierReady.length],
          ['PO generated', count('PO_GENERATED')],
          ['Vendor selected', poReady.length]
        ]
      },
      tableTitle: 'Procurement approval queue',
      tableDescription:
          'Requests awaiting procurement review before supplier selection.',
      rows: procurementQueue,
      emptyTitle: 'No procurement approvals pending',
      emptyDescription:
          'Approved requests will move here after finance review.'
    }
  }

  if (role === 'ADMIN') {
    return {
      ...base,
      kicker: 'Administration',
      headline: 'Organization-wide procurement visibility',
      supporting:
          'Monitor request flow, purchasing activity, and system administration.',
      primaryLink: {
        to: '/reports',
        label: 'Open reports'
      },
      cards: [
        ['Total requests', summary.totalRequests, RequestQuote],
        ['Pending approvals', summary.pendingRequests, FactCheck],
        ['Purchase orders', summary.purchaseOrders, ReceiptLong],
        ['Suppliers', summary.totalSuppliers, Business],
        [
          'Procurement value',
          money(summary.totalSpend),
          Assessment
        ]
      ],
      analytics: {
        title: 'Request status distribution',
        description:
            'Current live workflow totals across the organization.',
        values: [
          ['Draft', count('DRAFT')],
          ['Pending approval', pending.length],
          ['Approved', count('APPROVED')],
          ['Vendor selected', count('VENDOR_SELECTED')],
          ['PO generated', count('PO_GENERATED')]
        ]
      },
      tableTitle: 'Recent system activity',
      tableDescription:
          'Latest purchase requests across all departments.',
      rows: requests,
      emptyTitle: 'No purchase requests recorded',
      emptyDescription:
          'System activity will appear here as requests are created.'
    }
  }

  return {
    ...base,
    cards: [
      ['Total requests', summary.totalRequests, RequestQuote],
      ['Pending', summary.pendingRequests, FactCheck],
      ['Purchase orders', summary.purchaseOrders, ReceiptLong]
    ],
    tableTitle: 'Recent procurement activity',
    tableDescription:
        'Available purchase-request activity.',
    rows: requests,
    emptyTitle: 'No activity available',
    emptyDescription:
        'Procurement activity will appear here when available.'
  }
}

function tableColumns(showRequester) {
  return [
    {
      label: 'Request',
      render: (row) => (
          <Link to={`/purchase-requests/${row.requestId}`}>
            {row.requestNumber}
          </Link>
      )
    },
    {
      label: 'Description',
      key: 'description'
    },
    ...(showRequester
        ? [
          {
            label: 'Requester',
            key: 'createdBy'
          }
        ]
        : []),
    {
      label: 'Department',
      key: 'departmentName'
    },
    {
      label: 'Amount',
      render: (row) => money(row.estimatedAmount)
    },
    {
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      label: 'Created',
      render: (row) => date(row.createdAt)
    }
  ]
}