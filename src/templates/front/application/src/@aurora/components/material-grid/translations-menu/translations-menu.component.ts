import { Component, Input } from '@angular/core';
import { CommonLang } from '@aurora/modules';

@Component({
    selector   : 'au-translations-menu',
    templateUrl: './translations-menu.component.html',
    styleUrls  : ['./translations-menu.component.scss'],
})

export class TranslationMenuComponent
{
    @Input() langs: CommonLang[] = [];                    // langs to check if there are translation
    @Input() row: any = {};
    @Input() moduleUri: string = '';
    @Input() moduleUriParams: string[] = [];
    @Input() editionIndex: string = 'id';
}
