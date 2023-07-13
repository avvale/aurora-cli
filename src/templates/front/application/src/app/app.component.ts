import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// ---- customizations ----
import { NgIf } from '@angular/common';
import { RibbonEnvironmentComponent } from '@aurora';
import { environment } from 'environments/environment';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [NgIf, RibbonEnvironmentComponent, RouterOutlet],
})
export class AppComponent
{
    // ---- customizations ----
    environment = environment;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
