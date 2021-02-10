/* eslint-disable space-before-function-paren */
export default httpClient => ({
  getMe: async () => {
    const response = await httpClient.get('/users/2')

    return {
      data: response.data
    }
  }
})
