export interface AddressModel {
  readonly cep: string;
  readonly logradouro: string;
  readonly complemento: string;
  readonly bairro: string;
  readonly localidade: string;
  readonly uf: string;
  readonly ibge: string;
  readonly gia: string;
  readonly ddd: string;
  readonly siafi: string;
  readonly erro?: boolean;
}
