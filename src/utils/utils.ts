import { FiliereDto } from "@/models";

export const get_phone_format = (phone: string)=>{
    return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "(+228) $1 $2 $3 $4");
}

export const get_date_format = (created_at: Date)=>{
  return new Date(created_at).toLocaleDateString();
}

export const getFiliereName = (filieres: FiliereDto[], filiereId: string) => {
  const country = filieres.find((f: any) => f.id === filiereId);
  return country ? country.libelle : "filiere inconnu";
};

