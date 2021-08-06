const path = require('path');

const cwd = path.join(__dirname, 'backend');
const python = path.join(__dirname, 'venv', 'bin', 'python')

module.exports = {
  apps: [
    {
      name: 'ecommerce',
      interpreter: '',
      cwd,
      script: `${python} -m gunicorn backend.wsgi`
    },
  ],
};
