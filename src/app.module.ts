import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./configuration";
import { SupabaseModule } from "./modules/supabase/supabase.module";
import { APP_GUARD } from "@nestjs/core";
import { SupabaseAuthGuard } from "./modules/auth/guards/supabase.guard";

@Module({
  imports: [
    ConfigModule.forRoot<ReturnType<typeof configuration>>({
      isGlobal: true,
      load: [configuration],
    }),
    SupabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class AppModule {}
