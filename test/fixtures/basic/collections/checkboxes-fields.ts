import { defineCollection } from '#pruvious'

export default defineCollection({
  name: 'checkboxes-fields',
  mode: 'multi',
  createdAtField: false,
  updatedAtField: false,
  fields: {
    value: {
      type: 'checkboxes',
      options: {
        choices: {
          foo: 'foo',
          bar: 'bar',
          1: '1',
        },
        default: ['1'],
      },
    },
  },
})
