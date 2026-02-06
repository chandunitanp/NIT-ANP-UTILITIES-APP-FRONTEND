export const canView = (_role: string) => true;

export const canCreate = (role: string) =>
  role === "FACULTY" || role === "ADMIN";

export const canUpdate = (role: string) =>
  role === "ADMIN";

export const canDelete = (role: string) =>
  role === "ADMIN";
