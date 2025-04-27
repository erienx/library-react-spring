import { useAuth } from "../components/providers/AuthProvider";
import { User } from "../types/types";


export function useHasAccess(allowedRoles?: User['role'][]): boolean {
  const { currentUser } = useAuth();

  if (!currentUser) return false;
  if (!allowedRoles) return true;

  return allowedRoles.includes(currentUser.role);
}