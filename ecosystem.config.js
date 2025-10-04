module.exports = {
  apps: [
    {
      name: 'prompt-craft-frontend',
      script: 'npm',
      args: 'start',
      cwd: '.',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/frontend-err.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    },
    {
      name: 'prompt-craft-backend',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    }
  ],
  
  deploy: {
    production: {
      user: 'root',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'https://github.com/Gzeu/prompt-engineering-gamified.git',
      path: '/var/www/prompt-craft',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}