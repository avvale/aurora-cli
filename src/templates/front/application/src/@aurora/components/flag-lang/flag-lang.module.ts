import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlagLangComponent } from './flag-lang.component';

@NgModule({
    declarations: [
        FlagLangComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        FlagLangComponent,
    ],
})
export class FlagLangModule {}
