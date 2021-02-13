/* eslint-disable space-before-function-paren */
export default httpClient => ({
  getMe: async () => {
    const response = await httpClient.get('/users/2')

    return {
      data: response.data
    }
  },

  updateUser: async payload => {
    const response = await httpClient.put('/users/2', { ...payload })

    return {
      data: response.data
    }
  }
})
