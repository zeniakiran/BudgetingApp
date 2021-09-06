const { validateGroup } = require("../db/models/group");
function validateGroups(req, res, next) {
  let { error } = validateGroup(req.body);

  if (error) {
    const firstError = error.details[0].message;
    return res.status(400).json({
      errorMessage: firstError,
    });
  }
  next();
}


module.exports.groupValidation = validateGroups;
