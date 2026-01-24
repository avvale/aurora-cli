# OAuth

## Purpose

OAuth 2.0 authentication and authorization infrastructure. Manages OAuth clients, applications, scopes, and token lifecycle. Provides the authentication foundation for all API access through standard OAuth grant types.

## Modules

| Module | Responsibility |
|--------|----------------|
| client | OAuth 2.0 clients defining authentication methods. Configures grant types (authorization_code, client_credentials, password, refresh_token), token expiration, and scope options. Each account must belong to one client. |
| application | Logical application groupings that can use multiple OAuth clients. Applications have unique codes and secrets for API authentication. Master applications cannot be deleted. |
| scope | Permission scopes for OAuth tokens. Links to IAM roles to grant specific permissions when a scope is requested during authentication. |
| access-token | JWT access tokens for API authentication. Stores token value, expiration, revocation status, and links to client and account. Read-only after creation. |
| refresh-token | Long-lived tokens for obtaining new access tokens. One-to-one relationship with access tokens. Enables token refresh without re-authentication. |

## Key Business Rules

- **Grant Types**: AUTHORIZATION_CODE for web apps, CLIENT_CREDENTIALS for service-to-service, PASSWORD for trusted apps, REFRESH_TOKEN for token renewal.
- **Master Entities**: Master clients and applications cannot be deleted to prevent system lockout.
- **Token Immutability**: Access and refresh tokens are create-only (no update operations) for security.
- **Scope-to-Role Mapping**: Scopes map to IAM role IDs, allowing OAuth scopes to grant specific role permissions.
- **Token Revocation**: Tokens can be revoked (isRevoked=true) without deletion for audit trail.

## Main Flows

1. **Client Credentials Flow**: Client authenticates with ID/secret -> Validate client -> Generate access token -> Return token with expiration.
2. **Password Flow**: User provides credentials -> Validate user -> Check client -> Generate access + refresh tokens.
3. **Token Refresh**: Refresh token submitted -> Validate not revoked/expired -> Generate new access token -> Optionally rotate refresh token.
4. **Token Revocation**: Mark access token as revoked -> Associated refresh token also invalidated.

## Dependencies

- **Uses**: iam (accounts linked to clients, scopes link to roles)
- **Used by**: All authenticated APIs (token validation), iam (account authentication)

## Technical Notes

- **Token Storage**: Tokens stored as TEXT (JWT can be long). Consider token introspection vs. database lookup tradeoffs.
- **Expiration Config**: expiredAccessToken and expiredRefreshToken on client define token TTL in seconds.
- **Application-Client Pivot**: Many-to-many relationship allows flexible client sharing across applications.
- **No Auditing on Tokens**: access-token and refresh-token have hasAuditing=false for performance (high-volume operations).
- **Excluded Operations**: Tokens exclude update, upsert, and batch create for security (immutable design).
