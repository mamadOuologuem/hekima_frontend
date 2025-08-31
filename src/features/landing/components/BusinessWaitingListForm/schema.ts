import { z } from 'zod';

export const CompanySizes = ['Entre 1 et 10', 'Entre 10 et 100', 'Entre 100 et 500', 'Plus de 500'] as const;
export type CompanySize = (typeof CompanySizes)[number];
const CompanySizeEnum = z.enum(CompanySizes, { message: 'Requis' });

export const CommonSectorOfActivities = [
  'E-commerce',
  'Éducation',
  'Santé',
  'Finance',
  'Immobilier',
  'Tourisme',
  'Restauration',
  'Transport',
  'Agriculture',
  'Industrie',
  'Art et Culture',
  'Technologie',
  'Mode et Beauté',
  'Énergie',
  'Environnement'
] as const;

export const BusinessWaitingListFormSchema = z.object({
  email: z.string().email('Invalide'),
  businessPhone: z.string().min(5, 'Requis'),
  businessSize: CompanySizeEnum,
  sectorOfActivity: z.string().min(1, 'Requis'),
  pains: z.array(z.string().min(1, 'Requis')).min(1, 'Requis'),
  websiteUrl: z.string().url('Invalide'),
  businessName: z.string().min(1, 'Requis'),
  needs: z.string().min(1, 'Requis')
});

export type BusinessWaitingListFormValues = z.infer<typeof BusinessWaitingListFormSchema>;
