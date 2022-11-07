import { IsNotEmpty, IsNumber, IsString, Length, Max } from 'class-validator';

export class CreateDataDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 140)
  product!: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(9999)
  price!: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 140)
  user!: string;
}

export default CreateDataDto;
