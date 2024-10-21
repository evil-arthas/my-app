
export function checkAccessToken(tokenExpireTime: string): boolean {
  const currentDate = new Date()
  const tokenExpireDate = new Date(tokenExpireTime)
  return tokenExpireDate > currentDate
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

export function formatINN(value: string) {
  const INN = value.replace(/[^\d]/g, '')
  const INNLenght = INN.length
  if (INNLenght < 3) return INN
  if (INNLenght < 6) {
    return `${INN.slice(0, 2)} ${INN.slice(2)}`
  }
  if (INNLenght < 10) {
    return `${INN.slice(0, 2)} ${INN.slice(2, 5)} ${INN.slice(5)}`
  }
  return `${INN.slice(0, 2)} ${INN.slice(2, 5)} ${INN.slice(5, 8)} ${INN.slice(8, 10)}`
}

export function checkIsINNValide(INN: string) {
  //   Алгоритм проверки ИНН
  // 1.Алгоритм проверки 10-го значного ИНН.
  // ИНН.10. 1)Находим произведения первых 9-ти цифр ИНН на специальные множители соответственно. 
  //9 множителей ( 2 4 10 3 5 9 4 6 8 ).
  // ИНН.10. 2) Складываем все 9-ть получившихся произведений.
  // ИНН.10. 3) Получившуюся сумму делим на число 11 и извлекаем целую часть частного от деления.
  // ИНН.10. 4) Умножаем получившееся число на 11.
  // ИНН.10. 5) Сравниваем числа получившиеся на шаге 2 
  //и шаге 4, их разница, и есть контрольное число, которое и должно 
  //равняться 10-й цифре в ИНН. (Если контрольное число получилось равным 10-ти, 
  //в этом случае принимаем контрольное число равным 0.)
  const arrayOfCoefficient = [2, 4, 10, 3, 5, 9, 4, 6, 8]
  const INNAsArray = INN.split("")

  if (!(INNAsArray.length === 10)) {
    INNAsArray.splice(10)
  }

  const INNAsArrayOfNumbers = INNAsArray.map((element) => {
    return Number(element)
  })

  const checkSum = INNAsArrayOfNumbers.reduce(function (accumulator, item, index, array) {
    if (index < 9) {
      return accumulator + (arrayOfCoefficient[index] * item)
    }
    else return accumulator
  }, 0)

  const checkSumDevidedBy11andRoundedDown = Math.floor(checkSum / 11)
  const checkSumDevidedBy11andRoundedDownAndMultiplicatedBy11 = checkSumDevidedBy11andRoundedDown * 11
  let result = checkSum - checkSumDevidedBy11andRoundedDownAndMultiplicatedBy11

  if(result===10){
    result = 0
  }

  const TenthNumberOfINN = INNAsArrayOfNumbers[9]
  const isValid = TenthNumberOfINN === result

  const validINNExample = [7830002293, "Санкт-Петербургская бумажная фабрика Гознака"]

  return isValid
}