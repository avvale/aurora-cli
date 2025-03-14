import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector     : 'message-client-empty-details',
    templateUrl  : './message-client-empty-details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [
        MatIconModule, TranslocoModule,
    ],
})
export class MessageClientEmptyDetailsComponent
{ }
