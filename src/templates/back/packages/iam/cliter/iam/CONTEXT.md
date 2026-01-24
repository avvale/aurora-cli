# IAM (Identity and Access Management)

## Purpose

Core identity and access management domain handling authentication, authorization, and multi-tenancy. Manages user accounts, roles, permissions, and organizational structures (tenants). Implements RBAC (Role-Based Access Control) with denormalized permissions for fast authorization checks.

## Modules

| Module | Responsibility |
|--------|----------------|
| account | Core authentication entity. Manages user/service accounts with OAuth client associations, role assignments, and denormalized permissions for fast authorization. Supports USER (person) and SERVICE (API integration) types. |
| user | User profile and authentication credentials. Stores personal information (name, surname, avatar, mobile), passwords (bcrypt hashed), 2FA secrets, and remember tokens. Handles password reset workflows. |
| role | Role-based access control. Groups permissions into reusable sets assignable to accounts. Supports master roles (system-defined, non-deletable) and custom roles. Controls UI navigation visibility. |
| permission | Fine-grained capabilities for API access control. Each permission represents a specific action (e.g., "Iam.CreateUser"). Organized by bounded context for structured authorization. |
| tag | Lightweight labeling system for categorizing accounts. Simple name-based tags for filtering and grouping without complex taxonomies. |
| tenant | Multi-tenancy organizational units. Represents isolated organizations with hierarchical parent-child relationships. Controls data isolation and cross-organizational access. |
| bounded-context | Registry of application bounded contexts. Defines logical boundaries for organizing modules and their associated permissions. |

## Key Business Rules

- **Account Types**: USER accounts have associated user profiles with personal data; SERVICE accounts are for API integrations without user profiles.
- **Permission Denormalization**: Account permissions are denormalized (flattened from roles) for O(1) authorization checks. Updated automatically when roles change.
- **Master Entities**: Master roles and OAuth clients cannot be deleted to prevent system lockout.
- **Soft Delete**: All entities use soft delete (deletedAt) for audit trail preservation.
- **Password Security**: Passwords are bcrypt hashed (never plain text). 2FA uses TOTP with encrypted secrets.
- **Multi-Tenancy**: Accounts can belong to multiple tenants; denormalizedTenantIds enables fast tenant-scoped queries.

## Main Flows

1. **Account Creation**: Create account -> Assign OAuth client -> Assign roles -> Auto-calculate denormalized permissions and tenant IDs.
2. **Authentication**: Validate credentials -> Check account.isActive -> Generate OAuth tokens -> Return denormalized permissions for client caching.
3. **Authorization Check**: Read account.denormalizedPermissions -> Check permission key exists -> Grant/deny access (O(1) lookup).
4. **Password Reset**: forgot-password API generates rememberToken -> Send email -> reset-password validates token and updates password.
5. **Role Permission Update**: Modify role permissions -> System auto-updates denormalizedPermissions for all accounts with that role.

## Dependencies

- **Uses**: o-auth (OAuth clients for account authentication)
- **Used by**: All bounded contexts (permission checks), message (tenant-scoped messaging), support (issue reporter), whatsapp (message sender tracking)

## Technical Notes

- **GIN Indexes**: Arrays (tags, scopes, denormalizedTenantIds) use PostgreSQL GIN indexes for efficient array operations.
- **JSONB for Permissions**: denormalizedPermissions uses JSONB for efficient key existence checks.
- **Additional APIs**: check-unique-username, check-unique-email for validation; update-me for self-service profile updates.
- **Excluded Operations**: Most aggregates exclude raw SQL, upsert, and batch operations for security.
