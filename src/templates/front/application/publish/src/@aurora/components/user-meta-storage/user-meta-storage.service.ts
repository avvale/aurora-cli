import { UserMetaStorage } from '@aurora';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class UserMetaStorageService<T = UserMetaStorage>
{
    metaSubject$: BehaviorSubject<T | null> = new BehaviorSubject(null);

    get meta$(): Observable<T>
    {
        return this.metaSubject$.asObservable();
    }

    abstract getUserMeta(keyUserMeta: string): Observable<T>;

    abstract updateUserMeta(keyUserMeta: string, keyUserMetaValue: any): Observable<void>;

    abstract saveUserMeta(meta: T): Observable<void>;

    abstract clearUserMeta(): Observable<void>;
}