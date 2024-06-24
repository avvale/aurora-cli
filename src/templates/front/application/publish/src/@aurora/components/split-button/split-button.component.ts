import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SplitMainButtonContentTemplateDirective } from './directives/split-main-button-content-template.directive';
import { SplitMenuButtonsTemplateDirective } from './directives/split-menu-buttons-template.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector       : 'au-split-button',
    templateUrl    : './split-button.component.html',
    styleUrls      : ['./split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [
        MatButtonModule, MatIconModule, MatMenuModule, NgClass, NgIf, NgTemplateOutlet, RouterModule,
    ],
})
export class SplitButtonComponent
{
    @Input() color: string = 'primary';
    @Input() disabled: boolean = false;
    @Input() routerLinkMainButton: string | any[];
    @Input() mainButtonType: string;
    @Input() mainButtonForm: string;
    @Input() hasMenu: boolean = true;

    @Output() mainButtonClick: EventEmitter<PointerEvent> = new EventEmitter();

    @ContentChild(SplitMainButtonContentTemplateDirective) splitMainButtonContentTemplate?: SplitMainButtonContentTemplateDirective;
    @ContentChild(SplitMenuButtonsTemplateDirective) splitMenuButtonsTemplate?: SplitMenuButtonsTemplateDirective;
}
