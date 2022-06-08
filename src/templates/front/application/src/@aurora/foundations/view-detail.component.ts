/* eslint-disable indent */
import { ViewFormComponent } from './view-form.component';

/**
 * section to add mixins to super component, for example
 *
 * export const ViewDetailComponent =
 *   EditActionMixin(               // Mixin to execute get only when is a edit action
 *   NewActionMixin(                // Mixin to set uuid in id field in FromGroup
 *   GetMixin(                      // Mixin to patch value from service in FormGroup
 *      ViewFormComponent,
 *   )));
 */


export const ViewDetailComponent = ViewFormComponent;
