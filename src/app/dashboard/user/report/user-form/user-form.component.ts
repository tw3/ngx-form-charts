import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormState } from '../../../../shared/enums/form-state.enum';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output() userSaved: EventEmitter<User> = new EventEmitter<User>();

  formGroup: FormGroup;
  isFormValid: boolean;

  @ViewChild('formElem') formElem: HTMLFormElement;

  private formState: FormState;
  private valueChangeSub: Subscription;
  private statusChangeSub: Subscription;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formState = FormState.READY;
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroyForm();
  }

  get isReady(): boolean { return this.formState === FormState.READY; }
  get isSaving(): boolean { return this.formState === FormState.SAVING; }
  get isSaved(): boolean { return this.formState === FormState.SAVED; }
  get isError(): boolean { return this.formState === FormState.ERROR; }

  save(): void {
    if (!this.isFormValid) {
      return;
    }

    // get the new user object from the form
    const newUser: User = this.formGroup.value as User;

    // emit the new user
    this.userSaved.emit(newUser);
  }

  setFormState(formState: FormState) {
    this.formState = formState;
    if (this.formState === FormState.SAVING) {
      this.formGroup.disable();
      return;
    }
    this.formGroup.enable();
  }

  resetForm(evt: Event = null): void {
    this.formElem.resetForm();
    this.formGroup.markAsUntouched();
    const hasEvent: boolean = !!evt;
    if (hasEvent) {
      evt.preventDefault();
    }
  }

  private buildForm(): void {
    const formBuildConfig: AnyHash = this.getFormBuilderConfig();
    this.formGroup = this.formBuilder.group(formBuildConfig);
    this.valueChangeSub = this.formGroup.valueChanges
      .subscribe(this.onFormGroupValueChanged.bind(this));
    this.statusChangeSub = this.formGroup.statusChanges
      .subscribe(this.onFormGroupStatusChanged.bind(this));
    this.updateIsFormValid();
  }

  private getFormBuilderConfig(): AnyHash {
    const formBuilderConfig: AnyHash = {
      name: ['a', [Validators.required]],
      friends: ['b', [Validators.required]],
      age: ['1',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('\^[0-9]+$'),
          Validators.maxLength(3)
        ])
      ],
      weight: ['2',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('\^[0-9]+$'),
          Validators.maxLength(3),
        ])
      ],
    };
    return formBuilderConfig;
  }

  private onFormGroupValueChanged(): void {
  }

  private onFormGroupStatusChanged(status: string): void {
    this.updateIsFormValid();
  }

  private updateIsFormValid(): void {
    this.isFormValid = this.isControlGood(this.formGroup);
  }

  private isControlGood(c: AbstractControl): boolean {
    return !c.invalid && !c.pending;
  }

  private destroyForm(): void {
    if (this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
    if (this.statusChangeSub) {
      this.statusChangeSub.unsubscribe();
    }
    this.formGroup = null;
  }

}
