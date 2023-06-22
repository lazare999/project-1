export function getLogintoken() {
  const token = localStorage.getItem("token");
  return token;
}

