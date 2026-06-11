export type AlertRecipient = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notifyByEmail: boolean;
  notifyBySms: boolean;
  active: boolean;
};

export type AlertMethod = "email" | "sms";

export type AlertStatus = "pending" | "sent" | "failed";