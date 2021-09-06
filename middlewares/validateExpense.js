const { validateExpense} = require("../db/models/expense");
function validateExpenses(req, res, next) {
  let { error } = validateExpense(req.body);

  if (error) {
    const firstError = error.details[0].message;
    return res.status(400).json({
      errorMessage: firstError,
    });
  }
  next();
}

module.exports.expenseValidation = validateExpenses;
