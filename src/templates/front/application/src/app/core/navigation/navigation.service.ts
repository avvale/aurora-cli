import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';

// ---- customizations ----
import { NavigationService as AuroraNavigationService } from '@aurora/components/navigation/navigation.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private auroraNavigationService: AuroraNavigationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        const navigation = this.auroraNavigationService.getNavigation();
        this._navigation.next(navigation);

        return of(navigation);
    }
}
