import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMessageErrors, ValidationMessagesService } from '@aurora';
import { ViewBaseComponent } from './view-base.component';

@Directive()
export class ViewFormComponent extends ViewBaseComponent implements OnInit, OnDestroy
{
    fg: FormGroup;
    fb: FormBuilder;
    validationMessagesService: ValidationMessagesService;
    formErrors: FormMessageErrors = {};

    constructor()
    {
        super();

        this.fb = inject(FormBuilder);
        this.validationMessagesService = inject(ValidationMessagesService);

        // this method will be overwrite by child class
        this.createForm();
    }

    ngOnInit(): void
    {
        super.ngOnInit();

        this.validationMessagesService.subscribeForm(this.fg, this.formErrors);
    }

    // method to be overwrite by nested class
    init(): void { /**/ }

    // method to be overwrite by nested class
    createForm(): void { /**/ }
}
