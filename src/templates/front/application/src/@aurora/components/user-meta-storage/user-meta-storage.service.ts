import { UserMetaStorage } from '@aurora/aurora.types';
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

    abstract saveUserMeta(meta: UserMetaStorage): Observable<void>;

    abstract clearUserMeta(): Observable<void>;
}