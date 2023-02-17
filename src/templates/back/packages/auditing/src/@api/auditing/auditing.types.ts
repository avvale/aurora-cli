export interface AuditingAccount
{
    id: string;
    email: string;
}

export interface AuditingMeta<T extends AuditingAccount = AuditingAccount>
{
    ip: string;
    userAgent: string;
    method: string;
    baseUrl: string;
    params: { [key: string]: any };
    query: { [key: string]: any };
    body: { [key: string]: any };
    account: T;
    operationId?: string;
    operationSort?: number;
    tags?: string[];
    // property to define the id that the side effect will be created,
    // used to define the id in the rollback action and related to the
    // affected side effect
    id?: string;
}
