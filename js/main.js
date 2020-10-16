(() => {
  function main() {
    const converterForm = getElById('converter-form')

    if (!converterForm) {
      throw new Error('Form not found!')
    }

    converterForm.addEventListener('submit', onConverterFormSubmit)
  }

  function onConverterFormSubmit(event) {
    event.preventDefault()
    const binInput = getElById('binary-number-input')
    const decOutput = getElById('decimal-number-output')
    const inputHint = getElById('input-hint')

    if (!binInput || !decOutput || !inputHint) {
      throw new Error('Input not found!')
    }

    const isValid = validateBinaryInput(binInput.value)

    if (!isValid) {
      decOutput.value = ''

      inputHint.innerText = HINT_TEXT
      inputHint.classList.remove('hide')
    } else {
      inputHint.innerText = ''
      inputHint.classList.add('hide')

      decOutput.value = convertBin2Dec(binInput.value)
    }
  }

  function validateBinaryInput(binaryValue) {
    const binRegExp = new RegExp('^[01]{1,8}$', 'ig')

    return binRegExp.test(binaryValue)
  }

  function convertBin2Dec(binary) {
    let priorVal = 0

    for (const nextBit of binary) {
      priorVal = priorVal * 2 + parseInt(nextBit)
    }

    return priorVal
  }

  function getElById(id) {
    return document.getElementById(id)
  }

  const HINT_TEXT = 'Should be a valid binary value, up to 8 binary digits.'

  window.addEventListener('load', main)
})()
