export type GraphAuth =
{
    tenantId: string;
    clientId: string;
    clientSecret: string;
};

export type GraphTransportOptions = GraphAuth & {
    from: string; // Default from address
    userId?: string; // optional: /users/{userId}/sendMail; if not, use /me (delegated)
    scope?: string; // by default: https://graph.microsoft.com/.default
};
