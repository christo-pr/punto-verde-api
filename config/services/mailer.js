"use strict";

module.exports = {
  services: {
    mailer: {
    	from: 'no-reply@punto-verde.com',
    	provider: {
		    auth: {
		      api_user: process.env.SENDGRID_API_USER, // SendGrid username
		      api_key: process.env.SENDGRID_API_KEY // SendGrid password
		    }
		  }

    }
  }
};
