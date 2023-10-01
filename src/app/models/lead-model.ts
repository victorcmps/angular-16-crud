export interface LeadModel {
  readonly id: number;
  readonly cnpj: string;
  readonly razaoSocial: string;
  readonly cep: string;
  readonly endereco: string;
  readonly numero: string;
  readonly complemento: string;
  readonly bairro: string;
  readonly cidade: string;
  readonly uf: string;
}
