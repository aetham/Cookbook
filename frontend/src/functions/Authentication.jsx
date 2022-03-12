// RequireAuth, is a simple variable that is used to store a logged in persons data in localstorage.
// The information is sent from the Login.jsx 
export const requireAuth = (information, email) => (
    localStorage.setItem("isAuthenticated", "true"),
    localStorage.setItem("user", information),
    localStorage.setItem("email", email)
)