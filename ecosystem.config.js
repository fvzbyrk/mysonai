module.exports = {
  apps: [
    {
      name: 'mysonai',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/mysonai',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/mysonai/error.log',
      out_file: '/var/log/mysonai/out.log',
      log_file: '/var/log/mysonai/combined.log',
      time: true,
    },
  ],
};
