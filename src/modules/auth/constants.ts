import { RoleDTO } from "./types";

export const ROOT_PERMISSION = "root";

export enum Permissions {
  DASHBOARD = "dashboard",
  ORDERS = "orders",
  BOM = "bom",
  PRODUCTION = "production",
  SUPPLY = "supply",
  SUPPLY_TYPE = "supply-type",
  WASTE = "waste",
  PRODUCTS = "products",

  ENUMS = "enums",
  CURRENCY = "currency",

  EDIT_USER = "users",
}

export const allPermissions = Object.values(Permissions);

export const roles: RoleDTO[] = [
  {
    id: "root",
    name: "Root",
    permissions: allPermissions,
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
