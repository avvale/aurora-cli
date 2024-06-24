import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SplitMainButtonContentTemplateDirective } from './directives/split-main-button-content-template.directive';
import { SplitMenuButtonsTemplateDirective } from './directives/split-menu-buttons-template.directive';
import { SplitButtonComponent } from './split-button.component';

@NgModule({
    imports: [
        SplitButtonComponent,
        SplitMainButtonContentTemplateDirective,
        SplitMenuButtonsTemplateDirective,
        MatMenuModule,
    ],
    exports: [
        SplitButtonComponent,
        SplitMainButtonContentTemplateDirective,
        SplitMenuButtonsTemplateDirective,
        MatMenuModule,
    ],
})
export class SplitButtonModule { }
