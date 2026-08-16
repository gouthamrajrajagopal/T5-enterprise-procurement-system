export const roles = ['EMPLOYEE','MANAGER','FINANCE','PROCUREMENT','ADMIN','OWNER','VENDOR']
const roleAliases = {
  employee: 'EMPLOYEE',
  manager: 'MANAGER',
  finance: 'FINANCE',
  procurement: 'PROCUREMENT',
  admin: 'ADMIN',
  owner: 'OWNER',
  vendor: 'VENDOR',
  'finance manager': 'FINANCE',
  'procurement manager': 'PROCUREMENT',
}
export const normalizeRole = (role) => {
  if (typeof role !== 'string') return null
  return roleAliases[role.trim().toLowerCase()] || null
}
export const titleCase = (value = '') => String(value || '').replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value || 0)
export const date = (value) => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value)) : '—'
export const message = (error) => error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Something went wrong. Please try again.'
