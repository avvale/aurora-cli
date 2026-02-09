/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonLang } from '@apps/common';
import { LangService } from '@apps/common/lang';
import {
  Action,
  ActionScope,
  Crumb,
  defaultDetailImports,
  log,
  mapActions,
  SnackBarInvalidFormComponent,
  uuid,
  ViewDetailComponent,
} from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'common-lang-detail',
  templateUrl: './lang-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...defaultDetailImports, MatCheckboxModule, MatSelectModule],
})
@ActionScope('common::lang.detail')
export class LangDetailComponent extends ViewDetailComponent {
  // ---- customizations ----
  // ..

  // Object retrieved from the database request,
  // it should only be used to obtain uninitialized
  // data in the form, such as relations, etc.
  // It should not be used habitually, since the source of truth is the form.
  managedObject: WritableSignal<CommonLang> = signal(null);

  // breadcrumb component definition
  breadcrumb: Crumb[] = [
    { translation: 'App' },
    { translation: 'common.Langs', routerLink: ['/common/lang'] },
    { translation: 'common.Lang' },
  ];

  constructor(private readonly langService: LangService) {
    super();
  }

  // this method will be called after the ngOnInit of
  // the parent class you can use instead of ngOnInit
  init(): void {
    /**/
  }

  onSubmit($event): void {
    // we have two nested forms, we check that the submit comes from the button
    // that corresponds to the main form to the main form
    if (
      $event.submitter.getAttribute('form') !==
      $event.submitter.form.getAttribute('id')
    ) {
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }

    // manage validations before execute actions
    if (this.fg.invalid) {
      log('[DEBUG] Error to validate form: ', this.fg);
      this.validationMessagesService.validate();

      this.snackBar.openFromComponent(SnackBarInvalidFormComponent, {
        data: {
          message: `${this.translocoService.translate('InvalidForm')}`,
          textButton: `${this.translocoService.translate('InvalidFormOk')}`,
        },
        panelClass: 'error-snackbar',
        verticalPosition: 'top',
        duration: 10000,
      });
      return;
    }

    this.actionService.action({
      id: mapActions(this.currentViewAction.id, {
        'common::lang.detail.new': 'common::lang.detail.create',
        'common::lang.detail.edit': 'common::lang.detail.update',
      }),
      isViewAction: false,
    });
  }

  createForm(): void {
    /* eslint-disable key-spacing */
    this.fg = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(36),
          Validators.maxLength(36),
        ],
      ],
      name: ['', [Validators.required, Validators.maxLength(128)]],
      image: ['', [Validators.maxLength(1022)]],
      iso6392: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      iso6393: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      ietf: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      customCode: ['', [Validators.maxLength(64)]],
      dir: [null, [Validators.required]],
      sort: null,
      isActive: [false, [Validators.required]],
    });
    /* eslint-enable key-spacing */
  }

  async handleAction(action: Action): Promise<void> {
    // add optional chaining (?.) to avoid first call where behaviour subject is undefined
    switch (action?.id) {
      /* #region common actions */
      case 'common::lang.detail.new':
        this.fg.get('id').setValue(uuid());
        break;

      case 'common::lang.detail.edit':
        this.langService.lang$
          .pipe(takeUntil(this.unsubscribeAll$))
          .subscribe((item) => {
            this.managedObject.set(item);
            this.fg.patchValue(item);
          });
        break;

      case 'common::lang.detail.create':
        try {
          await lastValueFrom(
            this.langService.create<CommonLang>({
              object: this.fg.value,
            }),
          );

          this.snackBar.open(
            `${this.translocoService.translate('common.Lang')} ${this.translocoService.translate('Created.M')}`,
            undefined,
            {
              verticalPosition: 'top',
              duration: 3000,
            },
          );

          this.router.navigate(['common/lang']);
        } catch (error) {
          log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
        }
        break;

      case 'common::lang.detail.update':
        try {
          await lastValueFrom(
            this.langService.updateById<CommonLang>({
              object: this.fg.value,
            }),
          );

          this.snackBar.open(
            `${this.translocoService.translate('common.Lang')} ${this.translocoService.translate('Saved.M')}`,
            undefined,
            {
              verticalPosition: 'top',
              duration: 3000,
            },
          );

          this.router.navigate(['common/lang']);
        } catch (error) {
          log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
        }
        break;
      /* #endregion common actions */
    }
  }
}
