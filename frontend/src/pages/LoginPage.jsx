import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
    Lock,
    Visibility,
    VisibilityOff,
    VerifiedUser,
    Approval,
    Analytics
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/UI'
import { message } from '../utils'

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [show, setShow] = useState(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState('')

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    const submit = async (e) => {
        e.preventDefault()
        setBusy(true)
        setError('')

        try {
            await login(form)
            navigate(location.state?.from?.pathname || '/')
        } catch (err) {
            setError(message(err))
        } finally {
            setBusy(false)
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                background:
                    'linear-gradient(135deg, #f5f8fc 0%, #eef3f9 50%, #e8eef7 100%)',
                overflow: 'hidden'
            }}
        >
            {/* LEFT BRANDING SECTION */}
            <section
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '70px 9vw',
                    color: '#ffffff',
                    background:
                        'linear-gradient(145deg, #102a43 0%, #163d63 55%, #1e4f7a 100%)',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative background elements */}
                <div
                    style={{
                        position: 'absolute',
                        width: '420px',
                        height: '420px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        top: '-180px',
                        right: '-140px'
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.035)',
                        bottom: '-130px',
                        left: '-120px'
                    }}
                />

                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: '620px'
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            marginBottom: '42px'
                        }}
                    >
                        <div
                            style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.16)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
                            }}
                        >
                            <Lock fontSize="medium" />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.3px'
                                }}
                            >
                                ProcureFlow
                            </div>

                            <div
                                style={{
                                    fontSize: '11px',
                                    opacity: 0.65,
                                    letterSpacing: '1.4px',
                                    textTransform: 'uppercase',
                                    marginTop: '2px'
                                }}
                            >
                                Enterprise Procurement
                            </div>
                        </div>
                    </div>

                    <p
                        style={{
                            margin: '0 0 14px',
                            fontSize: '12px',
                            fontWeight: 700,
                            letterSpacing: '1.8px',
                            textTransform: 'uppercase',
                            opacity: 0.7
                        }}
                    >
                        Smart procurement platform
                    </p>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: 'clamp(40px, 4vw, 64px)',
                            lineHeight: 1.05,
                            letterSpacing: '-2px',
                            fontWeight: 750
                        }}
                    >
                        Purchasing,
                        <br />
                        made accountable.
                    </h1>

                    <p
                        style={{
                            maxWidth: '560px',
                            margin: '25px 0 38px',
                            fontSize: '17px',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.75)'
                        }}
                    >
                        Manage purchase requests, approvals, suppliers and
                        purchase orders through one centralized and secure
                        procurement workspace.
                    </p>

                    {/* Feature cards */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '12px',
                            maxWidth: '600px'
                        }}
                    >
                        <Feature
                            icon={<VerifiedUser />}
                            title="Secure"
                            text="Role-based access"
                        />

                        <Feature
                            icon={<Approval />}
                            title="Controlled"
                            text="Approval workflow"
                        />

                        <Feature
                            icon={<Analytics />}
                            title="Insightful"
                            text="Live analytics"
                        />
                    </div>

                    <div
                        style={{
                            marginTop: '48px',
                            paddingTop: '20px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.48)'
                        }}
                    >
                        Development of Smart Procurement & Purchase Order
                        Management System
                    </div>
                </div>
            </section>

            {/* RIGHT LOGIN SECTION */}
            <section
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 30px'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '455px'
                    }}
                >
                    <form
                        onSubmit={submit}
                        style={{
                            background: '#ffffff',
                            border: '1px solid rgba(15, 45, 75, 0.08)',
                            borderRadius: '22px',
                            padding: '42px',
                            boxShadow:
                                '0 25px 70px rgba(15, 42, 70, 0.12)'
                        }}
                    >
                        {/* Login icon */}
                        <div
                            style={{
                                width: '54px',
                                height: '54px',
                                borderRadius: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#edf4fb',
                                color: '#1e4f7a',
                                marginBottom: '24px'
                            }}
                        >
                            <Lock />
                        </div>

                        <h2
                            style={{
                                margin: 0,
                                fontSize: '30px',
                                lineHeight: 1.2,
                                color: '#172b3f',
                                letterSpacing: '-0.7px'
                            }}
                        >
                            Welcome back
                        </h2>

                        <p
                            style={{
                                margin: '9px 0 28px',
                                color: '#718096',
                                fontSize: '14px',
                                lineHeight: 1.6
                            }}
                        >
                            Sign in to your procurement workspace.
                        </p>

                        {error && (
                            <div
                                className="form-error"
                                style={{
                                    marginBottom: '20px'
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '20px',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#334e68'
                            }}
                        >
                            Email address

                            <input
                                type="email"
                                required
                                autoComplete="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    })
                                }
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    marginTop: '8px',
                                    height: '48px',
                                    padding: '0 14px',
                                    border: '1px solid #d9e2ec',
                                    borderRadius: '10px',
                                    outline: 'none',
                                    fontSize: '14px',
                                    color: '#243b53',
                                    background: '#fbfcfe'
                                }}
                            />
                        </label>

                        {/* Password */}
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#334e68'
                            }}
                        >
                            Password

                            <span
                                style={{
                                    position: 'relative',
                                    display: 'block',
                                    marginTop: '8px'
                                }}
                            >
                <input
                    type={show ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                    placeholder="Enter your password"
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        height: '48px',
                        padding: '0 48px 0 14px',
                        border: '1px solid #d9e2ec',
                        borderRadius: '10px',
                        outline: 'none',
                        fontSize: '14px',
                        color: '#243b53',
                        background: '#fbfcfe'
                    }}
                />

                <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShow(!show)}
                    style={{
                        position: 'absolute',
                        right: '6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '38px',
                        height: '38px',
                        border: 'none',
                        background: 'transparent',
                        color: '#627d98',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </button>
              </span>
                        </label>

                        {/* Forgot password */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                margin: '10px 0 25px'
                            }}
                        >
                            <Link
                                to="/forgot-password"
                                style={{
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: '#1e5a8a',
                                    textDecoration: 'none'
                                }}
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login button */}
                        <Button
                            type="submit"
                            disabled={busy}
                            className="login-submit"
                        >
                            {busy ? 'Signing in…' : 'Sign in'}
                        </Button>
                    </form>

                    <p
                        style={{
                            textAlign: 'center',
                            margin: '20px 0 0',
                            fontSize: '13px',
                            color: '#718096'
                        }}
                    >
                        New to ProcureFlow?{' '}
                        <Link
                            to="/register"
                            style={{
                                color: '#1e5a8a',
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}
                        >
                            Create an employee account
                        </Link>
                    </p>

                    <p
                        style={{
                            textAlign: 'center',
                            margin: '26px 0 0',
                            fontSize: '11px',
                            color: '#9fb3c8'
                        }}
                    >
                        Secure enterprise procurement workspace
                    </p>
                </div>
            </section>
        </div>
    )
}

function Feature({ icon, title, text }) {
    return (
        <div
            style={{
                padding: '15px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.09)'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '7px',
                    color: '#ffffff'
                }}
            >
                {icon}

                <span
                    style={{
                        fontSize: '13px',
                        fontWeight: 700
                    }}
                >
          {title}
        </span>
            </div>

            <span
                style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.52)'
                }}
            >
        {text}
      </span>
        </div>
    )
}