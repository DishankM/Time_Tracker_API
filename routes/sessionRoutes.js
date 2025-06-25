const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const{
    startSession,
    stopSession,
    pauseSession,
    resumeSession,
    getSessions,
    getSessionById,
    deleteSession,
    exportSessions,
} = require('../controllers/sessionController');


router.use(auth);
router.post('/start', startSession);
router.post('/stop', stopSession); // Stop timer
router.post('/pause', pauseSession); // Pause timer
router.post('/resume', resumeSession); // Resume timer
router.get('/', getSessions); // List all sessions
router.get('/export', exportSessions); // Export data
router.get('/:id', getSessionById); // Get session by ID
router.delete('/:id', deleteSession); // Delete session

module.exports = router;