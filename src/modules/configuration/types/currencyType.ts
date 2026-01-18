import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Length, Min } from "class-validator";
import { CurrencyType } from "src/generated/prisma/client";
import { CurrencyExchangeDTO } from "./currencyExchange";

export class CreateCurrencyTypeDTO {
  @ApiProperty({ type: "string" })
  @IsString()
  name: string;

  @ApiProperty({ type: "string" })
  @IsString()
  shortName: string;

  @IsString()
  @Length(1)
  @ApiProperty({ type: "string" })
  symbol: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ type: "number" })
  decimals: number;
}

export class UpdateCurrencyTypeDTO {
  @ApiProperty({ type: "string" })
  @IsString()
  name?: string;

  @ApiProperty({ type: "string" })
  @IsString()
  shortName?: string;

  @IsString()
  @Length(1)
  @ApiProperty({ type: "string" })
  symbol?: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ type: "number" })
  decimals?: number;
}

export class CurrencyTypeDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  shortName: string;

  @ApiProperty({ type: "string" })
  symbol: string;

  @ApiProperty({ type: "number" })
  decimals: number;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: CurrencyExchangeDTO, isArray: true })
  exchanges?: CurrencyExchangeDTO[];

  constructor(
    { id, name, shortName, updatedAt, decimals, symbol }: CurrencyType,
    currencyExchanges?: CurrencyExchangeDTO[],
  ) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.updatedAt = updatedAt;
    this.decimals = decimals;
    this.symbol = symbol;

    this.exchanges = currencyExchanges;
  }
}
