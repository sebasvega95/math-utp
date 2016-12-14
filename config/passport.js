const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');
const valid = require('../app/valid');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    console.log('Passoport:');
    console.log(req.body);
    User.findOne({'email': email}, (err, user) => {
      if (err)
        return done(err);
      if (user) {
        return done(null, false, req.flash('message', 'Ese correo ya está registrado.'));
      } else {
        let newUser = new User();

        if (valid.email(req.body.email))
          newUser.email = email;
        else
          return done(null, false, req.flash('message', 'Correo inválido.'));

        if (valid.password(req.body.password))
          newUser.password = newUser.generateHash(password);
        else
          return done(null, false, req.flash('message', 'Contraseña muy débil.'));

        newUser.save((err) => {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    console.log(req.body);
    User.findOne({'email': email}, (err, user) => {
      if (err)
        return done(err);
      if (!user)
        return done(null, false, req.flash('message', 'No se encontró el usuario.'));
      if (!user.validPassword(password))
        return done(null, false, req.flash('message', 'Contraseña incorrecta.'));
      return done(null, user);
    });
  }));
};
