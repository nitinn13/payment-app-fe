import type { UserType, Transaction, Contact } from "./types"

const API_BASE_URL = 'https://payment-app-backend-dulq.onrender.com'

async function apiClient(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json()
}

export async function getBalance(): Promise<number | null> {
  try {
    const data = await apiClient('/user/my-balance')
    return data?.balance?.balance ?? null
  } catch (error) {
    console.error('Error fetching balance:', error)
    return null
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const result = await apiClient('/transaction/my-transactions')
    return result.transactions || []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const result = await apiClient('/user/all-users')
    return result.contacts || result.users || result.data || []
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return []
  }
}

export async function getUserProfile(): Promise<UserType | null> {
  try {
    const response = await apiClient('/user/me');
    
    // Transform the API response to match UserType
    const userData = response.user || response.data;
    if (!userData) return null;

    return {
      id: userData.id || '',
      name: userData.name || '',
      email: userData.email || '',
      upiId: userData.upiId || '',
      username: userData.username || '',
      verified: Boolean(userData.verified),
      avatar: userData.avatar,
      createdAt: userData.createdAt || new Date().toISOString(),
      password: ''
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}