import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'eu-west-1' });

async function sendMail(event, context) {
  const { Records: [record] } = event;

  console.log('record processing', record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  try {
    const result = await ses.sendEmail({
      Source: '', // @TODO
      Destination: {
        ToAddresses: [recipient],
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        }
      },
    }).promise();

    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

export const handler = sendMail;


