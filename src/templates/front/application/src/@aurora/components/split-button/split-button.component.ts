import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, input, Input, output, Output, ViewEncapsulation } from '@angular/core';
import { SplitMainButtonContentTemplateDirective } from './directives/split-main-button-content-template.directive';
import { SplitMenuButtonsTemplateDirective } from './directives/split-menu-buttons-template.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'au-split-button',
    templateUrl: './split-button.component.html',
    styleUrls: ['./split-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButtonModule, MatIconModule, MatMenuModule, NgClass, NgTemplateOutlet, RouterModule,
    ],
})
export class SplitButtonComponent
{
    color = input<string>('primary');
    disabled = input<boolean>(false);
    routerLinkMainButton = input<string | any[]>();
    mainButtonType = input<string>();
    mainButtonForm = input<string>();
    hasMenu = input<boolean>(true);

    mainButtonClick = output<PointerEvent>();

    @ContentChild(SplitMainButtonContentTemplateDirective) splitMainButtonContentTemplate?: SplitMainButtonContentTemplateDirective;
    @ContentChild(SplitMenuButtonsTemplateDirective) splitMenuButtonsTemplate?: SplitMenuButtonsTemplateDirective;
}
