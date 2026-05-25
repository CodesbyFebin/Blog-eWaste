export interface DeviceDna {
  angle: string;
  persona: string;
}

export interface JsonLdData {
  articleSection?: string;
  interactionStatistic?: {
    type: string;
    count: number;
  };
}

export interface Article {
  title: string;
  slug: string;
  category: string;
  date: string;
  dna: DeviceDna;
  metaDescription: string;
  keywords: string;
  relatedSlugs: string[];
  wordCount: number;
  qualityScore: number;
  discover: boolean;
  discover_thumbnail: string;
  discover_emotion: string;
  trending_weight: number;
  featured: boolean;
  geo_focus: string;
  entities: string[];
  llm_summary: string;
  content: string; // MDX/Markdown content
  jsonld?: JsonLdData;
  author: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    bio: string;
    linkedin?: string;
  };
}

export interface KochiEntity {
  name: string;
  type: 'regulatory' | 'standard' | 'legislation' | 'locality' | 'concept';
  url: string;
  description: string;
  nationalContext?: string;
}

export interface ValuedDevice {
  brand: string;
  model: string;
  year: number;
  condition: 'A' | 'B' | 'C';
  specs?: string;
  estimatedValue: number;
  co2SavedKg: number;
  metalGrammage: {
    copper: number;
    gold: number;
    aluminum: number;
  };
}

export interface Certificate {
  id: string;
  serialNumber: string;
  clientName: string;
  deviceModel: string;
  dateIssued: string;
  destructionMethod: string;
  recyclerReference: string;
  technicianName: string;
  status: 'certified' | 'pending' | 'failed';
}

export interface EsgReport {
  clientName: string;
  deviceCount: number;
  weightTonnage: number;
  co2OffsetMetricTons: number;
  circularRecyclingRate: number; // e.g. 98.4
  goldRecoveredGrams: number;
  copperRecoveredKg: number;
}
