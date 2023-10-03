import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import Cropper from 'cropperjs/dist/cropper.esm.js';
import { environment } from 'environments/environment';
import { AttachmentsService } from './attachments.service';

@Component({
    selector: 'au-cropper-dialog',
    template: `
        <h1 mat-dialog-title>{{ title }}</h1>

        <div mat-dialog-content class="py-12">
            <div class="image-container">
                <img #cropperImage>
            </div>
        </div>

        <div mat-dialog-actions>
            <button
                mat-raised-button
                class="mat-accent mr-16"
                [mat-dialog-close]="true"
                cdkFocusInitial
                (click)="onCrop()"
            >
                {{ crop }}
            </button>
            <button
                mat-raised-button
                [mat-dialog-close]="false"
            >
                {{ cancel }}
            </button>
        </div>
    `,
    standalone: true,
    imports   : [
        MatDialogModule,
    ],
})
export class CropperDialogComponent implements OnInit, OnDestroy
{
    @ViewChild('cropperImage', { static: true }) cropperImage;
    @ViewChild('cropperPreview', { static: false }) cropperPreview;
    cropper: Cropper;
    title: string;
    crop: string;
    cancel: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CropperDialogComponent>,
        private _renderer: Renderer2,
        private _translocoService: TranslocoService,
        private _attachmentsService: AttachmentsService,
    )
    { }

    ngOnInit(): void
    {
        this._renderer.setProperty(this.cropperImage.nativeElement, 'src', this.data.attachment.get('library').value.url);

        // load translations for component
        this.title  = this.data.title ? this.data.title : this._translocoService.translate('TITLE');
        this.crop   = this.data.crop ? this.data.crop : this._translocoService.translate('CROP');
        this.cancel = this.data.cancel ? this.data.cancel : this._translocoService['CANCEL'];

        const cropperParameters = {
            aspectRatio      : this.data.attachmentFamily.width && this.data.attachmentFamily.height ? this.data.attachmentFamily.width / this.data.attachmentFamily.height : NaN,
            viewMode         : 2,
            minContainerWidth: 0,
            // preview: this.cropperPreview.nativeElement
        };

        if (environment.debug) console.log('DEBUG - Cropper parameters ', cropperParameters);
        console.log(this.cropperImage.nativeElement);

        this.cropper = new Cropper(this.cropperImage.nativeElement, cropperParameters);
    }

    ngOnDestroy(): void
    {
        this._renderer.setProperty(this.cropperImage.nativeElement, 'src', '');
        this.cropper.destroy();
    }

    onCrop(): void
    {
        this._attachmentsService
            .setCropImage({
                crop            : this.cropper.getData(true),               // true to get data rounded
                attachmentFamily: this.data.attachmentFamily,
                attachment      : this.data.attachment.value,          // get values from formGroup
            })
            .subscribe(({ data }) =>
            {
                // set attachment image like changed
                data.adminCropAttachment.attachment.isChanged = true;

                if (environment.debug) console.log('DEBUG - response after crop image: ', data);

                // set attachment family id
                this.data.attachment.patchValue(data.adminCropAttachment.attachment);

                // set form like dirty
                this.data.form.markAsDirty();
            });
    }
}
