// src/types.ts
export interface UserType {
  id: string;
  name: string;
  email: string;
  upiId: string;
  username: string;
  verified: boolean;
  avatar?: string;
  createdAt: string;
  password : string;
}

export interface Transaction {
  id: string;
  amount: number;
  transactionType: 'credit' | 'debit' | 'topup' | 'sent' | 'received';
  receiverUpiId?: string;
  senderUpiId?: string;
  category?: string;
  status?: string;
  createdAt: string;
  receiverId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface TopUpProps {
  onTopUpSuccess: () => void;
}

export interface HeaderProps {
  currentPage?: string;
  notificationCount?: number;
  showSearch?: boolean;
  showMobileMenu?: boolean;
  onMobileMenuToggle?: () => void;
}
export interface Contact {
  id: string;
  name: string;
  upiId: string;
  verified: boolean;
  avatar?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface SendMoneyForm {
  amount: number;
  receiverUpiId: string;
  note?: string;
}
export interface ContactWithStatus extends Contact {
  status: string;
}