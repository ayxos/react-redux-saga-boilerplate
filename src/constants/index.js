/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};

const constants = {
  domain: 'http://localhost:3001',
};

// Prepare constants for export
function init() {
  console.log('MOCK:', constants.domain);
  return constants;
}

export default init();
