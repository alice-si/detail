export function getCompanyNames (userId) {
  const databaseRef = this.$database().ref(`/${userId}`)
  console.log(databaseRef)
}