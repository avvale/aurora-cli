import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { SplitMainButtonContentTemplateDirective } from './directives/split-main-button-content-template.directive';
import { SplitMenuButtonsTemplateDirective } from './directives/split-menu-buttons-template.directive';

@Component({
    selector       : 'au-split-button',
    templateUrl    : './split-button.component.html',
    styleUrls      : ['./split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitButtonComponent
{
    @Input() color: string = 'primary';
    @Input() disabled: boolean = false;
    @Input() routerLinkMainButton: string | any[];
    @Input() typeMainButton: string;
    @Input() formMainButton: string;

    @ContentChild(SplitMainButtonContentTemplateDirective) splitMainButtonContentTemplate?: SplitMainButtonContentTemplateDirective;
    @ContentChild(SplitMenuButtonsTemplateDirective) splitMenuButtonsTemplate?: SplitMenuButtonsTemplateDirective;
}
