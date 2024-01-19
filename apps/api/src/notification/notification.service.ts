import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import firebaseServiceAccount from './firebaseServiceAccount.json';

admin.initializeApp({
  // @ts-expect-error - This is a valid credential
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: 'https://project-x-c3c86.firebaseio.com',
});

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor() {}

  public async sendPushNotification(notificationId: string) {
    const message = {
      notification: {
        title: 'Detected a login from web',
        body: 'If this was you, you can ignore this message. If not, please change your password.',
      },
      token: notificationId,
    };

    try {
      const response = await admin.messaging().send(message);
      this.logger.log('Successfully sent message:', response);
    } catch (error) {
      this.logger.error('Error sending message:', error);
    }
  }
}
