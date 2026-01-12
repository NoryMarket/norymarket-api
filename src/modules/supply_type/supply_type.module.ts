import { Module } from "@nestjs/common";
import { SupplyTypeService } from "./supply_type.service";
import { SupplyTypeController } from "./supply_type.controller";

@Module({
  controllers: [SupplyTypeController],
  providers: [SupplyTypeService],
})
export class SupplyTypeModule {}
