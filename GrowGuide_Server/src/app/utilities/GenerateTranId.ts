export const generate_transaction_id = (name: string) => {
  const timestamp = Date.now()
  const random_number = Math.floor(Math.random() * 100000)
  return `TXN-${name.substring(0, 2)}-${timestamp}-${random_number}`
}
