export const isAuthenticated = () => JSON.parse(localStorage.getItem('user'))

export const logged = async (formData: any) =>
  localStorage.setItem('user', JSON.stringify(window.btoa(formData)))

export const logout = () => localStorage.removeItem('user')
