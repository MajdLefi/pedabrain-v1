exports.sanitizeData = function (model, data) {
  if (model === 'User') {
      return exports.sanitizeUser(data);
  } else {
      return {
          _id: model._id
      };
  }
}

exports.sanitizeUser = function(user) {
  return {
    _id: user._id,
    fullName: user.fullName,
    cin: user.cin
  };
};