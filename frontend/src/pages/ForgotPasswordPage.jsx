import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock } from '@mui/icons-material'
import { authApi } from '../api/client'
import { Button } from '../components/UI'
import { message } from '../utils'

export default function ForgotPasswordPage() {
  const navigate = useNavigate(); const [email, setEmail] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [success, setSuccess] = useState('')
  const submit = async e => { e.preventDefault(); setBusy(true); setError(''); try { const { data } = await authApi.forgotPassword({ email }); setSuccess(data.message); setTimeout(() => navigate(`/reset-password?token=${encodeURIComponent(data.resetToken)}`), 900) } catch (err) { setError(message(err)) } finally { setBusy(false) } }
  return <div className="login"><section className="login-brand"><div className="login-logo"><Lock /></div><p className="eyebrow">ProcureFlow security</p><h1>Reset your password.</h1><p>Use your work email to begin a secure, one-time password reset.</p></section><section className="login-panel"><form className="login-form auth-card" onSubmit={submit}><div className="login-form-logo"><Lock /></div><h2>Forgot password?</h2><p>Enter your email address to continue.</p>{error && <div className="form-error">{error}</div>}{success && <div className="notice success">{success}</div>}<label>Email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" /></label><Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</Button><p className="auth-switch"><Link to="/login">Back to sign in</Link></p></form></section></div>
}
