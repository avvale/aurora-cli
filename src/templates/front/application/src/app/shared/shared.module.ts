import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociatedElementsManagerModule, BreadcrumbModule, DatepickerSqlFormatModule, DatetimepickerSqlFormatModule, GridDialogModule, GridModule, SelectElementGridModule, TitleModule } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // ng-matero
        MtxDatetimepickerModule,

        // @aurora
        AssociatedElementsManagerModule,
        BreadcrumbModule,
        DatepickerSqlFormatModule,
        DatetimepickerSqlFormatModule,
        GridDialogModule,
        GridModule,
        SelectElementGridModule,
        TitleModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // ng-matero
        MtxDatetimepickerModule,

        // @aurora
        AssociatedElementsManagerModule,
        BreadcrumbModule,
        DatepickerSqlFormatModule,
        DatetimepickerSqlFormatModule,
        GridModule,
        SelectElementGridModule,
        TitleModule,
    ],
})
export class SharedModule {}
