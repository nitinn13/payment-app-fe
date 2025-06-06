import type {  Transaction } from "./types"

export async function getUsers() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    { id: "1", name: "Alex Chen", upiId: "alex@neonpay", status: "online" },
    { id: "2", name: "Sarah Kim", upiId: "sarah@neonpay", status: "online" },
    { id: "3", name: "Mike Johnson", upiId: "mike@neonpay", status: "offline" },
  ]
}


export async function getBalance(): Promise<number | null> {
  try {
    const response = await fetch(
      'https://payment-app-backend-dulq.onrender.com/user/my-balance',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch balance')
    }

    const data = await response.json()

    return data?.balance?.balance ?? null
  } catch (error) {
    console.error('Error fetching balance:', error)
    return null
  }
}


export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(
      'https://payment-app-backend-dulq.onrender.com/transaction/my-transactions',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch transactions')
    }

    const result = await response.json()
    return result.transactions || []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}



export async function getMyDetails() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { name: "Neo", email: "neo@neonpay.com", upiId: "neo@neonpay" }
}

