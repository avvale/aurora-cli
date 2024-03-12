import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { heineken, sapIcon, sapWhiteIcon } from './custom-icons-library';

@Injectable({
    providedIn: 'root',
})
export class CustomIconsService
{
    constructor()
    {
        const domSanitizer = inject(DomSanitizer);
        const matIconRegistry = inject(MatIconRegistry);

        matIconRegistry.addSvgIconSetInNamespace('aurora', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/aurora.svg'));
        matIconRegistry.addSvgIconLiteral('sap', domSanitizer.bypassSecurityTrustHtml(sapIcon));
        matIconRegistry.addSvgIconLiteral('sap_white', domSanitizer.bypassSecurityTrustHtml(sapWhiteIcon));
        matIconRegistry.addSvgIconLiteral('heineken', domSanitizer.bypassSecurityTrustHtml(heineken));
    }
}