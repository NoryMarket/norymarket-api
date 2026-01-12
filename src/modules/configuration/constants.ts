export enum AppConfigKey {
  DEFAULT_CURRENCY = "default-currency",
}

export const appConfigKeys = Object.values(AppConfigKey);

export type Config<K extends AppConfigKey, V = string> = {
  key: K;
  value: V;
};
export type AppConfiguration = Config<AppConfigKey.DEFAULT_CURRENCY, string>;
