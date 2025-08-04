import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgForOf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { log } from '@aurora';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AttachmentTranslatePipe } from '../attachment-translations/attachment-translate.pipe';
import { Attachment, AttachmentFamily } from '../attachments.types';
import { AttachmentItemComponent } from './../attachment-item/attachment-item.component';
import { AttachmentsService } from './../attachments.service';
import { CropperDialogComponent } from './../cropper-dialog.component';

/******************************************************************************
 * AttachmentsComponent is a component that wraps AttachmentItemComponent,
 * it is not an NG_VALUE_ACCESSOR component, it manages the creation of
 * AttachmentItemComponent, for this reason the attachments are transmitted
 * through the attachments input, and based on the data received,
 * AttachmentItemComponents are created, which are the ones that manage
 * the data within the formArrayName of the formArrayName indicated in
 * the input formArrayName.
 ******************************************************************************/
@Component({
    selector       : 'au-attachments',
    templateUrl    : './attachments.component.html',
    styleUrls      : ['./attachments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports        : [
        NgForOf, ReactiveFormsModule,
        AttachmentTranslatePipe, AsyncPipe, AttachmentItemComponent, DragDropModule,
    ],
})
export class AttachmentsComponent implements OnInit, AfterViewInit
{
    @Input() formArrayName: string;
    @Input() families: AttachmentFamily[] = [];
    @Input() set attachments(attachments: Attachment[])
    {
        attachments
            .sort((a, b) => a.sort - b.sort) // sort attachments by sort field
            .forEach(attachment =>
            {
                this.attachmentsFormArray.push(
                    this.attachmentItemFormGroupFactory({
                        ...attachment,
                        sort: this.attachmentsFormArray.length,
                    }),
                );

                if (attachment.isUploaded) this.markAsDirty();
            });

        log('[DEBUG] attachments: ', this.attachmentsFormArray.controls);
    }

    @Output('droppedFiles') droppedFiles = new EventEmitter<File[]>();

    // View elements
    @ViewChild('attachmentFrame', { static: true }) attachmentFrame: ElementRef;
    @ViewChild('attachmentMask', { static: false }) attachmentMask: ElementRef;

    get formGroup(): FormGroup
    {
        return this.controlContainer.control.parent as FormGroup;
    }

    get attachmentsFormArray(): FormArray
    {
        return this.formGroup.get(this.formArrayName) as FormArray;
    }

    constructor(
        private readonly fb: FormBuilder,
        private readonly renderer: Renderer2,
        private readonly attachmentsService: AttachmentsService,
        private readonly confirmationService: FuseConfirmationService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialog,
        @Optional() private controlContainer: ControlContainer,
    )
    { }

    ngOnInit(): void
    {
        // listen events
        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragenter', $event =>
        {
            this.dragEnterHandler($event);
        });

        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragover', $event =>
        {
            this.dragOverHandler($event);
        });

        this.renderer.listen(this.attachmentFrame.nativeElement, 'dragleave', $event =>
        {
            this.dragLeaveHandler($event);
        });

        this.renderer.listen(this.attachmentFrame.nativeElement, 'drop', $event =>
        {
            this.dropHandler($event);
        });
    }

    ngAfterViewInit(): void
    {
        if (this.attachmentsFormArray.length > 0)
        {
            this.deactivateMask();
            this.disablePlaceholder();
        }
    }

    handlerEnableCrop($event): void
    {
        log('[DEBUG] Trigger enableCropHandler with this event: ', $event);

        this.dialog.open(CropperDialogComponent, {
            data: {
                attachmentItemFormGroup: $event.attachmentItemFormGroup,
                attachmentItemImage    : $event.attachmentItemImage,
                attachmentFamily       : this.families.find(family => family.id === $event.attachmentItemFormGroup.get('familyId').value),
            },
            height: '90%',
            width : '90%',
        });
    }

    // methods to manage layers
    private dragEnterHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (!this.attachmentMask.nativeElement.classList.contains('active-mask')) this.activateMask();
        }
    }

    private dragOverHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (! this.attachmentMask.nativeElement.classList.contains('active-mask')) this.activateMask();
        }
        else
        {
            if (this.attachmentMask.nativeElement.classList.contains('active-mask')) this.deactivateMask();
        }
    }

    private dragLeaveHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentFrame.nativeElement)
        {
            if (this.attachmentMask.nativeElement.classList.contains('active-mask')) this.deactivateMask();
        }
    }

    private dropHandler($event): void
    {
        $event.preventDefault();
        if (this.attachmentMask.nativeElement.classList.contains('active-mask'))
        {
            this.deactivateMask();
            this.disablePlaceholder();
        }
        // get files after drop files on active area
        const filesObject = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;
        // convert associate files object to array
        const filesArray = [...filesObject];

        this.droppedFiles.emit(filesArray);
    }

    private enablePlaceholder(): void
    {
        this.renderer.removeClass(this.attachmentFrame.nativeElement, 'has-attachment');
    }

    private disablePlaceholder(): void
    {
        this.renderer.addClass(this.attachmentFrame.nativeElement, 'has-attachment');
    }

    private activateMask(): void
    {
        this.renderer.addClass(this.attachmentMask.nativeElement, 'active-mask');
    }

    private deactivateMask(): void
    {
        this.renderer.removeClass(this.attachmentMask.nativeElement, 'active-mask');
    }

    /***************************************************************
     * Function to manage drag and drop items, to sort attachments *
     **************************************************************/
    sortDropHandler(event: CdkDragDrop<string[]>): void
    {
        moveItemInArray(
            this.attachmentsFormArray.controls,
            event.previousIndex,
            event.currentIndex,
        );

        // set attachments sort
        for (const [index, formControl] of this.attachmentsFormArray.controls.entries())
        {
            if (formControl.get('sort').value === index) continue;
            formControl.get('sort').setValue(index);
            formControl.get('isChanged').setValue(true);
        }

        this.markAsDirty();

        log('[DEBUG] attachments: ', this.attachmentsFormArray.controls);
    }

    attachmentItemFormGroupFactory(file?: Attachment): FormGroup
    {
        // add attachment item FormGroup to attachments FormArray
        const attachmentItemFormGroup = this.fb.group({
            id                  : '',
            familyId            : null,
            attachableId        : '',
            langId              : null,
            sort                : null,
            alt                 : '',
            title               : '',
            originFilename      : ['', Validators.required],
            filename            : ['', Validators.required],
            mimetype            : ['', Validators.required],
            extension           : ['', Validators.required],
            relativePathSegments: [],
            width               : null,
            height              : null,
            size                : [0, Validators.required],
            url                 : ['', Validators.required],
            isCropable          : false,
            isCropped           : false,
            isUploaded          : false,
            isChanged           : false,
            libraryId           : '',
            libraryFilename     : '',
            meta                : null,
            library             : this.fb.group({
                id                  : ['', Validators.required],
                originFilename      : ['', Validators.required],
                filename            : ['', Validators.required],
                mimetype            : ['', Validators.required],
                extension           : ['', Validators.required],
                relativePathSegments: [],
                width               : [0, Validators.required],
                height              : [0, Validators.required],
                size                : [0, Validators.required],
                url                 : ['', Validators.required],
                meta                : null,
            }),
        });

        if (file) attachmentItemFormGroup.patchValue(file);

        return attachmentItemFormGroup;
    }

    handlerRemoveItem($event): void
    {

        const deleteDialogRef = this.confirmationService.open({
            title  : `Título de borrar attachmenbt`,
            message: 'texto de borrar attachment',
            icon   : {
                show : true,
                name : 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show : true,
                    label: 'Texto Borrar',
                    color: 'warn',
                },
                cancel: {
                    show : true,
                    label: 'Texto Cancelar',
                },
            },
            dismissible: true,
        });

        deleteDialogRef.afterClosed()
            .subscribe(async result =>
            {
                if (result === 'confirmed')
                {
                    const attachment = $event.attachmentItemFormGroup as FormGroup;

                    this.attachmentsService.
                        deleteAttachment(attachment.value)
                        .subscribe(attachment =>
                        {
                            // file deleted
                            for (let i = 0; this.attachmentsFormArray.length; i++)
                            {
                                const formGroup = this.attachmentsFormArray.at(i) as FormGroup;

                                if (formGroup.get('filename').value === attachment.filename)
                                {
                                    // delete attachment from FormArray
                                    this.attachmentsFormArray.removeAt(i);

                                    this.changeDetectorRef.markForCheck();

                                    this.markAsDirty();

                                    // break to not continue with for, because length attachments has changed
                                    break;
                                }
                            }

                            // show placeholder if has not any item
                            if (this.attachmentsFormArray.length === 0)
                            {
                                this.enablePlaceholder();
                            }
                        });
                }
            });
    }

    private markAsDirty(): void
    {
        this.formGroup.markAsDirty();
        this.formGroup.markAsTouched();
    }
}
