import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Configuration } from "src/configuration";

@Injectable()
export class SupabaseService implements OnModuleInit {
  private _client: SupabaseClient;
  private _admin: SupabaseClient;

  constructor(private configService: ConfigService<Configuration>) {}

  onModuleInit() {
    const {
      anonKey = "",
      url = "",
      serviceRoleKey = "",
    } = this.configService.getOrThrow<Configuration["supabase"]>("supabase");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this._client = createClient(url, anonKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this._admin = createClient(url, serviceRoleKey);
  }

  get client() {
    return this._client;
  }

  get admin() {
    return this._admin;
  }
}
