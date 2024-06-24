import { InjectionToken } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';

export const COMPACT_NAVIGATION = new InjectionToken<FuseNavigationItem[]>('Navigation token for compact navigation');
export const DEFAULT_NAVIGATION = new InjectionToken<FuseNavigationItem[]>('Navigation token for default navigation');
export const FUTURISTIC_NAVIGATION = new InjectionToken<FuseNavigationItem[]>('Navigation token for futuristic navigation');
export const HORIZONTAL_NAVIGATION = new InjectionToken<FuseNavigationItem[]>('Navigation token for horizontal navigation');