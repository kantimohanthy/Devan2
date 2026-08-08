# DEPLOYMENT GUIDE — UJ.OS / DEVAN (Production Release v1.0)

Production deployment and domain connection playbook for **https://kantimohanthy.dev** and **https://kantimohanthy.com**.

---

## 1. Domain Architecture & Target Routing

| Source Host / URL | Destination Target | Redirect Status | SSL Cert |
|---|---|---|---|
| `kantimohanthy.dev` | Apex Primary Application Host | `200 OK` (Primary) | TLS 1.3 / HSTS |
| `www.kantimohanthy.dev` | `https://kantimohanthy.dev` | `301 Permanent` | TLS 1.3 / HSTS |
| `kantimohanthy.com` | `https://kantimohanthy.dev` | `301 Permanent` | TLS 1.3 / HSTS |
| `www.kantimohanthy.com` | `https://kantimohanthy.dev` | `301 Permanent` | TLS 1.3 / HSTS |

---

## 2. Cloudflare DNS Configuration

Configure the following exact DNS records in the Cloudflare DNS Management Console for `kantimohanthy.dev` and `kantimohanthy.com`:

### `kantimohanthy.dev` DNS Records
| Type | Name / Host | Target / Value | Proxy Status | TTL |
|---|---|---|---|---|
| **A** | `@` | `76.76.21.21` (Vercel IP) | **DNS Only** (Gray Cloud) | Auto |
| **CNAME** | `www` | `cname.vercel-dns.com` | **DNS Only** (Gray Cloud) | Auto |

### `kantimohanthy.com` DNS Records
| Type | Name / Host | Target / Value | Proxy Status | TTL |
|---|---|---|---|---|
| **A** | `@` | `76.76.21.21` (Vercel IP) | **DNS Only** (Gray Cloud) | Auto |
| **CNAME** | `www` | `cname.vercel-dns.com` | **DNS Only** (Gray Cloud) | Auto |

> **Note on Cloudflare Proxying**: Set Proxy Status to **DNS Only** during initial domain verification on Vercel so Vercel can automatically issue Let's Encrypt / ZeroSSL TLS certificates.

---

## 3. Vercel Deployment & Custom Domains Setup

1. **Import Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/new) -> Import `ujos` / `devan` repository.
   - Framework Preset: `Next.js`
   - Build Command: `next build`
   - Output Directory: `.next`
2. **Add Custom Domains in Vercel Project Settings**:
   - Navigate to **Project Settings -> Domains**.
   - Add `kantimohanthy.dev` (Set as **Primary Domain**).
   - Add `www.kantimohanthy.dev` (Select **Redirect to kantimohanthy.dev**).
   - Add `kantimohanthy.com` (Select **Redirect to kantimohanthy.dev**).
   - Add `www.kantimohanthy.com` (Select **Redirect to kantimohanthy.dev**).

---

## 4. Verification & Security Protocols

- **HSTS Header**: `max-age=63072000; includeSubDomains; preload`
- **Canonical URL**: `https://kantimohanthy.dev`
- **Robots Route**: `https://kantimohanthy.dev/robots.txt`
- **Sitemap Route**: `https://kantimohanthy.dev/sitemap.xml`

---

## 5. Rollback Procedure

In case of deployment failure:
1. In Vercel Dashboard, go to **Deployments**.
2. Select previous stable deployment.
3. Click `...` -> **Promote to Production**.
