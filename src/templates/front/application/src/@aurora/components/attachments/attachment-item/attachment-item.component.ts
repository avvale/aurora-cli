import { Component, Input, Output, OnInit, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminAttachmentFamily } from 'app/main/admin/admin.types';
import { CropType } from './../attachments.types';
import * as _ from 'lodash';

@Component({
    selector   : 'hr-attachment-item',
    templateUrl: './attachment-item.component.html',
    styleUrls  : ['./attachment-item.component.scss'],
})

export class AttachmentItemComponent implements OnInit
{
    @Input() form: FormGroup;
    @Input() name: string; // name of form array attachment
    @Input() index: number; // id to identify attachment item
    @Input() attachmentFamilies: AdminAttachmentFamily[] = [];
    @Input() attachment: FormGroup;
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('openOver', { static: true }) openOver;
    @ViewChild('closeOver', { static: true }) closeOver;
    @ViewChild('image', { static: false }) image;
    attachmentFamilySelect: AdminAttachmentFamily;
    showCropButton = false;

    constructor(
        private readonly renderer: Renderer2,
    ) {}

    ngOnInit(): void
    {
        this.renderer
            .listen(
                this.openOver.nativeElement,
                'click',
                $event => this.renderer.addClass($event.target.closest('.attachment-item'), 'covered'),
            );

        this.renderer.listen(
            this.closeOver.nativeElement,
            'click',
            $event => this.renderer.removeClass($event.target.closest('.attachment-item'), 'covered'),
        );

        this.attachmentFamilySelect = <AdminAttachmentFamily>_.find(this.attachmentFamilies, { uuid: this.attachment.get('familyUuid').value });

        this.setShowCropButton();
    }

    onRemoveItem($event): void
    {
        this.removeItem
            .emit({
                attachment: this.attachment,
            });
    }

    onChangeAttachmentFamily($event): void
    {
        // get $event.target.value with ngValue that return a object
        this.attachmentFamilySelect =  <AdminAttachmentFamily>_.find(this.attachmentFamilies, { uuid: $event.target.value });

        this.setShowCropButton();
    }

    activeCropHandler($event): void
    {
        // click to active cropper
        if (this.attachment.get('familyUuid').value !== '')
        {
            this.enableCrop.emit({
                image     : this.image, // add to event image to be updated if crop image
                attachment: this.attachment,
                familyUuid: this.attachment.get('familyUuid').value,
            });
        }
    }

    setShowCropButton(): void
    {
        this.showCropButton = this.attachmentFamilySelect && (
            this.attachmentFamilySelect.fitTypeUuid === CropType.FIT_CROP ||
            this.attachmentFamilySelect.fitTypeUuid === CropType.FIT_WIDTH_FREE_CROP ||
            this.attachmentFamilySelect.fitTypeUuid === CropType.FIT_HEIGHT_FREE_CROP
        ) ? true : false;
    }

    download(): void
    {
        const attachmentValue = this.attachment.value;

        const file = {
            url     : attachmentValue.url,
            filename: attachmentValue.file_name,
            pathname: attachmentValue.base_path.slice(attachmentValue.base_path.indexOf('app/public')) + '/' + attachmentValue.file_name,
            mime    : attachmentValue.mime,
            size    : attachmentValue.size,
        };
    }
}
