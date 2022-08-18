import { UserDataStorage } from '@aurora/aurora.types';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class UserDataStorageService<T = UserDataStorage>
{
    dataSubject$: BehaviorSubject<T | null> = new BehaviorSubject(null);

    get data$(): Observable<T>
    {
        return this.dataSubject$.asObservable();
    }

    abstract getUserData(keyUserData: string): Observable<T>;

    abstract updateUserData(keyUserData: string, keyUserDataValue: any): Observable<void>;

    abstract saveUserData(data: UserDataStorage): Observable<void>;

    abstract clearUserData(): Observable<void>;
}