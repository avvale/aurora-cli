import { Component, ViewChildren, QueryList, Input, OnInit, OnChanges, ViewChild, Renderer2, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AttachmentsService } from './../attachments.service';
import { AttachmentItemComponent } from './../attachment-item/attachment-item.component';
import { CropperDialogComponent } from './../cropper-dialog.component';
// import { ConfigService } from '@horus/services/config.service';
import { AdminAttachmentFamily, AdminAttachment } from 'app/main/admin/admin.types';
import { environment } from 'environments/environment';
import * as _ from 'lodash';

@Component({
    selector   : 'au-attachments',
    templateUrl: './attachments.component.html',
    styleUrls  : ['./attachments.component.scss'],
    providers  : [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AttachmentsComponent),
            multi      : true,
        },
    ],
    standalone: true,
})
export class AttachmentsComponent implements OnInit, OnChanges
{
    @Input() placeholder: string;
    @Input('value')
    set value(val: any[])
    {
        this._value = val;
    }

    get value(): any[] | null
    {
        return this._value;
    }
    private _value: any[] | null;

    isDisabled: boolean;

    // OLD
    // Input elements
    
    @Input() form: FormGroup;
    @Input() name: string;                                      // name of input that contain attachments FormArray
    @Input() value: AdminAttachment[];                          // array of attachments to init component
    @Input() attachmentFamilies: AdminAttachmentFamily[] = [];  // families for AttachmentItemComponent
    @Input() endpoint: string;                                  // API url where call once drop elements
    // @Input() withCredentials: boolean;                       // property for XMLHttpRequest object

    // View elements
    @ViewChild('attachmentFrame', { static: true })  attachmentFrame;
    @ViewChild('attachmentMask', { static: false }) attachmentMask;
    @ViewChildren(AttachmentItemComponent) attachmentItems: QueryList<AttachmentItemComponent>;

    items: FormArray;
    files: File[];                              // files uploaded across XMLHttpRequest
    attachment: FormGroup;                      // formGroup that contain attachment that will be crop
    attachmentFamily: AdminAttachmentFamily;    // variable to contain attachment family where we take crop properties
    progress = 0;

    constructor(
        private _fb: FormBuilder,
        private renderer: Renderer2,
        private _sanitizer: DomSanitizer,
        private _attachmentsService: AttachmentsService,
        private _dialog: MatDialog,
        //private _configService: ConfigService,
    ) { }

    registerOnTouched = (): void => { /**/ };
    propagateChange = (_: any): void => { /**/ };
    registerOnChange = (fn: (value: any) => void): void => { this.propagateChange = fn; };
    setDisabledState = (isDisabled: boolean): void => { this.isDisabled = isDisabled; };

    writeValue(value: any): void
    {
        this._value = value;
    }








    /// OLD

    ngOnInit(): void
    {
        // TODO, use drag and drop angular native
        this.renderer
            .listen(
                this.attachmentFrame.nativeElement,
                'dragenter',
                $event => this._dragEnterHandler($event),
            );

        this.renderer
            .listen(
                this.attachmentFrame.nativeElement,
                'dragover',
                $event => this._dragOverHandler($event),
            );

        this.renderer
            .listen(
                this.attachmentFrame.nativeElement,
                'dragleave',
                $event => this._dragLeaveHandler($event),
            );

        this.renderer
            .listen(
                this.attachmentFrame.nativeElement,
                'drop',
                $event => this._dropHandler($event),
            );

        //if (! this.endpoint) this.endpoint = this._configService.config.restUrl + '/api/v1/admin/attachment/upload';
    }

    ngOnChanges(): void
    {
        // load values from input
        // set value from component, to init with values only
        // when the component is created or change value input
        if (this.value) this._setValue(this.value);
    }

    /**
     * Function to manage drop items over attachment component
     *
     * @param event
     */
    drop(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(this.attachments.controls, event.previousIndex, event.currentIndex);

        // set attachments sort
        for (let i = 0; this.attachments.controls.length > i; i++)
        {
            this.attachments.at(i).get('sort').setValue(i);
        }
        this._touchFormAttachments();

        if (environment.debug) console.log('DEBUG - attachments: ', this.attachments.controls);
    }

    get attachments(): FormArray
    {
        return this.form.get(this.name) as FormArray;
    }

    private _setValue(attachments: AdminAttachment[]): void
    {
        // create and set attachments FormGroup
        for (const attachment of attachments) this._createAttachment(attachment);

        if (this.attachments.length > 0) this._disablePlaceholder();
    }

    private _createAttachment(attachment?): void
    {
        // add attachment FormGroup to attachments FormArray
        // with function attachments get FormArray
        const attachmentFg = this._fb.group({
            id             : '',
            uuid           : '',
            langUuid       : '',
            attachableType : '',
            attachableUuid : '',
            familyUuid     : '',
            sort           : '',
            alt            : '',
            title          : '',
            pathname       : ['', Validators.required],
            filename       : ['', Validators.required],
            url            : ['', Validators.required],
            mime           : ['', Validators.required],
            extension      : ['', Validators.required],
            size           : ['', Validators.required],
            width          : '',
            height         : '',
            libraryUuid    : '',
            libraryFilename: '',

            // need implement attachment library fields to avoid send __typename field that is included in response from graphQL
            // this field contain AdminAttachmentLibrary value, when we try send values GraphQL expect to obtain AdminAttachmentLibraryInput
            library: this._fb.group({
                id       : '',
                uuid     : '',
                name     : '',
                pathname : '',
                filename : '',
                url      : '',
                mime     : '',
                extension: '',
                size     : '',
                width    : '',
                height   : '',
                data     : '',
            }),
            data      : '',
            isUploaded: false,
            isChanged : false,
        });

        if (attachment !== undefined) attachmentFg.patchValue(attachment);

        this.attachments.push(attachmentFg);
    }

    /**
     * Methods to upload files
     */
    private _dropFile($event): void
    {
        this.files = [];

        // get files after drop files on active area
        const files = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;

        for (let i = 0; i < files.length; i++)
        {
            const file = files[i];
            // get urls across sanitizer to avoid security cross domain
            file.objectURL = this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
            this.files.push(files[i]);
        }

        if (this.files && this.files.length > 0) this._upload();
    }

    private _upload(): void
    {
        const xhr = new XMLHttpRequest();
        const formData = new FormData(); // create forma data to add files and inputs

        // this.onBeforeUpload.emit({
        //    'xhr': xhr,
        //    'formData': formData
        // });

        // add files to formData to send to server
        for (const file of this.files)
        {
            formData.append('files[]', file, file.name);
            if (environment.debug) console.log('DEBUG - append file: ', file);
        }

        // progress var
        /*xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
              this.progress = Math.round((e.loaded * 100) / e.total);
            }
          }, false);*/

        // set function  onreadystatechange that will be called
        xhr.onreadystatechange = () =>
        {
            if (xhr.readyState === 4)
            {
                // this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300)
                {
                    const response = <any>JSON.parse(xhr.response);

                    // save attachments from file uploaded
                    for (const attachment of response.data.tmpAttachments)
                    {
                        attachment.isUploaded   = true;                                     // mark all attachments that have been loaded
                        attachment.sort         = this.attachments.controls.length + 1;     // set sort value
                        this._createAttachment(attachment);                                 // create formGroup and patch value
                        this._touchFormAttachments();
                    }
                }
                else
                {
                    // this.onError.emit({xhr: xhr, files: this.files});
                }

                // when finish xhr request, empty files array for the following uploads
                this.files = [];
            }
        };

        xhr.open('POST', this.endpoint, true);
        // xhr.withCredentials = this.withCredentials;

        xhr.send(formData);
    }

    onEnableCrop($event): void
    {
        if (environment.debug) console.log('DEBUG - trigger enableCropHandler with this event: ', $event);

        // show dialog image
        const dialog = this._dialog.open(CropperDialogComponent, {
            data: {
                attachment      : $event.attachment,
                attachmentFamily: _.find(this.attachmentFamilies, { uuid: $event.familyUuid }),
                form            : this.form,
            },
            height: '90%',
            width : '90%',
        });
    }

    onRemoveItem($event): void
    {
        const attachment = $event.attachment as FormGroup;

        this._attachmentsService.
            deleteAttachment(attachment.value)
            .subscribe(({ data }) =>
            {
                // file deleted
                for (let i = 0; this.attachments.length; i++)
                {
                    const formGroup = this.attachments.at(i) as FormGroup;

                    if (formGroup.get('filename').value === attachment.get('filename').value)
                    {
                        // delete attachment from FormArray
                        this.attachments.removeAt(i);

                        this._touchFormAttachments();

                        // break to not continue with for, because length attachments has changed
                        break;
                    }
                }

                // show placeholder if has not any item
                if (this.attachments.length === 0)
                {
                    this._enablePlaceholder();
                }
            });
    }

    private _touchFormAttachments(): void
    {
        this.form.markAsDirty();
        this.form.markAsTouched();
    }

    // methods to manage layers
    private _dragEnterHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (! this.attachmentMask.nativeElement.classList.contains('active-mask')) this._activateMask();
        }
    }

    private _dragOverHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (! this.attachmentMask.nativeElement.classList.contains('active-mask')) this._activateMask();
        }
        else
        {
            if (this.attachmentMask.nativeElement.classList.contains('active-mask')) this._deactivateMask();
        }
    }

    private _dragLeaveHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (this.attachmentMask.nativeElement.classList.contains('active-mask')) this._deactivateMask();
        }
    }

    private _dropHandler($event): void
    {
        $event.preventDefault();
        if (this.attachmentMask.nativeElement.classList.contains('active-mask'))
        {
            this._deactivateMask();
            this._disablePlaceholder();
        }
        this._dropFile($event);
    }

    private _enablePlaceholder(): void
    {
        this.renderer.removeClass(this.attachmentFrame.nativeElement, 'has-attachment');
    }

    private _disablePlaceholder(): void
    {
        this.renderer.addClass(this.attachmentFrame.nativeElement, 'has-attachment');
    }

    private _activateMask(): void
    {
        this.renderer.addClass(this.attachmentMask.nativeElement, 'active-mask');
    }

    private _deactivateMask(): void
    {
        this.renderer.removeClass(this.attachmentMask.nativeElement, 'active-mask');
    }
}
