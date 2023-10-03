import { Component, ViewChildren, QueryList, Input, OnInit, OnChanges, ViewChild, Renderer2, Output, EventEmitter, Optional, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AttachmentsService } from './../attachments.service';
import { AttachmentItemComponent } from './../attachment-item/attachment-item.component';
import { CropperDialogComponent } from './../cropper-dialog.component';
// import { ConfigService } from '@horus/services/config.service';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { Attachment, AttachmentFamily } from '../attachments.types';
import { log } from '@aurora';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector       : 'au-attachments',
    templateUrl    : './attachments.component.html',
    styleUrls      : ['./attachments.component.scss'],
    standalone     : true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        NgForOf, ReactiveFormsModule,
        AsyncPipe,
    ],
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AttachmentsComponent),
            multi      : true,
        },
    ],
})
export class AttachmentsComponent implements OnInit, OnChanges
{
    @Output('files') files = new EventEmitter<File[]>();
    filesContainer: File[] = []; // files uploaded across XMLHttpRequest

    private filesSubject$: BehaviorSubject<File[]> = new BehaviorSubject([]);
    get files$(): Observable<File[]>
    {
        return this.filesSubject$.asObservable();
    }


    @Input() endpoint: string; // API url where call once drop elements


    // OLD
    // Input elements
    @Input() placeholder: string;
    //@Input() form: FormGroup;
    @Input() name: string;                                 // name of input that contain attachments FormArray
    @Input() value: Attachment[];                          // array of attachments to init component
    @Input() attachmentFamilies: AttachmentFamily[] = [];  // families for AttachmentItemComponent

    // View elements
    @ViewChild('attachmentFrame', { static: true })  attachmentFrame;
    @ViewChild('attachmentMask', { static: false }) attachmentMask;
    @ViewChildren(AttachmentItemComponent) attachmentItems: QueryList<AttachmentItemComponent>;

    items: FormArray;
    attachment: FormGroup;                      // formGroup that contain attachment that will be crop
    attachmentFamily: AttachmentFamily;    // variable to contain attachment family where we take crop properties
    progress = 0;

    constructor(
        private readonly fb: FormBuilder,
        private readonly renderer: Renderer2,
        private readonly sanitizer: DomSanitizer,
        private _attachmentsService: AttachmentsService,
        private _dialog: MatDialog,
        @Optional() private controlContainer: ControlContainer,
    )
    { }

    private propagateChange: (value: any) => void;
    private onTouched: () => void;

    writeValue(attachments: Attachment[]): void
    {
        // if (attachment) this.attachment = attachment;
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
        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragenter', $event =>
        {
            this.dragEnterHandler($event);
        });
        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragover', $event =>
        {
            this._dragOverHandler($event);
        });
        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragleave', $event =>
        {
            this._dragLeaveHandler($event);
        });
        this.renderer.listen(this.attachmentFrame.nativeElement, 'drop', $event =>
        {
            this.dropHandler($event);
        });

        // if (! this.endpoint) this.endpoint = this._configService.config.restUrl + '/api/v1/admin/attachment/upload';
        if (! this.endpoint) this.endpoint = environment.api.graphql;

        //        this.form = this.form2;
        console.log('[DEBUG] AttachmentsComponent: ', this.form);
    }


    get form(): FormGroup
    {
        return this.controlContainer.control as FormGroup;
    }

    get control(): FormControl
    {
        return this.form.get('attachments') as FormControl;
    }

    ngOnChanges(): void
    {
        console.log('[DEBUG] ngOnChanges: ');
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

        log('[DEBUG] attachments: ', this.attachments.controls);
    }

    get attachments(): FormArray
    {
        return this.form.get(this.name) as FormArray;
    }

    private _setValue(attachments: Attachment[]): void
    {
        // create and set attachments FormGroup
        for (const attachment of attachments) this.attachmentItemFormGroupFactory(attachment);

        if (this.attachments.length > 0) this._disablePlaceholder();
    }

    private attachmentItemFormGroupFactory(attachment?): FormGroup
    {
        // add attachment FormGroup to attachments FormArray
        // with function attachments get FormArray
        const attachmentItemFormGroup = this.fb.group({
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
            // this field contain AttachmentLibrary value, when we try send values GraphQL expect to obtain AttachmentLibraryInput
            library: this.fb.group({
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

        if (attachment !== undefined) attachmentItemFormGroup.patchValue(attachment);

        this.attachments.push(attachmentItemFormGroup);

        return attachmentItemFormGroup;
    }

    /**
     * Methods to upload files
     */
    private dropFile($event): void
    {
        // get files after drop files on active area
        const files: File[] = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;

        this.filesSubject$.next([...this.filesSubject$.value, ...files]);

        this.files.emit(this.filesSubject$.value);

        //for (const file of files)
        //{
            // get urls across sanitizer to avoid security cross domain
            /* file.objectURL = this.sanitizer
                .bypassSecurityTrustUrl(
                    window.URL.createObjectURL(file),
                );

                console.log('[DEBUG] File: ', tt); */

            //this.filesContainer.push(file);
       // }

        //console.log('[DEBUG] Files to upload: ', this.filesContainer);
        //this.files.emit(this.filesContainer);

        /* this.fileUploaderService
            .uploadFiles(this.filesContainer) */

        // if (this.files && this.files.length > 0) this.upload();
    }

    onEnableCrop($event): void
    {
        if (environment.debug) log('[DEBUG] Trigger enableCropHandler with this event: ', $event);

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
    private dragEnterHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (!this.attachmentMask.nativeElement.classList.contains('active-mask')) this._activateMask();
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

    private dropHandler($event): void
    {
        $event.preventDefault();
        if (this.attachmentMask.nativeElement.classList.contains('active-mask'))
        {
            this._deactivateMask();
            this._disablePlaceholder();
        }
        this.dropFile($event);
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
