import {IsNotEmpty} from "class-validator";

export class HandlerCategory {
  @IsNotEmpty()
  category: string;
}
