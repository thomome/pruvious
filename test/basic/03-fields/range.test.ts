import { $fetch } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('range field', () => {
  it('sets values', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: ['2000', 4000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    })

    expect(response).toEqual({
      regular: [0, 100],
      default: [32, 64],
      required: [2000, 4000],
    })
  })

  it('validates min value', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: [-9001, 9000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'The inputs must be greater than or equal to -9000' })
  })

  it('validates max value', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: [9000, 9001] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'The inputs must be less than or equal to 9000' })
  })

  it('validates decimals', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: [1.337, 2000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'The inputs cannot have more than 2 decimals' })
  })

  it('validates integers', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { regular: [0, 99.9], required: [1337, 4000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ regular: 'The inputs must be integers' })
  })

  it('validates min range', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: [1000, 2000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'The minimum range between the inputs is 2000' })
  })

  it('validates max range', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: [1000, 9000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'The maximum range between the inputs is 4000' })
  })

  it('only accepts numeric tuples', async () => {
    const response = await $fetch('/api/collections/range-fields?select=regular,default,required', {
      method: 'post',
      body: { required: [true, 9000] },
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'Invalid input type' })
  })

  it('validates required fields', async () => {
    const response = await $fetch('/api/collections/range-fields', {
      method: 'post',
      body: {},
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      ignoreResponseError: true,
    })

    expect(response).toEqual({ required: 'This field is required' })
  })
})
