
export function checkAccessToken(tokenExpireTime:string):boolean{
  const currentDate = new Date()
  const tokenExpireDate = new Date(tokenExpireTime)
  return tokenExpireDate>currentDate
}

export function formatPhoneNumber(value: string) {
  if (value.length === 1 && (value[0] === "7" || value[0] === "8")) {
    return "+7"
  }
  if (value.length < 3) {
    return value
  }
  if (value[0] === "+") {
    const phoneNumber = value.replace(/[^\d]/g, '').replace(/^[7]/g, "")
    console.log(`in func ${phoneNumber}`)
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return "+7" + " " + phoneNumber;
    if (phoneNumberLength < 4) return `+7 ${phoneNumber}`;
    if (phoneNumberLength < 7) {
      return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    }
    
    return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
  }
}