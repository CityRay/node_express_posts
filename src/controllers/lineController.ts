import { handleResponse } from '../services/handleResponse';
import {
  type webhook,
  type MessageAPIResponseBase,
  type ClientConfig,
  messagingApi,
  HTTPFetchError
} from '@line/bot-sdk';
import { type NextFunction, type Request, type Response } from 'express';
import { config } from '../config';

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: config.LINE_CHANNEL_ACCESS_TOKEN || ''
};

// Create a new LINE SDK client.
const client = new messagingApi.MessagingApiClient(clientConfig);

// Function handler to receive the text.
const textEventHandler = async (
  event: webhook.Event
): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.

  // Check if for a text message
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Process all message related variables here.

  // Check if message is repliable
  if (!event.replyToken) return;

  // Create a new message.
  // Reply to the user.
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: event.message.text
      }
    ]
  });
};

export const lineController = {
  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    const callbackRequest: webhook.CallbackRequest = req.body;
    const events: webhook.Event[] = callbackRequest.events;

    console.log(events);
    // Process all the received events asynchronously.
    if (!!events && events.length > 0) {
      const results = await Promise.all(
        events.map(async (event: webhook.Event) => {
          try {
            await textEventHandler(event);
          } catch (err: unknown) {
            if (err instanceof HTTPFetchError) {
              console.error(err.status);
              console.error(err.headers.get('x-line-request-id'));
              console.error(err.body);
            } else if (err instanceof Error) {
              console.error(err);
            }

            // Return an error message.
            return res.status(500).json({
              status: 'error'
            });
          }
        })
      );

      console.log(results);
    }

    handleResponse(res, {}, 'success');
  }
};
