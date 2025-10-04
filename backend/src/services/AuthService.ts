import jwt from 'jsonwebtoken'
import { AppError } from '@/middleware/errorHandler'

export class AuthService {
  private jwtSecret: string
  private refreshSecret: string
  private jwtExpiresIn: string
  private refreshExpiresIn: string

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key'
    this.refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret'
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d'
    this.refreshExpiresIn = '30d'

    if (!process.env.JWT_SECRET) {
      console.warn('⚠️ JWT_SECRET not set, using fallback (not secure for production)')
    }
  }

  generateToken(userId: string, email?: string): string {
    const payload = {
      userId,
      email,
      type: 'access'
    }

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
      issuer: 'prompt-craft-api',
      audience: 'prompt-craft-app'
    })
  }

  generateRefreshToken(userId: string): string {
    const payload = {
      userId,
      type: 'refresh'
    }

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
      issuer: 'prompt-craft-api',
      audience: 'prompt-craft-app'
    })
  }

  verifyToken(token: string): { userId: string; email?: string } {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any
      
      if (decoded.type !== 'access') {
        throw new AppError('Invalid token type', 401)
      }

      return {
        userId: decoded.userId,
        email: decoded.email
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid or expired token', 401)
      }
      throw error
    }
  }

  verifyRefreshToken(token: string): { userId: string } {
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as any
      
      if (decoded.type !== 'refresh') {
        throw new AppError('Invalid token type', 401)
      }

      return {
        userId: decoded.userId
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid or expired refresh token', 401)
      }
      throw error
    }
  }

  extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    return authHeader.substring(7)
  }
}