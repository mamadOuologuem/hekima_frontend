type TrackEventParameters =
  | [event: 'Contact Form Submitted', properties: { userEmail: string; userName: string; userMessage: string }]
  | [event: 'Newsletter Form Submitted', properties: { userEmail: string }]
  | [event: 'Waiting List Form Submitted', properties: { whatsAppPhoneNumber: string }]
  | [
      event: 'Business Waiting List Form Submitted',
      properties: {
        businessEmail: string;
        businessPhone: string;
        businessName: string;
        businessSize: string;
        sectorOfActivity: string;
        digitalMedias: string;
        websiteUrl: string;
        needs: string;
      }
    ];

export type TrackEvent = (...params: TrackEventParameters) => void;

export type SendIdentifyEvent = (
  properties: Partial<{
    hekima_whatsapp_phone_number: string;
    hekima_contact_form_email: string;
    hekima_newsletter_email: string;
    hekima_business_email: string;
  }>
) => void;
