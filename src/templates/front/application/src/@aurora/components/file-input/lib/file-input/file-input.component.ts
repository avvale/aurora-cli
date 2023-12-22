import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, DoCheck, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Optional, Output, Renderer2, Self } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FileInput } from '../model/file-input.model';
import { FileInputMixinBase } from './file-input-mixin';

// component develop from https://merlosy.github.io/ngx-material-file-input/
@Component({
    selector   : 'ngx-mat-file-input',
    templateUrl: './file-input.component.html',
    styleUrls  : ['./file-input.component.css'],
    standalone : true,
    providers  : [
        {
            provide    : MatFormFieldControl,
            useExisting: FileInputComponent,
        },
    ],
})
export class FileInputComponent extends FileInputMixinBase implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit, OnDestroy, DoCheck
{
    static nextId = 0;

    focused = false;
    controlType = 'file-input';
    @Output() files = new EventEmitter<File | File[]>();

    @Input() autofilled = false;

    private _placeholder: string;
    private _required = false;
    private _multiple: boolean;

    @Input() valuePlaceholder: string;
    @Input() accept: string | null = null;
    @Input() errorStateMatcher: ErrorStateMatcher;

    @HostBinding() id = `ngx-mat-file-input-${FileInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') describedBy = '';

    setDescribedByIds(ids: string[]): void
    {
        this.describedBy = ids.join(' ');
    }

    @Input()
    set value(fileInput: FileInput | null)
    {
        if (fileInput)
        {
            this.writeValue(fileInput);
            this.stateChanges.next();
        }
    }
    get value(): FileInput | null
    {
        return this.empty ?
            null :
            new FileInput(
                this._elementRef.nativeElement.value && Array.isArray(this._elementRef.nativeElement.value) ?
                    this._elementRef.nativeElement.value :
                    this._elementRef.nativeElement.value ?
                        [this._elementRef.nativeElement.value] :
                        [],
            );
    }

    @Input()
    set multiple(value: boolean | string)
    {
        this._multiple = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get multiple(): boolean
    {
        return this._multiple;
    }

    @Input()
    set placeholder(plh)
    {
        this._placeholder = plh;
        this.stateChanges.next();
    }
    get placeholder(): string
    {
        return this._placeholder;
    }

    /**
     * Whether the current input has files
     */
    get empty(): boolean
    {
        return !this._elementRef.nativeElement.value || this._elementRef.nativeElement.value.length === 0;
    }

    @HostBinding('class.mat-form-field-should-float')
    get shouldLabelFloat(): boolean
    {
        return this.focused || !this.empty || this.valuePlaceholder !== undefined;
    }

    @Input()
    set required(req: boolean | string)
    {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    get required(): boolean
    {
        return this._required;
    }

    @HostBinding('class.file-input-disabled')
    get isDisabled(): boolean
    {
        return this.disabled;
    }
    @Input()
    set disabled(dis: boolean | string)
    {
        this.setDisabledState(coerceBooleanProperty(dis));
        this.stateChanges.next();
    }
    get disabled(): boolean
    {
        return this._elementRef.nativeElement.disabled;
    }

    onContainerClick(event: MouseEvent): void
    {
        if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled)
        {
            this._elementRef.nativeElement.querySelector('input').focus();
            this.focused = true;
            this.open();
        }
    }

    /**
     * @see https://angular.io/api/forms/ControlValueAccessor
     */
    constructor(
        private fm: FocusMonitor,
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional()
        @Self()
        public ngControl: NgControl,
        @Optional() public _parentForm: NgForm,
        @Optional() public _parentFormGroup: FormGroupDirective,
    )
    {
        super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl, new Subject<void>());

        if (this.ngControl != null)
        {
            this.ngControl.valueAccessor = this;
        }
        fm.monitor(_elementRef.nativeElement, true).subscribe(origin =>
        {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    private _onChange = (_: any): void => { /**/ };
    private _onTouched = (): void => { /**/ };

    get fileNames(): string
    {
        return this.value ? this.value.fileNames : this.valuePlaceholder;
    }

    writeValue(obj: FileInput | null): void
    {
        this._renderer
            .setProperty(
                this._elementRef.nativeElement,
                'value',
                this.multiple ?
                    obj instanceof FileInput ?
                        obj.files :
                        null
                    :
                    obj instanceof FileInput ?
                        obj.files[0] :
                        null,
            );
    }

    registerOnChange(fn: (_: any) => void): void
    {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this._onTouched = fn;
    }

    /**
     * Remove all files from the file input component
     * @param [event] optional event that may have triggered the clear action
     */
    clear(event?: Event): void
    {
        if (event)
        {
            event.preventDefault();
            event.stopPropagation();
        }
        this.value = new FileInput([]);
        this._elementRef.nativeElement.querySelector('input').value = null;
        this._onChange(this.value);
    }

    @HostListener('change', ['$event'])
    change(event: Event): void
    {
        const fileList: FileList | null = (<HTMLInputElement>event.target).files;
        const fileArray: File[] = [];
        if (fileList)
        {
            for (let i = 0; i < fileList.length; i++)
            {
                fileArray.push(fileList[i]);
            }
        }
        this.value = new FileInput(fileArray);

        if (this.multiple)
        {
            this.files.emit(fileArray);
            this._onChange(fileArray);
        }
        else
        {
            this.files.emit(fileArray[0]);
            this._onChange(fileArray[0]);

        }
        this.files.emit(fileArray);
        this._onChange(fileArray[0]);
    }

    @HostListener('focusout')
    blur(): void
    {
        this.focused = false;
        this._onTouched();
    }

    setDisabledState(isDisabled: boolean): void
    {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }

    ngOnInit(): void
    {
        this.multiple = coerceBooleanProperty(this.multiple);
    }

    open(): void
    {
        if (!this.disabled)
        {
            this._elementRef.nativeElement.querySelector('input').click();
        }
    }

    ngOnDestroy(): void
    {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this._elementRef.nativeElement);
    }

    ngDoCheck(): void
    {
        if (this.ngControl)
        {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

}
