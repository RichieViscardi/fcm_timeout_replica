import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldPath } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

initializeApp();

const db = getFirestore();
const fcm = getMessaging();


//Only included this function as this is the only one that handles sending messages
//In this example, the TestChange/Now document is updated every hour on the hour 
//and that is independent of this
exports.sendOutAlerts = functions.firestore
    .document('TestChange/Now')
    .onUpdate((snap, context) => {
        var data = snap.after.data() ?? [];
        var hour = data.hour;
        var messageTag = (data.hour % 4).toString();

        var topic = 'Hour' + hour;
        var topicKJV = 'Hour' + hour + 'KJV';
        var topicES_RVR = 'Hour' + hour + 'ES_RVR';
        var topicNKJV = 'Hour' + hour + 'NKJV';
        var topicRVR1960 = 'Hour' + hour + 'RVR1960';

        var message = {
            notification: {
                title: data.Verse,
                body: data.Content,
            },
            topic: topic,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageKJV = {
            notification: {
                title: data.Verse,
                body: data.ContentKJV,
            },
            topic: topicKJV,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageES_RVR = {
            notification: {
                title: data.VerseES,
                body: data.ContentES_RVR,
            },
            topic: topicES_RVR,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageNKJV = {
            notification: {
                title: data.Verse,
                body: data.ContentNKJV,
            },
            topic: topicNKJV,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageRVR1960 = {
            notification: {
                title: data.VerseES,
                body: data.ContentRVR1960,
            },
            topic: topicRVR1960,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var topicPT_NVI = 'Hour' + hour + 'PT_NVI';
        var topicCUV = 'Hour' + hour + 'CUV';
        var topicKO_KO = 'Hour' + hour + 'KO';
        var topicRU_SYNODAL = 'Hour' + hour + 'RU_SYNODAL';

        var messagePT_NVI = {
            notification: {
                title: data.VersePortugese,
                body: data.ContentPT_NVI,
            },
            topic: topicPT_NVI,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageCUV = {
            notification: {
                title: data.VerseChinese,
                body: data.ContentCUV,
            },
            topic: topicCUV,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageKO_KO = {
            notification: {
                title: data.VerseKO,
                body: data.ContentKO_KO,
            },
            topic: topicKO_KO,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        var messageRU_SYNODAL = {
            notification: {
                title: data.VerseRU,
                body: data.ContentRU_SYNODAL,
            },
            topic: topicRU_SYNODAL,
            apns: {
                headers: {
                    "apns-collapse-id": messageTag,
                },
                payload: {
                    aps: {
                        badge: 1,
                    },
                },
            },
        };

        const messages = [];
        messages.push(message);
        messages.push(messageKJV);
        messages.push(messageES_RVR);
        messages.push(messageNKJV);
        messages.push(messageRVR1960);
        messages.push(messagePT_NVI);
        messages.push(messageCUV);
        messages.push(messageKO_KO);
        messages.push(messageRU_SYNODAL);

        const promise = fcm.sendAll(messages)
        .then((response) => {
            console.log(response.successCount + ' messages were sent succeessfully');
            return response;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
        return promise;
});




