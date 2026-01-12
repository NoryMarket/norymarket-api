import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID } from "class-validator";

export class MultiDeleteEntityDTO {
  @IsArray()
  @IsString({ each: true })
  @IsUUID("4", { each: true })
  @ApiProperty({ type: "string", isArray: true })
  ids: string[];
}
