let webPush = require('web-push');
 
const vapidKeys = {
    "publicKey": "BIOW18VHMVEU4f2FGpQ2cNk5RfaR2HJJpQPnOWHwy07niRoj9zYX9u63-RFrBPIepU96duXrJQK5FWoCQDcdtKI",
    "privateKey": "ag4HUCdV0L3AFZ3PbJD_LZzo8qhLdDgknRjCP72trOE"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cDZimSOLojQ:APA91bENCixZUXH5Zd8GcCuoMNn1kEp4RDnbzFLuzAkfx5Cple2Th7SbCc8qugaPz50QbCV2Ym83Pu09aloiu25J4-vL1bVME1cKrOCvdEP936wf4nOVYDOVWFBTklfI4JGu151xDjSR",
   "keys": {
       "p256dh": "BDx/Ux2oDnAuLKgCv1hJXTsFlTkLHGrnOzlKdIqJYFF2WFwQl/uFL6UisQ9KST8wlnA8+XcXdJdBPiHp2sLhHbo=",
       "auth": "q285m5EUQSBecjrrsnaaDQ=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '36673009128',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);