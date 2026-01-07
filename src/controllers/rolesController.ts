import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getRoles = async (req: Request, res: Response) => {
  const roles = await prisma.role.findMany({
    select: { id: true, nombre: true, descripcion: true },
    orderBy: { nombre: "asc" },
  });
  res.json(roles);
};

export const getPermisos = async (req: Request, res: Response) => {
  const permisos = await prisma.permission.findMany({
    select: { id: true, nombre: true, descripcion: true },
    orderBy: { nombre: "asc" },
  });
  res.json(permisos);
};

export const getRolePermissions = async (req: Request, res: Response) => {
  const roleId = Number(req.params.id);

  if (Number.isNaN(roleId)) {
    return res.status(400).json({ error: "ID de rol inválido" });
  }

  const role = await prisma.role.findUnique({
    where: { id: roleId },
    select: {
      id: true,
      nombre: true,
      permissions: { select: { permissionId: true } },
    },
  });

  if (!role) return res.status(404).json({ error: "Rol no encontrado" });

  const assignedIds = role.permissions.map((rp) => rp.permissionId);

  return res.json({
    roleId: role.id,
    roleName: role.nombre,
    permissionIds: assignedIds,
  });
};

export const setRolePermissions = async (req: Request, res: Response) => {
  const roleId = Number(req.params.id);
  const { permissionIds } = req.body as { permissionIds: number[] };

  if (Number.isNaN(roleId) || !Array.isArray(permissionIds)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const role = await prisma.role.findUnique({
    where: { id: roleId },
    select: { id: true, nombre: true },
  });

  if (!role) return res.status(404).json({ error: "Rol no encontrado" });

  // ✅ Buscar el permiso ROLE_MANAGE (por nombre) para proteger ADMIN
  const roleManagePerm = await prisma.permission.findUnique({
    where: { nombre: "ROLE_MANAGE" },
    select: { id: true },
  });

  if (role.nombre === "ADMIN" && roleManagePerm) {
    const hasRoleManage = permissionIds.includes(roleManagePerm.id);
    if (!hasRoleManage) {
      return res
        .status(403)
        .json({ error: "ADMIN debe conservar ROLE_MANAGE" });
    }
  }

  await prisma.$transaction([
    prisma.rolePermission.deleteMany({ where: { roleId } }),
    prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({ roleId, permissionId })),
      skipDuplicates: true,
    }),
  ]);

  return res.json({ ok: true });
};

