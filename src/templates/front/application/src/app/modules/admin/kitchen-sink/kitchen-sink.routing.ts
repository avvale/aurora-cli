import { Route } from '@angular/router';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { DecimalsComponent } from './decimals/decimals.component';
import { GridComponent } from './grid/grid.component';

export const kitchenSinkRoutes: Route[] = [
    {
        path     : '',
        component: KitchenSinkComponent,
        children : [
            { path: 'decimals', component: DecimalsComponent },
            { path: 'grid',     component: GridComponent },
        ],
    },
];
