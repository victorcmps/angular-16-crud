import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { LeadModel } from 'src/app/models/lead-model';
import { AddressService } from 'src/app/services/address.service';

interface LeadFormGroupModel {
  readonly cnpj: FormControl<string | null>;
  readonly razaoSocial: FormControl<string | null>;
  readonly cep: FormControl<string | null>;
  readonly endereco: FormControl<string | null>;
  readonly numero: FormControl<string | null>;
  readonly complemento: FormControl<string | null>;
  readonly bairro: FormControl<string | null>;
  readonly cidade: FormControl<string | null>;
  readonly uf: FormControl<string | null>;
}

@Component({
  selector: 'app-leads-form',
  templateUrl: './leads-form.component.html',
  styleUrls: ['./leads-form.component.scss'],
})
export class LeadsFormComponent implements OnInit {
  @Output() public saveButtonClicked = new EventEmitter();
  @Input() public formData: LeadModel | null = null;
  @Input() public saving: boolean = false;
  public loadingCep: boolean = false;

  public leadForm = new FormGroup<LeadFormGroupModel>({
    cnpj: new FormControl<string>(
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(14),
        CustomValidators.validateCNPJ,
      ])
    ),
    razaoSocial: new FormControl<string>('', [Validators.required]),
    cep: new FormControl<string>(
      '',
      Validators.compose([Validators.maxLength(8), Validators.required])
    ),
    endereco: new FormControl<string>('', [Validators.required]),
    numero: new FormControl<string>('', [Validators.required]),
    complemento: new FormControl<string>(''),
    bairro: new FormControl<string>('', [Validators.required]),
    cidade: new FormControl<string>('', [Validators.required]),
    uf: new FormControl<string>('', [Validators.required]),
  });

  public constructor(private readonly addressService: AddressService) {}

  public ngOnInit(): void {
    if (this.formData) {
      this.setupForm(this.formData);
    }
  }

  public readonly searchForAddressByCep = (cep: string | null): void => {
    if (cep) {
      this.loadingCep = true;
      this.addressService.getAddressByCep(cep).subscribe((address) => {
        this.loadingCep = false;
        if (!!!address.erro) {
          this.leadForm.patchValue({
            endereco: address.logradouro,
            bairro: address.bairro,
            numero: '',
            cidade: address.localidade,
            uf: address.uf,
          });
        } else {
          this.leadForm.controls['cep'].setErrors({ invalidCep: true });
        }
      });
    }
  };

  private readonly setupForm = (lead: LeadModel): void => {
    this.leadForm.setValue({
      cnpj: lead.cnpj,
      razaoSocial: lead.razaoSocial,
      cep: lead.cep,
      endereco: lead.endereco,
      numero: lead.numero,
      complemento: lead.complemento,
      bairro: lead.bairro,
      cidade: lead.cidade,
      uf: lead.uf,
    });
  };
}
