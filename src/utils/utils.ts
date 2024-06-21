import { FiliereDto, RoleDto } from "@/models";

export const get_phone_format = (phone: string)=>{
    return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "(+228) $1 $2 $3 $4");
}

export const get_date_format = (created_at: Date)=>{
  return new Date(created_at).toLocaleDateString();
}

export const getFiliereName = (filieres: FiliereDto[], filiereId: string) => {
  console.log("iccccii: ", filieres , filiereId)
  const country = filieres.find((f: any) => f.id === filiereId);
  return country ? country.libelle : "filiere inconnu";
};

export const getRoleName = (roles: RoleDto[], roleId:string) =>{
  const role = roles.find(r => r.id === roleId);
  return role ? role.libelle : "role inconnu";
}
