import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationModule, BreadcrumbModule, ChipModule, DatepickerSqlFormatModule, DatetimepickerSqlFormatModule, EnvironmentsInformationModule, FilePreviewOverlayModule, FileUploadModule, FlagLangModule, GridDialogModule, GridElementsManagerModule, GridModule, GridSelectElementModule, GridSelectMultipleElementsModule, IconsModule, MatFormFieldAppearanceModule, PipesModule, SpinnerManagerModule, SplitButtonModule, TemplateDialogModule, TitleModule } from '@aurora';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { CustomModule } from './custom/custom.module';

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
        FlagLangModule,
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
        FlagLangModule,
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
