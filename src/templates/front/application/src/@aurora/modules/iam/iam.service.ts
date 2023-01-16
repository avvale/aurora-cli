import { Observable } from 'rxjs';
import { Account } from './iam.types';

export abstract class IamService<T = Account>
{
    abstract set account(value: T);

    abstract get account$(): Observable<T>;

    abstract get me(): T;

    abstract get(): Observable<{ me: T; }>;

    abstract update(account: T): Observable<any>

    abstract clear(): void;
}
