import { ValidationErrorItem } from '@hapi/joi'
import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'

let lang

export const loadLocale = file => {
  try {
    lang = safeLoad(readFileSync(file, 'utf8'))
  } catch (e) {
    console.error(e)
  }
  return lang
}

export const invalidRequestReducer = (errors: ValidationErrorItem[]) => {
  return {
    errors: errors.reduce(
      /* istanbul ignore next */
      (obj: { [index: string]: string } = {}, item) => {
        if (item.context && item.context.key) {
          obj[item.context.key] = item.type
          return obj
        }
      },
      {},
    ),
    statusCode: 400,
  }
}

export const kebabCase = input => {
  return input.split(' ').join('-')
}

export const generateUri = input => {
  const lcase = input
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
  return kebabCase(lcase)
}
