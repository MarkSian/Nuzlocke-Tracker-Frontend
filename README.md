# Nuzlocke-Tracker-Frontend

# Phase 1:
## Core setup and File Structure
1. Set up app entry with BrowserRouter
2. Define all routes: /login, /register, /tracker, /box, /grave
3. Build Basic auth forms with username/password inputs. Remember to utilize useNavigate() for routing
4. Define atoms for authTokens, user, currentRun, loading, error and more if needed.
5. api/connector.js
    https://axios-http.com/docs/instance
    a. const instance = axios.create({
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
            });
    b. Create .env file who's url matches the backend API base URL
    https://axios-http.com/docs/interceptors
    c. Use interceptors before each request to check for a JWT token:`Bearer ${token}`; so it is associated to the authorization header if applicable. 