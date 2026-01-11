import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ConfigurationService } from "./configuration.service";
import {
  CreateCurrencyTypeDTO,
  CurrencyTypeDTO,
  UpdateCurrencyTypeDTO,
} from "./types/currencyType";

import { ApiOkResponse } from "@nestjs/swagger";
import {
  CreateCurrencyExchangeDTO,
  CurrencyExchangeDTO,
  DeleteCurrencyExchangesDTO,
} from "./types/currencyExchange";
import { Public } from "../auth/decorators/public";

@Controller("configuration")
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post("currencyType")
  @ApiOkResponse({ type: CurrencyTypeDTO })
  async createCurrencyType(
    @Body() data: CreateCurrencyTypeDTO,
  ): Promise<CurrencyTypeDTO> {
    return await this.configurationService.createCurrencyType(data);
  }

  @Patch("currencyType/:currencyTypeId")
  @ApiOkResponse({ type: CurrencyTypeDTO })
  async updateCurrencyType(
    @Param("currencyTypeId", ParseUUIDPipe) id: string,
    @Body() data: UpdateCurrencyTypeDTO,
  ) {
    return await this.configurationService.updateCurrencyType(id, data);
  }

  @Delete("currencyType/:currencyTypeId")
  async deleteCurrencyType(@Param("currencyTypeId", ParseUUIDPipe) id: string) {
    return await this.configurationService.deleteCurrencyType(id);
  }

  @ApiOkResponse({ type: CurrencyTypeDTO, isArray: true })
  @Get("currencyTypes")
  async getCurrencyType() {
    return await this.configurationService.getCurrencyTypes();
  }

  @ApiOkResponse({ type: CurrencyExchangeDTO, isArray: true })
  @Get("currencyTypes/exchanges")
  @Public()
  async getCurrencyExchanges() {
    return await this.configurationService.getCurrencyExchanges();
  }

  @ApiOkResponse({ type: CurrencyExchangeDTO, isArray: true })
  @Get("currencyTypes/exchanges/:currencyTypeId")
  @Public()
  async getCurrencyTypeExchangeHistory(
    @Param("currencyTypeId", ParseUUIDPipe) id: string,
  ) {
    return await this.configurationService.getCurrencyExchangeHistory(id);
  }

  @ApiOkResponse({ type: CurrencyExchangeDTO })
  @Post("currencyTypes/exchanges")
  @Public()
  async createCurrencyExchange(@Body() data: CreateCurrencyExchangeDTO) {
    return await this.configurationService.createCurrencyExchange(data);
  }

  @Public()
  @Delete("currencyTypes/exchanges")
  @ApiOkResponse({ type: "string", isArray: true })
  async deleteCurrencyExchanges(@Body() { ids }: DeleteCurrencyExchangesDTO) {
    return await this.configurationService.deleteCurrencyExchanges(ids);
  }
}
