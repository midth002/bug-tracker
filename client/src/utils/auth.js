import decode from 'jwt-decode';
class AuthService {
  getUser() {
    return decode(this.getToken());
  }
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 10000) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('username');
      return true;
    }
    return false;
  }
  getToken() {
    return localStorage.getItem('id_token');
  }
  getUsername() {
    return localStorage.getItem('username');
  }

  login(idToken, username) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('username', username)
    window.location.assign('/dashboard');
    console.log(username)
  }
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
    window.location.reload();
  }
}
export default new AuthService();