import { Directive, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormMessageErrors, ValidationMessagesService } from '@aurora/components';
import { ViewBaseComponent } from './view-base.component';

@Directive()
export class ViewFormComponent extends ViewBaseComponent implements OnDestroy
{
    fg: FormGroup;
    fb: FormBuilder;
    validationMessagesService: ValidationMessagesService;
    formErrors: FormMessageErrors = {};

    constructor(
        protected injector: Injector,
    )
    {
        super(injector);

        this.fb = this.injector.get(FormBuilder);
        this.validationMessagesService = this.injector.get(ValidationMessagesService);

        // this method will be overwrite by child class
        this.createForm();
    }

    ngOnInit(): void
    {
        this.validationMessagesService.subscribeForm(this.fg, this.formErrors);

        // evaluates the actions to be taken
        // into method defined in the nested class
        this.init();
    }

    // method to be overwrite by nested class
    init(): void { /**/ }

    // method to be overwrite by nested class
    createForm(): void { /**/ }
}
