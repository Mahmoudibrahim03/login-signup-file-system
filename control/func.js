var bcrypt = require("bcrypt");
module.exports = {
  // check if user is exist depending on username and department
  ifExist: function(info, body) {
    var exist = false;
    info.find(x => {
      if (x.username === body.username) {
        exist = true;
        if(exist){
          return true;
        }
      }
    });
    return exist;
  },
  ifExist2: function(info, body) {
    var exist = false;
    info.find(x => {
      if (x.username === body.username) {
        bcrypt.compare(body.password, x.password, function(err, match) {
          console.log(match  ,err);
          if (err) {
            return err;
          }
          return match;
        });
      };
    });
  }
};
