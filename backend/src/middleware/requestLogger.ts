import { Request, Response, NextFunction } from 'express'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  const timestamp = new Date().toISOString()
  
  // Skip logging for health checks in production
  if (process.env.NODE_ENV === 'production' && req.path === '/health') {
    return next()
  }

  // Log request
  console.log(`🌐 ${timestamp} ${req.method} ${req.originalUrl} - ${req.ip}`)

  // Log response when it finishes
  res.on('finish', () => {
    const duration = Date.now() - start
    const statusColor = res.statusCode >= 400 ? '🔴' : res.statusCode >= 300 ? '🟡' : '🟢'
    
    console.log(
      `${statusColor} ${res.statusCode} ${req.method} ${req.originalUrl} - ${duration}ms`
    )
  })

  next()
}