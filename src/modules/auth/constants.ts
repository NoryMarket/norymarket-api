import { RoleDTO } from "./types";

export const ROOT_PERMISSION = "root";

export enum Permissions {
  EDIT_USER = "users",
  SUPPLY_TYPE = "supply-type",
  SUPPLY = "supply",
  BOM = "bom",
  ORDERS = "orders",
  DASHBOARD = "dashboard",
  ENUMS = "enums",
  CURRENCY_EXCHANGE = "currency-exchange",
}

export const roles: RoleDTO[] = [
  {
    id: "root",
    name: "Root",
    permissions: [ROOT_PERMISSION],
  },
  {
    id: "manager",
    name: "Manager",
    permissions: [
      Permissions.SUPPLY,
      Permissions.SUPPLY_TYPE,
      Permissions.DASHBOARD,
      Permissions.ORDERS,
      Permissions.BOM,
    ],
  },
];
