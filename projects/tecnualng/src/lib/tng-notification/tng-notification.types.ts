export type TngNotificationType = 'success' | 'error' | 'warning' | 'info' | 'default';

export type TngNotificationPosition = 
  | 'top-left' 
  | 'top-right' 
  | 'top-center' 
  | 'bottom-left' 
  | 'bottom-right' 
  | 'bottom-center';

export interface TngNotificationConfig {
  id: string;
  message: string;
  type: TngNotificationType;
  duration?: number;
  position?: TngNotificationPosition;
  clipboard?: string;
  closable?: boolean;
  icon?: string;
  pauseOnHover?: boolean;
}

export type TngNotificationOptions = Omit<TngNotificationConfig, 'id' | 'message' | 'type'> & {
  type?: TngNotificationType;
};
