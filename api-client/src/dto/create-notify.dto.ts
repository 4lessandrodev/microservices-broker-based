import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNotifyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 140)
  message!: string;
}

export default CreateNotifyDto;
