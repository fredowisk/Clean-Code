class Cpf {
  value: string;
  #cpfNumbers: string;
  #totalDigits1: number;
  #totalDigits2: number;
  #FACTOR_DIGIT_1: number;
  #FACTOR_DIGIT_2: number;

  constructor(value: string) {
    this.#totalDigits1 = 0;
    this.#totalDigits2 = 0;
    this.#FACTOR_DIGIT_1 = 10;
    this.#FACTOR_DIGIT_2 = 11;
    if (!this.#isCPFValid(value)) throw new Error("Invalid CPF!");
    this.value = value;
    this.#cpfNumbers = "";
  }

  #cleanCPF(cpf: string) {
    return cpf.replace(/[\.\-]*/g, "");
  }

  #isValidLength() {
    return this.#cpfNumbers.length === 11;
  }

  #isBlocked() {
    const [firstDigit] = this.#cpfNumbers;

    return this.#cpfNumbers
      .split("")
      .every((digit: string) => digit === firstDigit);
  }

  #calculateRest(total: number) {
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  #calculateDigit() {
    for (const digit of this.#cpfNumbers) {
      if (this.#FACTOR_DIGIT_1 > 1) {
        this.#totalDigits1 += parseInt(digit) * this.#FACTOR_DIGIT_1--;
      }
      if (this.#FACTOR_DIGIT_2 > 1) {
        this.#totalDigits2 += parseInt(digit) * this.#FACTOR_DIGIT_2--;
      }
    }

    const firstDigitRest = this.#calculateRest(this.#totalDigits1);
    const secondDigitRest = this.#calculateRest(this.#totalDigits2);

    return [firstDigitRest, secondDigitRest];
  }

  #extractActualDigit() {
    return this.#cpfNumbers.slice(9);
  }

  #isCPFValid(cpf: string) {
    this.#cpfNumbers = this.#cleanCPF(cpf);
    if (!this.#isValidLength()) return false;

    if (this.#isBlocked()) return false;

    const [firstDigit, secondDigit] = this.#calculateDigit();

    const actualDigit = this.#extractActualDigit();
    const calculatedDigit = `${firstDigit}${secondDigit}`;

    return actualDigit === calculatedDigit;
  }
}

export default Cpf;
