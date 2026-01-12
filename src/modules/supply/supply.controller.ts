import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from "@nestjs/common";
import { SupplyService } from "./supply.service";
// import { CreateSupplyDto, UpdateSupplyDto } from "./dto/supply.dto";

@Controller("supply")
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  // @Post()
  // create(@Body() createSupplyDto: CreateSupplyDto) {
  //   return this.supplyService.create(createSupplyDto);
  // }

  // @Get()
  // findAll() {
  //   return this.supplyService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.supplyService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateSupplyDto: UpdateSupplyDto) {
  //   return this.supplyService.update(+id, updateSupplyDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.supplyService.remove(+id);
  // }
}
