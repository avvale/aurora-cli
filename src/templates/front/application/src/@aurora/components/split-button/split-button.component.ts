import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SplitMainButtonContentTemplateDirective } from './directives/split-main-button-content-template.directive';
import { SplitMenuButtonsTemplateDirective } from './directives/split-menu-buttons-template.directive';

@Component({
    selector       : 'au-split-button',
    templateUrl    : './split-button.component.html',
    styleUrls      : ['./split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None,
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
