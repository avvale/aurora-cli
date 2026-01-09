import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/* #region customizations */
import { RibbonEnvironmentComponent } from '@aurora';
import { environment } from 'environments/environment';
/* #endregion customizations */

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RibbonEnvironmentComponent, RouterOutlet],
})
export class AppComponent {
    /* #region customizations */
    environment = environment;
    /* #endregion customizations */

    /**
     * Constructor
     */
    constructor() {}
}
