const assert = require('assert');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

assert(html.includes('id="saveUploadBtn"'), 'Expected a dashboard save/upload button with id="saveUploadBtn"');
assert(html.includes('function saveLatestData'), 'Expected a saveLatestData function');
assert(html.includes('window.saveLatestData = saveLatestData'), 'Expected saveLatestData to be exposed on window');
assert(html.includes('sessionStorage.setItem'), 'Expected Drive auth state to be persisted in sessionStorage');
assert(html.includes('restoreDriveSession'), 'Expected restoreDriveSession helper for page-to-page auth continuity');

console.log('Save/upload button wiring verified');
