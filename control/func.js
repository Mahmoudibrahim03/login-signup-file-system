module.exports = {
  // check if user is exist depending on username and department
  ifExist: function(info,body) {
    var exist = false;
    info.find(x => {
      if (
        x.username === body.username &&
        x.department === body.department
      ) {
        exist = true;
        return "exist";
      } 
    });
    if (!exist) {
      info.push(body);
    } else {
      console.log("user already exist");
      return "exist";
    }
  }
};