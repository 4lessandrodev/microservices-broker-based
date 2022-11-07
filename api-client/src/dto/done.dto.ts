import { IsNotEmpty, IsUUID } from "class-validator";

export class DoneDto {
  @IsNotEmpty()
  @IsUUID()
  paymentId!: string;
}

export default DoneDto;
