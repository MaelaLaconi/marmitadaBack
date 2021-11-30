import {IsNotEmpty} from "class-validator";

export class HandlerName {
  @IsNotEmpty()
  name: string;
}
