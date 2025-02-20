export interface SecureUploadProps {
  title: string;
  task_label: string;
  description: string[];
  downloadUrl?: string;
  additionalMetadata?: Record<string, any>;
}
