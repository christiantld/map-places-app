export function nameValidFormat(value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }
  if (value.length < 3) {
    return '*Este campo precisa de no mínimo 3 caracteres'
  }

  // Check if it has a white space
  const isValid = /\s.*/g.test(value)
  if (!isValid) {
    return '*Preencha nome e sobrenome'
  }

  return true
}

export function passwordValidFormat(value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }
  // Minimum eight characters, at least one letter and one number:
  const isValid = /^(?=.*[a-z])(?=.*\d).{6,15}$/i.test(value)
  if (!isValid) {
    return ` - Mínimo de 6 caracteres <br/>
    - Pelo menos uma letra <br/>
    - Pelo menos um número
    `
  }

  return true
}

export function emailValidFormat(value) {
  if (!value) {
    return '*Este campo é obrigatório'
  }

  // Email format
  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!isValid) {
    return '*Este campo precisa ser um e-mail'
  }

  return true
}
