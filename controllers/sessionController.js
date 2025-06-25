const Session = require('../models/Session');
const {Parser} = require('json2csv');

exports.startSession = async(req, res) => {
    const session = new Session({user: req.user.id, startTime: new Date()});
    await session.save();
    res.status(201).json(session);
}

exports.stopSession = async(req, res) => {
    const session = await Session.findOne({user: req.user.id, endTime: null}).sort({startTime: -1});
    if(!session) return res.status(400).json({
        success: false,
        message: 'No active session found'
    })

    if(session.isPaused && session.pauseTime){
        session.totalPauseDuration += new Date() - session.pauseTime;
        session.isPaused = false;
        session.pauseTime = null;
    }

    session.endTime = new Date();
    await session.save();
    res.json(
        {
            message: 'Session Stop Successful',
            success: true,
            session

        }
    );
}

//Pause the Session
exports.pauseSession = async (req, res) => {
    const session = await Session.findOne({user: req.user.id, endTime: null, isPaused: false});

    if(!session) return res.status(400).json({
        success: false,
        message: 'No active session to pause'
    })

    session.isPaused = true;
    session.pauseTime = new Date();
    await session.save();
    res.json({
        success: true,
        message: 'Session paused',
        session
    })
};

//Resume the Session
exports.resumeSession = async(req, res) => {
    const session = await Session.findOne({
        user: req.user.id, 
        endTime: null,
        isPaused: true
    });

    if(!session || !session.pauseTime) return res.status(400).json({
        message: 'NO paused Session to resume'
    });

    session.totalPauseDuration += new Date() - session.pauseTime;
    session.isPaused = false;
    session.pauseTime = null;
    await session.save();
    res.json({
        success: true,
        message:'Session resumed',
        session
    })
}

// Get all sessions of the user
exports.getSessions = async (req, res) => {
  const sessions = await Session.find({ user: req.user.id });
  res.json(sessions);
};

//Get Session by id

exports.getSessionById = async(req, res) => {
    const session = await Session.findOne({
        _id: req.params.id, 
        user: req.user.id
    })

    if(!session) return res.status(404).json({
        success: false,
        message: 'Session not found'
    })
    res.json(session);
}

//Delete Session
exports.deleteSession = async (req, res) => {
  await Session.deleteOne({_id: req.params.id, user: req.user.id});
  res.json({
    success: true,
    message: 'Session deleted'
  })
    
}

//Export session
exports.exportSessions = async (req, res) => {
  const sessions = await Session.find({ user: req.user.id });
  const format = req.query.format || 'json';

  if (format === 'csv') {
    const parser = new Parser();
    const csv = parser.parse(sessions.map(s => s.toObject()));
    res.setHeader('Content-Type', 'text/csv');
    res.attachment('sessions.csv');
    return res.send(csv);
  }

  res.json(sessions);
};