import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, DatepickerSqlFormatModule, DatetimepickerSqlFormatModule, ChipModule, EnvironmentsInformationModule, GridDialogModule, GridElementsManagerModule, GridModule, GridSelectElementModule, GridSelectMultipleElementsModule, TemplateDialogModule, TitleModule, SplitButtonModule, IconsModule, PipesModule, FileUploadModule, MatFormFieldAppearanceModule, FilePreviewOverlayModule, AuthorizationModule, SpinnerManagerModule } from '@aurora';
import { CustomModule } from './custom/custom.module';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';

@NgModule({
    imports: [
        CommonModule,
        CustomModule,
        FormsModule,
        ReactiveFormsModule,

        // ng-matero
        MtxDatetimepickerModule,

        // @aurora
        AuthorizationModule,
        BreadcrumbModule,
        ChipModule,
        DatepickerSqlFormatModule,
        DatetimepickerSqlFormatModule,
        EnvironmentsInformationModule,
        FilePreviewOverlayModule,
        FileUploadModule,
        GridDialogModule,
        GridElementsManagerModule,
        GridModule,
        GridSelectElementModule,
        GridSelectMultipleElementsModule,
        IconsModule,
        MatFormFieldAppearanceModule,
        PipesModule,
        SpinnerManagerModule,
        SplitButtonModule,
        TemplateDialogModule,
        TitleModule,
    ],
    exports: [
        CommonModule,
        CustomModule,
        FormsModule,
        ReactiveFormsModule,

        // ng-matero
        MtxDatetimepickerModule,

        // @aurora
        AuthorizationModule,
        BreadcrumbModule,
        ChipModule,
        DatepickerSqlFormatModule,
        DatetimepickerSqlFormatModule,
        EnvironmentsInformationModule,
        FileUploadModule,
        GridElementsManagerModule,
        GridModule,
        GridSelectElementModule,
        GridSelectMultipleElementsModule,
        MatFormFieldAppearanceModule,
        PipesModule,
        SpinnerManagerModule,
        SplitButtonModule,
        TemplateDialogModule,
        TitleModule,
    ],
})
export class SharedModule {}
