import { ApiProperty } from "@nestjs/swagger";
import { AppConfigKey } from "../constants";
import { IsString, IsUUID } from "class-validator";

export class AppConfigurationDto {
  @ApiProperty({ type: "string" })
  [AppConfigKey.DEFAULT_CURRENCY]?: string;
}

export type ValueOfAppConfigKey<K extends keyof AppConfigurationDto> =
  AppConfigurationDto[K];

export class UpdateAppConfigurationDto {
  @IsString()
  @IsUUID("4")
  @ApiProperty({ type: "string" })
  [AppConfigKey.DEFAULT_CURRENCY]?: string;
}
