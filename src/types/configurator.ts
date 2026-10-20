import { LucideIcon } from 'lucide-react';

export type LookFeel = 'minimalista-corporativo' | 'high-tech-dark' | 'ecommerce-comercial';

export type SoftwareModuleId = 
  | 'base_landing'
  | 'ecommerce_cart'
  | 'interactive_quoter'
  | 'auth_dashboard'
  | 'api_automation';

export type SlaTier = 'standard' | 'express' | 'enterprise';

export interface SoftwareModuleDef {
  id: SoftwareModuleId;
  name: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  basePrice: number; // MXN
  days: number;
  required?: boolean;
  category: 'core' | 'transaccional' | 'interactivo' | 'seguridad' | 'backend';
  tags: string[];
}

export interface AddonDef {
  id: string;
  name: string;
  desc: string;
  price: number;
  days: number;
  category: 'infra' | 'marketing' | 'ia';
}

export interface ConfigState {
  theme: LookFeel;
  activeModules: Record<SoftwareModuleId, boolean>;
  addons: Record<string, boolean>;
  pagesCount: number; // 1 to 15
  sla: SlaTier;
  clientInfo?: {
    name: string;
    company: string;
    email: string;
    phone: string;
    notes: string;
  };
}

export interface QuoteCalculation {
  basePrice: number;
  modulesPrice: number;
  addonsPrice: number;
  pagesPrice: number;
  slaPrice: number;
  subtotal: number;
  iva: number;
  total: number;
  estimatedDays: number;
  includedFeatures: string[];
  activeModulesCount: number;
}

export interface SavedSoftwareQuote {
  id: string;
  clientName: string;
  clientCompany?: string;
  clientEmail?: string;
  clientPhone: string;
  clientNotes?: string;
  config: ConfigState;
  calculation: QuoteCalculation;
  createdAt: string;
  status: 'pendiente' | 'contactado' | 'en_desarrollo' | 'aprobada';
}
