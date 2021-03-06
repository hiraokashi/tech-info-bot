var Channel, DM, Message,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Message = require('./message');

Channel = require('./channel');

DM = (function(_super) {
  __extends(DM, _super);

  function DM(_client, data) {
    var u;
    this._client = _client;
    if (data == null) {
      data = {};
    }
    this._onClose = __bind(this._onClose, this);
    DM.__super__.constructor.call(this, this._client, data);
    if (this.user) {
      u = this._client.getUserByID(this.user);
      if (u) {
        this.name = u.name;
      }
    }
  }

  DM.prototype.close = function() {
    var params;
    params = {
      "channel": this.id
    };
    return this._client._apiCall('im.close', params, this._onClose);
  };

  DM.prototype._onClose = function(data) {
    return this._client.logger.debug(data);
  };

  return DM;

})(Channel);

module.exports = DM;
