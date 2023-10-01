import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { LeadModel } from 'src/app/models/lead-model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-leads-form',
  templateUrl: './leads-form.component.html',
  styleUrls: ['./leads-form.component.scss'],
})
export class LeadsFormComponent implements OnInit {
  @Input() public formData: LeadModel | null = null;

  public leadForm = this.formBuilder.group({
    cnpj: [
      '',
      Validators.compose([
        Validators.maxLength(14),
        Validators.required,
        CustomValidators.validateCNPJ,
      ]),
    ],
    razaoSocial: ['', Validators.required],
    cep: [
      '',
      Validators.compose([Validators.maxLength(8), Validators.required]),
    ],
    endereco: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    uf: ['', Validators.required],
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly addressService: AddressService
  ) {}

  public ngOnInit(): void {
    if (this.formData) {
      this.setupForm(this.formData);
    }
  }

  public readonly searchForAddressByCep = (cep: string | null): void => {
    if (cep) {
      this.addressService.getAddressByCep(cep).subscribe((address) => {
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
