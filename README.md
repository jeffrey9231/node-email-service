## email-webservice  (Node.js)

## Context 
Due to the free email service providers. We need to consider the stability and reliability of the service. Once one of service is down we need to switch to back up service for better user experience.

## Feature
* Integrated [mailgun](https://www.mailgun.com/) and [sendgrid](https://sendgrid.com/) as email service providers to send email to users.
* Provided backup email service when one of email provider is down.
* Integrated [swagger](https://swagger.io/) as API specification for simple example and the better user manually testing. 



## Installation

* node

Need to install [node](https://nodejs.org/en/download/) as the run time environment.

* start the app on http://localhost:3000/
```bash
npm install && npm run dev
```

## Tech
* [Joi](https://www.npmjs.com/package/joi) - JavaScript Input Validation
* [Jest](https://jestjs.io/) - JavaScript Testing Framework
* [axios](https://www.npmjs.com/package/axios) - JavaScript HTTP client
* [express](https://www.npmjs.com/package/express) - JavaScript web server framework
* [swagger-ui](https://www.npmjs.com/package/swagger-ui-express) - tool for generating API docs



## API

#### POST /v1/email

This endpoint allows you to send an email over SendGrid or Mailgun.
[Here](https://node-webservice-jeffrey9231.herokuapp.com/api-docs/) for more api example. 

 
| Headers |
| ------ |
| None Authorization |

required field(*)

| Name | Type |Description |
| ------ | ------ | ------ |
| subject*  | string|The subject of your email|
| content *  | string|The content  of your email|
| emailTo *  | array[object]|An array of recipients|
| emailCc  | array[object]|An array of cc|
| emailBcc   | array[object]|An array of bcc|

Body example
```json
{
  "subject": "Email subject",
  "content": "Email contents",
  "emailTo": [
    {
      "email": "xxxxx@gmail.com",
      "name": "Jessica Smith"
    }
  ],
  "emailCc": [
    {
      "email": "xxxxx@gmail.com",
      "name": "Jessica Smith"
    },
    {
      "email": "xxxxx@gmail.com",
      "name": "Ron Stewart"
    }
  ],
  "emailBcc": [
    {
      "email": "xxxxx@gmail.com"
    },
    {
      "email": "xxxxx@gmail.com"
    }
  ]
}
```

## How to use swagger-ui

This project integrates swagger-ui for a better user manually testing. 
[Here](https://www.blazemeter.com/blog/getting-started-with-swagger-ui) can get step by step document.

 1.  go to [project](https://node-webservice-jeffrey9231.herokuapp.com/api-docs/)
 1. Click Post label
 1. Click *Try it out* button
 1. Change post body to your emails
 1. Click *Execute* button to show your results
 
## Deploy
Deploy project with [Heroku](https://devcenter.heroku.com/) and Heroku CLI.



## Knowing issues

###### Mailgun:
Already set up CDN for Mailgun but my domain still not get verified.
Still can get through Mailgun API successfully if there only have **one** recipient
Will get `The domain is unverified and requires DNS configuration. Log in to your control panel to view required DNS records` error once have multiple recipients.
The request body separates multiple recipients with commas base on their document but still get this error.


###### Sendgrid:
Not set up Sendgrid CDN yet. Still can get through Sendgrid API successfully and received by gmail-smtp on their dashboard but not email inbox. 






## Todos

 - Integrated swagger validation to replace Joi for more concise of API specification.
