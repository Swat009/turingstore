var winston = require('../util/winston');
exports.get404 = (req, res, next) => {
    
    res.status(404).json({error: 'Page not found'});
};

exports.handleError =(err, req, res, next)=> {
    // log the error

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //  include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // send different response based on content type
    res.format({
      'text/plain': function(){
        res.status(500).send('500 - Internal Server Error');
      },
  
      'text/html': function(){
        res.status(500).send('<h1>Internal Server Error</h1>');
      },
  
      'application/json': function(){
        res.send({ error: 'internal_error' });
      }
    });
};
