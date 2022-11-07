export class CreateInvoiceDto {
  paymentId!: string;
  product!: string;
  price!: number;
  user!: string;
}

export default CreateInvoiceDto;
