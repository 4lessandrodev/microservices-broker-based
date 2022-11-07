import { IsNotEmpty, IsUUID } from "class-validator";

export class CreatePatientDto {
  @IsNotEmpty()
  @IsUUID()
  paymentId!: string;

  @IsNotEmpty()
  name!: string;
}

export default CreatePatientDto;
