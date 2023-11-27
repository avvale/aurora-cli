import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AttachmentFamily, ImageInputComponent } from '@aurora';
import Cropper from 'cropperjs/dist/cropper.esm.js';
import { AttachmentTranslatePipe } from './attachment-translations/attachment-translate.pipe';
import { AttachmentsService } from './attachments.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'au-cropper-dialog',
    template: `
        <div mat-dialog-content>
            <div class="cropper-container">
                <img #cropperImage>
            </div>
        </div>
        <div mat-dialog-actions class="justify-end">
            <button
                mat-flat-button
                class="mat-accent mr-16"
                [mat-dialog-close]="false"
            >
                {{ 'cancel' | attachmentTranslate | async }}
            </button>
            <button
                mat-flat-button
                cdkFocusInitial
                class="mat-primary"
                [mat-dialog-close]="true"
                (click)="handlerCrop()"
            >
                {{ 'crop' | attachmentTranslate | async }}
            </button>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .mat-mdc-dialog-content {
            max-height: unset;
        }

        .cropper-container {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        ::ng-deep cropper-canvas {
            flex: 1 !important;
        }
    `],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        AsyncPipe, AttachmentTranslatePipe, MatDialogModule, MatButtonModule,
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
        @Inject(MAT_DIALOG_DATA) public data: {
            attachmentItemFormGroup: FormGroup;
            attachmentItemImage: ImageInputComponent;
            attachmentFamily: AttachmentFamily;
        },
        public readonly dialogRef: MatDialogRef<CropperDialogComponent>,
        private readonly renderer: Renderer2,
        private readonly attachmentsService: AttachmentsService,
    )
    { }

    ngOnInit(): void
    {
        this.renderer
            .setProperty(
                this.cropperImage.nativeElement,
                'src',
                this.data.attachmentItemFormGroup.get('library').get('url').value,
            );

        const cropperParameters = {
            aspectRatio      : this.data.attachmentFamily.width && this.data.attachmentFamily.height ? this.data.attachmentFamily.width / this.data.attachmentFamily.height : NaN,
            viewMode         : 2,
            minContainerWidth: 0,
        };

        this.cropper = new Cropper(
            this.cropperImage.nativeElement,
            cropperParameters,
        );
    }

    ngOnDestroy(): void
    {
        this.renderer
            .setProperty(
                this.cropperImage.nativeElement,
                'src',
                '',
            );
        this.cropper.destroy();
    }

    handlerCrop(): void
    {
        this.attachmentsService
            .setCropImage(
                this.data.attachmentItemFormGroup.value,    // get values from formGroup
                this.cropper.getData(true),                 // true to get data rounded
            )
            .subscribe(data =>
            {
                this.data.attachmentItemFormGroup.patchValue({
                    ...data.attachment,
                    // set attachment image like changed
                    isChanged: true,
                });

                // set form like dirty
                this.data.attachmentItemFormGroup.markAsDirty();
            });
    }
}
