'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onSignUp = (event) => {
  event.preventDefault();
  let signUpData = getFormFields(event.target);
  api.signUp(signUpData)
    .done(function (data, textStatus, jqXHR) {
      api.logIn(data, textStatus, jqXHR, signUpData)
        .done(ui.renderProfile)
        .fail(ui.logInFailure);
    })
    .fail(ui.signUpFailure);
};

const onLogIn = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.logIn(data)
    .done(ui.renderProfile)
    .fail(ui.logInFailure);
};

const onLogOut = (event) => {
  event.preventDefault();
  api.logOut()
    .done(ui.logOutSuccess)
    .fail(ui.logOutFailure);
};

const onChangePassword = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
    .done(ui.passwordChangeSuccess)
    .fail(ui.passwordChangeFailure);
};

const onToggleChangePassword = () => {
  ui.toggleChangePassword();
};

const onShowAuth = () => {
  event.preventDefault();
  let authForm = '';
  if ($(event.target).hasClass('sign-up')) {
    authForm = 'sign-up';
  } else if ($(event.target).hasClass('log-in')) {
    authForm = 'log-in';
  }
  ui.showAuth(authForm);
};

const addHandlers = () => {
  $('.auth-forms').on('submit', '#sign-up', onSignUp);
  $('.auth-forms').on('submit', '#log-in', onLogIn);
  $('.log-out').on('click', onLogOut);
  $('#change-password').on('submit', onChangePassword);
  $('.view').on('click', '.auth-forms .log-in', ui.showLogIn);
  $('.view').on('click', '.auth-forms a.sign-up', ui.showSignUp);
  $('.change-password-link').on('click', onToggleChangePassword);
  $('.btn-home.auth').on('click', onShowAuth);
};

module.exports = {
  addHandlers,
};