import { Component, Input, Output, OnInit, EventEmitter, ViewChild, Renderer2, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Attachment, AttachmentFamily, CropType, File } from './../attachments.types';
import * as _ from 'lodash';
import { SizeFormatPipe } from '../pipes/size-format.pipe';


// import { DownloadService } from '@horus/services/download.service';
// declare const jQuery: any; // jQuery definition

@Component({
    selector       : 'au-attachment-item',
    templateUrl    : './attachment-item.component.html',
    styleUrls      : ['./attachment-item.component.scss'],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        FormsModule, ReactiveFormsModule, SizeFormatPipe,
    ],
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AttachmentItemComponent),
            multi      : true,
        },
    ],
})

export class AttachmentItemComponent implements OnInit
{
    attachment: Attachment;




    @Input() form: FormGroup;
    @Input() name: string; // name of form array attachment
    @Input() index: number; // id to identify attachment item
    @Input() attachmentFamilies: AttachmentFamily[] = [];
    //@Input() attachment: FormGroup;
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('openOver', { static: true }) openOver;
    @ViewChild('closeOver', { static: true }) closeOver;
    @ViewChild('image', { static: false }) image;
    attachmentFamilySelect: AttachmentFamily;
    showCropButton = false;

    constructor(
        private _renderer: Renderer2,
        // private _downloadService: DownloadService
    )
    {}

    private propagateChange: (value: any) => void;
    private onTouched: () => void;

    writeValue(attachment: Attachment): void
    {
        if (attachment) this.attachment = attachment;
    }

    // registers a callback function is called by the forms API on initialization
    registerOnChange(fn: (value: any) => void): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }




    ngOnInit(): void
    {
        this._renderer.listen(this.openOver.nativeElement, 'click', $event =>
        {
            this._renderer.addClass($event.target.closest('.attachment-item'), 'covered');
        });

        this._renderer.listen(this.closeOver.nativeElement, 'click', $event =>
        {
            this._renderer.removeClass($event.target.closest('.attachment-item'), 'covered');
        });

        //this.attachmentFamilySelect = <AttachmentFamily>_.find(this.attachmentFamilies, { uuid: this.attachment.get('familyUuid').value });

        this.setShowCropButton();
    }

    onRemoveItem($event): void
    {
        this.removeItem.emit({
            attachment: this.attachment,
        });

        /* jQuery($event.target.closest('au-attachment-item')).fadeOut(300, function ()
        {
            jQuery($event.target.closest('au-attachment-item')).remove();
        }); */
    }

    onChangeAttachmentFamily($event): void
    {
        // get $event.target.value with ngValue that return a object
        this.attachmentFamilySelect =  <AttachmentFamily>_.find(this.attachmentFamilies, { uuid: $event.target.value });

        this.setShowCropButton();
    }

    activeCropHandler($event): void
    {
        /*
        // click to active cropper
        if (this.attachment.get('familyUuid').value !== '')
        {
            this.enableCrop.emit({
                image     : this.image, // add to event image to be updated if crop image
                attachment: this.attachment,
                familyUuid: this.attachment.get('familyUuid').value,
            });
        }
        */
    }

    setShowCropButton(): void
    {
        this.showCropButton = this.attachmentFamilySelect && (
            this.attachmentFamilySelect.fitType === CropType.FIT_CROP ||
            this.attachmentFamilySelect.fitType === CropType.FIT_WIDTH_FREE_CROP ||
            this.attachmentFamilySelect.fitType === CropType.FIT_HEIGHT_FREE_CROP
        ) ? true : false;
    }

    download(): void
    {
        /*const attachmentValue = this.attachment.value;

        const file = {
            url     : attachmentValue.url,
            filename: attachmentValue.file_name,
            pathname: attachmentValue.base_path.slice(attachmentValue.base_path.indexOf('app/public')) + '/' + attachmentValue.file_name,
            mime    : attachmentValue.mime,
            size    : attachmentValue.size,
        };*/

        // call download service
        // this._downloadService.download(<File>file);
    }
}
