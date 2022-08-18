import { Route } from '@angular/router';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { DecimalsComponent } from './decimals/decimals.component';
import { GridComponent } from './grid/grid.component';
import { DatesComponent } from './dates/dates.component';
import { SelectsComponent } from './selects/selects.component';

export const kitchenSinkRoutes: Route[] = [
    {
        path     : '',
        component: KitchenSinkComponent,
        children : [
            { path: 'decimals', component: DecimalsComponent },
            { path: 'grid',     component: GridComponent },
            { path: 'dates',    component: DatesComponent },
            { path: 'selects',  component: SelectsComponent },
        ],
    },
];
