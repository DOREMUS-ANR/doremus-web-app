import Sparql from '../../commons/sparql';
import async from 'async';

var sparql = new Sparql();

function sendStandardError(res, err) {
  'use strict';
  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: err.message
  });
}

function packResults(res, label) {
  'use strict';

  let data = (res && res.results && res.results.bindings) || [];

  data.forEach(b => {
    Object.keys(b).forEach(prop => {
      b[prop] = b[prop].value;
    });
  });

  return {
    data,
    label
  };
}

export default class RecommendationController {

  static query(req, res) {
    async.parallel([
      function(callback) {
        sparql.loadQuery('expression.recommendation.genre', {
            uri: `http://data.doremus.org/expression/${req.params.id}`,
            lang: req.query.lang || 'en',
            limit: req.query.limit || 3
          })
          .then(results => callback(null, packResults(results, 'of the same genre')))
          .catch(err => callback(err));
      },
      function(callback) {
        sparql.loadQuery('expression.recommendation.composer', {
            uri: `http://data.doremus.org/expression/${req.params.id}`,
            lang: req.query.lang || 'en',
            limit: req.query.limit || 3
          })
          .then(results => callback(null, packResults(results, 'of the same composer')))
          .catch(err => callback(err));
      }
    ], function(err, results) {
      if (err) {
        sendStandardError(res, err);
      }
      res.json(results);
    });

  }

}
