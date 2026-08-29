import { useEffect, useState } from 'react'
import { auditLogsApi } from '../api/client'
import { DataTable, PageHeader } from '../components/UI'
import { date, message } from '../utils'

export default function AuditLogsPage() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  const load = async () => { setLoading(true); try { setRows((await auditLogsApi.list()).data); setError('') } catch (e) { setError(message(e)) } finally { setLoading(false) } }
  useEffect(() => { load() }, [])
  return <div className="audit-page"><PageHeader title="Audit logs" description="Recent recorded procurement activity. Access is restricted to administrators." /><section className="panel"><DataTable loading={loading} error={error} retry={load} rows={rows} emptyTitle="No audit activity recorded" emptyDescription="Recorded business events will appear here." columns={[{ label: 'User', key: 'username' }, { label: 'Action', render: row => <span className="audit-action">{row.action}</span> }, { label: 'Entity', render: row => <span className="audit-module">{row.module}</span> }, { label: 'Timestamp', render: row => dateTime(row.timestamp) }]} /></section></div>
}
function dateTime(value) { return value ? `${date(value)} ${new Intl.DateTimeFormat('en-IN', { timeStyle: 'short' }).format(new Date(value))}` : '—' }
