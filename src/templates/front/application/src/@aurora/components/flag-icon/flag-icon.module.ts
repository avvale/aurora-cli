import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagIconComponent } from '@aurora/components/flag-icon/flag-icon.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        FlagIconComponent,
    ],
    declarations: [
        FlagIconComponent,
    ],
})
export class FlagIconModule {}
