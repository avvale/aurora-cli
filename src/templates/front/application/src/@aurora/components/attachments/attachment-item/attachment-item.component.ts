import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageInputComponent } from '@aurora/components/image-input';
import { first, merge } from 'rxjs';
import { AttachmentTranslatePipe } from '../attachment-translations/attachment-translate.pipe';
import { DownloadService } from '../download.service';
import { SizeFormatPipe } from '../pipes/size-format.pipe';
import { Attachment, AttachmentFamily, CropType } from './../attachments.types';

@Component({
    selector       : 'au-attachment-item',
    templateUrl    : './attachment-item.component.html',
    styleUrls      : ['./attachment-item.component.scss'],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        AttachmentTranslatePipe, AsyncPipe, FormsModule, ImageInputComponent, NgIf, NgForOf, ReactiveFormsModule, SizeFormatPipe,
    ],
})
export class AttachmentItemComponent implements OnInit//, //ControlValueAccessor
{
    @Input() formGroupName: string;
    @Input() families: AttachmentFamily[] = [];

    @Output() enableCrop: EventEmitter<{
        attachmentItemFormGroup: FormGroup;
        attachmentItemImage: ImageInputComponent;
    }> = new EventEmitter();
    @Output() removeItem: EventEmitter<{
        attachmentItemFormGroup: FormGroup;
    }> = new EventEmitter();

    @ViewChild('image', { static: false }) image: ImageInputComponent;
    @ViewChild('openOver', { static: true }) openOver;
    @ViewChild('closeOver', { static: true }) closeOver;

    showCropButton = false;

    // get attachment item form group
    get formGroup(): FormGroup
    {
        return this.controlContainer.control as FormGroup;
    }

    get attachmentFamily(): AttachmentFamily
    {
        return <AttachmentFamily>this.families.find(family => family.id === this.formGroup.get('familyId').value);
    }

    get attachment(): Attachment
    {
        return <Attachment>this.formGroup.value;
    }

    constructor(
        private readonly renderer: Renderer2,
        private readonly downloadService: DownloadService,
        @Optional() private controlContainer: ControlContainer,
    )
    { /**/ }

    ngOnInit(): void
    {
        this.renderer.listen(this.openOver.nativeElement, 'click', $event =>
        {
            this.renderer.addClass($event.target.closest('.attachment-item'), 'covered');
        });

        this.renderer.listen(this.closeOver.nativeElement, 'click', $event =>
        {
            this.renderer.removeClass($event.target.closest('.attachment-item'), 'covered');
        });

        this.setShowCropButton();

        merge(
            this.formGroup.get('alt').valueChanges,
            this.formGroup.get('title').valueChanges,
        )
            .pipe(first())
            .subscribe(value => this.formGroup.get('isChanged').setValue(true));
    }

    activeCropHandler(): void
    {
        // click to active cropper
        if (this.formGroup.get('familyId').value !== '')
        {
            this.enableCrop
                .emit({
                    attachmentItemFormGroup: this.formGroup,
                    attachmentItemImage    : this.image,
                });
        }
    }

    handlerRemoveItem(): void
    {
        this.removeItem.emit({
            attachmentItemFormGroup: this.formGroup,
        });
    }

    handlerChangeFamily($event: { target: { value: number; }; }): void
    {
        this.formGroup.get('isChanged').setValue(true);
        this.setShowCropButton();
    }

    setShowCropButton(): void
    {
        this.showCropButton = this.attachmentFamily && (
            this.attachmentFamily.fitType === CropType.FIT_CROP ||
            this.attachmentFamily.fitType === CropType.FIT_WIDTH_FREE_CROP ||
            this.attachmentFamily.fitType === CropType.FIT_HEIGHT_FREE_CROP
        ) ? true : false;
    }

    handlerDownload(): void
    {
        this.downloadService.download(this.formGroup.value);
    }
}
