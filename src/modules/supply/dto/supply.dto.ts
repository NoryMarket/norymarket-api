import { ApiProperty } from "@nestjs/swagger";
import { Supply } from "src/generated/prisma/client";

export class CreateSupplyDto {}

export class UpdateSupplyDto {}

export class SupplyDTO {
  @ApiProperty({ type: "string" })
  id: string;

  @ApiProperty({ type: "number" })
  quantity: number;

  @ApiProperty({ type: "string" })
  description?: string;

  constructor({
    id,
    quantity,
    // batchPrice,
    // buyCurrencyRateId,
    description,
    // supplyTypeColorId,
    // supplyTypeSizeId,
    // supplyTypeId,
  }: Supply) {
    this.id = id;
    this.description = description ?? undefined;
    this.quantity = quantity;
  }
}
