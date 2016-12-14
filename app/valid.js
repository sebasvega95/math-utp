module.exports = {
  email: function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  password: function(password) {
    const re = /^[a-zA-Z0-9._-]+$/;
    const lengthOk = password.length >= 6;
    return lengthOk && re.test(password);
  },
};
