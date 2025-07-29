import { Component, forwardRef, ViewChild, ElementRef, OnDestroy, HostBinding, Optional, Self, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/*
    example to use au-version-input component:

    <mat-form-field
        appearance="outline"
        class="col-3"
    >
        <mat-label>{{ t('tools.Version') }}</mat-label>
        <au-version-input formControlName="version"/>
        <mat-error>{{ formErrors?.version | async }}</mat-error>
    </mat-form-field>
*/

@Component({
    selector: 'au-version-input',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => VersionInputComponent),
        },
    ],
    templateUrl: './version-input.component.html',
    styles: [`
        input {
            width: 2.5rem;
            text-align: center;
        }
   `],
})
export class VersionInputComponent implements MatFormFieldControl<string>, ControlValueAccessor, OnDestroy
{
    static nextId = 0;

    @ViewChild('majorInput') majorInput!: ElementRef;
    @ViewChild('minorInput') minorInput!: ElementRef;
    @ViewChild('patchInput') patchInput!: ElementRef;

    majorCtrl = new FormControl('');
    minorCtrl = new FormControl('');
    patchCtrl = new FormControl('');

    // MatFormFieldControl impl
    @HostBinding() id = `version-input-${VersionInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby') describedBy = '';
    @HostBinding('class.floating') shouldLabelFloat = true;

    private _value: string = '';
    private _placeholder: string = '';
    private _required = false;
    private _disabled = false;
    stateChanges = new Subject<void>();
    focused = false;
    touched = false;
    controlType = 'version-input';
    errorState = false;

    constructor(
        private fm: FocusMonitor,
        private elRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
    )
    {
        if (this.ngControl != null)
        {
            this.ngControl.valueAccessor = this;
        }

        this.fm.monitor(elRef.nativeElement, true).subscribe(origin =>
        {
            this.focused = !!origin;
            this.stateChanges.next();
        });

        this.majorCtrl.valueChanges.subscribe(() => this.emitVersion());
        this.minorCtrl.valueChanges.subscribe(() => this.emitVersion());
        this.patchCtrl.valueChanges.subscribe(() => this.emitVersion());
    }

    get empty()
    {
        return !(this.majorCtrl.value || this.minorCtrl.value || this.patchCtrl.value);
    }

    get value(): string
    {
        return this._value;
    }

    set value(val: string)
    {
        this._value = val;
        const clean = val?.startsWith('v') ? val.slice(1) : val;
        const [maj, min, pat] = (clean || '').split('.');
        this.majorCtrl.setValue(maj || '', { emitEvent: false });
        this.minorCtrl.setValue(min || '', { emitEvent: false });
        this.patchCtrl.setValue(pat || '', { emitEvent: false });
        this.stateChanges.next();
    }

    get placeholder(): string
    {
        return this._placeholder;
    }

    @Input()
    set placeholder(plh)
    {
        this._placeholder = plh;
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean
    {
        return this._required;
    }

    set required(value: boolean)
    {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean
    {
        return this._disabled;
    }

    set disabled(value: boolean)
    {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.disable() : this.enable();
        this.stateChanges.next();
    }

    setDescribedByIds(ids: string[])
    {
        this.describedBy = ids.join(' ');
    }

    onContainerClick()
    {
        this.majorInput?.nativeElement.focus();
    }

    writeValue(value: string): void
    {
        this.value = value;
    }

    registerOnChange(fn: (val: string) => void): void
    {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void
    {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void
    {
        this.disabled = isDisabled;
    }

    private emitVersion()
    {
        const version = `v${this.majorCtrl.value || '0'}.${this.minorCtrl.value || '0'}.${this.patchCtrl.value || '0'}`;
        this._value = version;
        this.onChange(version);
        this.stateChanges.next();
    }

    onKey(event: KeyboardEvent, part: 'major' | 'minor' | 'patch')
    {
        const next = {
            major: this.minorInput,
            minor: this.patchInput,
            patch: null,
        }[part];

        if ((event.key === '.' || event.key === 'Tab') && next)
        {
            event.preventDefault();
            (next).nativeElement.focus();
        }

        if (!/^\d$/.test(event.key) &&
            !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', '.'].includes(event.key)
        )
        {
            event.preventDefault();
        }

        this.touched = true;
        this.onTouched();
    }

    disable()
    {
        this.majorCtrl.disable();
        this.minorCtrl.disable();
        this.patchCtrl.disable();
    }

    enable()
    {
        this.majorCtrl.enable();
        this.minorCtrl.enable();
        this.patchCtrl.enable();
    }

    onChange: (val: string) => void = () => {};
    onTouched: () => void = () => {};

    ngOnDestroy()
    {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }
}