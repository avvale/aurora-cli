import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SplitMainButtonContentTemplateDirective } from './directives/split-main-button-content-template.directive';
import { SplitMenuButtonsTemplateDirective } from './directives/split-menu-buttons-template.directive';
import { SplitButtonComponent } from './split-button.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
    ],
    declarations: [
        SplitButtonComponent,
        SplitMainButtonContentTemplateDirective,
        SplitMenuButtonsTemplateDirective,
    ],
    exports: [
        SplitButtonComponent,
        SplitMainButtonContentTemplateDirective,
        SplitMenuButtonsTemplateDirective,
    ],
})

export class SplitButtonModule
{
}
