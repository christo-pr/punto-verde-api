"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
  	'post /v1/auth/forgot' : 'AuthController.forgot_password',
  	'post /reset/:token': 'AuthController.reset_password'
  }
};
