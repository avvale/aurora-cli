import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';

@Injectable({
    providedIn: 'root',
})
export class NavigationToolsService
{
    /**
     * Constructor
     */
    constructor() { /**/ }

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
}
