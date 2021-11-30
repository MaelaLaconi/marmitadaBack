import {IsNotEmpty, IsString} from "class-validator";

export class HandlerSortParams {
  @IsNotEmpty()
  @IsString()
  sortMethod: string;
}
