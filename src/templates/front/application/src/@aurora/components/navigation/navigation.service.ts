import { Inject, Injectable } from '@angular/core';
import { AuthorizationService, IamService } from '@aurora';
import { FuseNavigationService } from '@fuse/components/navigation';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { Navigation } from 'app/core/navigation/navigation.types';
import { adminNavigation } from 'app/modules/admin/admin.navigation';
import cloneDeep from 'lodash-es/cloneDeep';
import { COMPACT_NAVIGATION, DEFAULT_NAVIGATION, FUTURISTIC_NAVIGATION, HORIZONTAL_NAVIGATION } from './navigation.types';

@Injectable({
    providedIn: 'root',
})
export class NavigationService
{
    /**
     * Constructor
     */
    constructor(
        private readonly fuseNavigationService: FuseNavigationService,
        private readonly iamService: IamService,
        private readonly authorizationService: AuthorizationService,
        @Inject(COMPACT_NAVIGATION) private readonly compactNavigation: FuseNavigationItem[],
        @Inject(DEFAULT_NAVIGATION) private readonly defaultNavigation: FuseNavigationItem[],
        @Inject(FUTURISTIC_NAVIGATION) private readonly futuristicNavigation: FuseNavigationItem[],
        @Inject(HORIZONTAL_NAVIGATION) private readonly horizontalNavigation: FuseNavigationItem[],
    ) { }

    getNavigation(): Navigation
    {
        // fill compact navigation children using the default navigation
        this.compactNavigation.forEach(compactNavItem =>
        {
            this.defaultNavigation.forEach(defaultNavItem =>
            {
                if ( defaultNavItem.id === compactNavItem.id )
                {
                    compactNavItem.children = cloneDeep(defaultNavItem.children);
                }
            });
        });

        // fill futuristic navigation children using the default navigation
        this.futuristicNavigation.forEach(futuristicNavItem =>
        {
            this.defaultNavigation.forEach(defaultNavItem =>
            {
                if ( defaultNavItem.id === futuristicNavItem.id )
                {
                    futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                }
            });
        });

        // fill horizontal navigation children using the default navigation
        this.horizontalNavigation.forEach(horizontalNavItem =>
        {
            this.defaultNavigation.forEach(defaultNavItem =>
            {
                if ( defaultNavItem.id === horizontalNavItem.id )
                {
                    horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                }
            });
        });

        // get applications item to set navigation
        const applicationsMenu = this.fuseNavigationService.getItem('applications', this.defaultNavigation);

        // set admin navigation and check navigation permissions
        applicationsMenu.children = this.checkNavigationPermissions(adminNavigation, this.iamService.me.dPermissions.all);

        return {
            compact   : cloneDeep(this.compactNavigation),
            default   : cloneDeep(this.defaultNavigation),
            futuristic: cloneDeep(this.futuristicNavigation),
            horizontal: cloneDeep(this.horizontalNavigation),
        };
    }

    /**
     * Utility function that returns a flattened
     * version of the given navigation array
     *
     * @param navigation
     * @param flatNavigation
     */
    getAllFlatNavigation(navigation: FuseNavigationItem[], flatNavigation: FuseNavigationItem[] = []): FuseNavigationItem[]
    {
        for (const item of navigation)
        {
            if (item.id && item.title)
            {
                flatNavigation.push(item);
            }

            if (item.type === 'aside' || item.type === 'collapsable' || item.type === 'group')
            {
                if (item.children)
                {
                    this.getAllFlatNavigation(item.children, flatNavigation);
                }
            }
        }

        return flatNavigation;
    }

    private checkNavigationPermissions(navigation: FuseNavigationItem[], permissions: string[]): FuseNavigationItem[]
    {
        const navigationResponse: FuseNavigationItem[] = [];

        // clone navigation to avoid modifying the original navigation
        for (const item of cloneDeep(navigation))
        {
            if (item.children)
            {
                // call function recursive
                item.children = this.checkNavigationPermissions(item.children, permissions);
            }

            // check if has resource and has access permission
            if (
                item.meta?.permission &&
                this.authorizationService.can(item.meta.permission)
            )
            {
                navigationResponse.push(item);
            }
            else if (!item.meta?.permission)
            {
                navigationResponse.push(item);
            }
        }

        return navigationResponse;
    }
}
