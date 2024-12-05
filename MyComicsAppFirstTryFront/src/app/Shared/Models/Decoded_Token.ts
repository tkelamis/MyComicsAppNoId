export interface DecodedToken {
  sub: string; // Subject, usually the user identifier (e.g., email)
  jti: string; // JWT ID, a unique identifier for the token
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string; // Email address claim
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string; // Name claim
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string; // Role claim
  exp: number; // Expiration time as a Unix timestamp
  iss: string; // Issuer of the token
  aud: string; // Audience of the token
}
