const dns = require('dns');
const Counter = require('../models/counter');
const Shorturl = require('../models/shorturl');

exports.shorturl_newurl = (req, res) => {
  if(req.body.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)) {
    dns.lookup(req.body.url.substring(req.body.url.indexOf('://')+3), (err, addresses, family) => {
    if(!err) {
      Counter.findByIdAndUpdate({_id: 'urlId'}, {$inc: { seq: 1} }, { new: true, upsert: true })
      .exec()
      .then(doc => {
        Shorturl.findOne({ originalUrl: req.body.url })
        .exec()
        .then(doc => {
          res.json({
            original_url: doc.originalUrl,
            short_url: doc.shortUrl
          });
        })
        .catch(err => {
          const shorturl = new Shorturl({ originalUrl: req.body.url, shortUrl: doc.seq });
          shorturl.save()
          .then(result => {
            res.json({
              original_url: result.originalUrl,
              short_url: result.shortUrl
            });
          })
          .catch(err => res.json({error: err}));
          });
      })
      .catch(err => {
        res.json({"error": err});
      });
    } else {
      res.json({"error":"invalid Hostname"});
    }
  });
  } else {
    res.json({"error":"invalid URL"});
  }
};

exports.shorturl_redirect = (req, res) => {
  Shorturl.findOne({ shortUrl: req.params.shortUrl })
  .exec()
  .then(doc => {
    res.redirect(doc.originalUrl);
  })
  .catch(err => {
    res.json({"error":"No short url found for given input1"});
  });
};