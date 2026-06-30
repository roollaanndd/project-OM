# OMDC API Documentation

## Base URL
- Development: `http://localhost:3000`
- Production: `https://omdc.id` (or `https://api.omdc.id`)

## Authentication
All mutation endpoints require:
- `Content-Type: application/json`
- `X-Requested-With: XMLHttpRequest` (CSRF protection)
- `Authorization: Bearer <token>` (for authenticated routes — future)

## Rate Limiting
| Endpoint | Limit |
|----------|-------|
| `/api/booking` | 5 req/min per IP |
| `/api/queue` | 10 req/min per IP |
| `/api/*` (default) | 60 req/min per IP |

Rate limit exceeded returns `429` with `Retry-After` header.

---

## Endpoints

### Health Check
```
GET /api
GET /api/booking (health check)
```

### Bookings
```
POST /api/booking
Body: {
  name: string (2-100 chars)
  phone: string (8-20 chars)
  email?: string (valid email)
  service: string (from whitelist)
  doctor?: string
  date: string (YYYY-MM-DD, future date)
  time: string (HH:MM, from whitelist)
  notes?: string (max 1000 chars)
}
Response: 201 { ok: true, bookingId: string }
```

### Queue
```
GET /api/queue?status=waiting&branchId=b1
Response: { ok: true, data: QueueEntry[], count: number }

POST /api/queue
Body: {
  patientName: string (2-100)
  patientPhone?: string (8-20)
  service: string (2-100)
  doctorName?: string
  source: "walk-in" | "booking" (default: "walk-in")
  bookingId?: string
  branchId?: string
}
Response: 201 { ok: true, data: QueueEntry }
```

### Patients
```
GET /api/patients?page=1&limit=20&search=sarah
Response: { ok: true, data: Patient[], pagination: { page, limit, total, pages } }

POST /api/patients
Body: {
  name: string (2-100)
  phone: string (8-20)
  email?: string
  age?: number (0-150)
  address?: string (max 500)
  isFirstVisit?: boolean (default: true)
  branchId?: string
}
Response: 201 { ok: true, data: Patient }

GET /api/patients/[id]
Response: { ok: true, data: Patient & { bookings, payments } }

DELETE /api/patients/[id]
Response: { ok: true, message: "Patient deleted" }
```

### Doctors
```
GET /api/doctors
Response: { ok: true, data: Doctor[] }

PATCH /api/doctors
Body: { id: string, status: "available" | "busy" | "off" }
Response: { ok: true, data: Doctor }
```

### Branches
```
GET /api/branches
Response: { ok: true, data: Branch[] }
```

### Payments
```
GET /api/payments?status=success&page=1&limit=20
Response: { ok: true, data: Payment[], pagination: {...} }

POST /api/payments
Body: {
  description: string (2-200)
  amount: number (positive)
  method: "cash" | "card" | "qris" | "ewallet" (default: "cash")
  patientId?: string
  bookingId?: string
}
Response: 201 { ok: true, data: Payment }
```

### Blog
```
GET /api/blog
Response: { ok: true, data: BlogPostSummary[], count: number }

GET /api/blog/[slug]
Response: { ok: true, data: BlogPost }
Error: 404 { ok: false, error: "Post not found" }
```

---

## Error Responses

All errors follow this format:
```json
{
  "ok": false,
  "error": "ERROR_TYPE",
  "message": "Human-readable message (Indonesian)",
  "details?: ZodIssue[]  // for validation errors
}
```

| Status | Error Type | Description |
|--------|-----------|-------------|
| 400 | VALIDATION_FAILED | Input doesn't match schema |
| 403 | CSRF_CHECK_FAILED | Origin not allowed |
| 404 | NOT_FOUND | Resource not found |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Server error (no stack trace leaked) |

## Security Features

- ✅ Zod input validation on all routes
- ✅ Whitelist validation (service, doctor, time)
- ✅ Business logic (no past dates, max 90 days advance)
- ✅ Rate limiting (per IP, per endpoint)
- ✅ CSRF protection (same-origin check)
- ✅ Bot detection (blocks sqlmap, nikto, nmap)
- ✅ SQL injection prevention (Prisma parameterized)
- ✅ Error sanitization (no stack traces to client)
- ✅ Audit logging (sensitive actions tracked)
