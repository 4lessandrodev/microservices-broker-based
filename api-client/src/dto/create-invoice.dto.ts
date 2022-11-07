import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsUUID()
  paymentId!: string;

  @IsNotEmpty()
  @IsString()
  product!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @IsString()
  user!: string;
}

export default CreateInvoiceDto;
