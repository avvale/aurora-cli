import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { heineken, sapIcon, sapWhiteIcon } from './library';

@NgModule()
export class IconsModule
{
    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
    )
    {
        iconRegistry.addSvgIconLiteral('sap', sanitizer.bypassSecurityTrustHtml(sapIcon));
        iconRegistry.addSvgIconLiteral('sap_white', sanitizer.bypassSecurityTrustHtml(sapWhiteIcon));
        iconRegistry.addSvgIconLiteral('heineken', sanitizer.bypassSecurityTrustHtml(heineken));
    }
}