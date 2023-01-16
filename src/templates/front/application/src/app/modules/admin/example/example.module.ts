import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { exampleRoutes } from './example.routing';

@NgModule({
    declarations: [
        ExampleComponent,
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
    ],
})
export class ExampleModule
{
}
