export const DOCUMENT_TYPES = ['CC', 'CE', 'NIT'] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];
