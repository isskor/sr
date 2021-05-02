exports.convertToDateObject = (SRTimeString) => {
  return new Date(
    parseInt(SRTimeString.replace(/[\/\(\)date]/gi, ''))
  ).toLocaleString();
};

exports.checkPassword = (str) => {
  let errors = [];
  if (str.length < 8) {
    errors.push('Your password must be at least 8 characters');
  }
  if (str.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.');
  }
  if (str.search(/[A-Z]/) < 0) {
    errors.push('Your password must contain at least one uppercase letter.');
  }
  if (str.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.');
  }
  if (errors.length > 0) {
    return { val: false, err: errors };
  }
  return { val: true };
};

exports.checkEmail = (emailAddress) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;

  return emailRegex.test(emailAddress);
};
