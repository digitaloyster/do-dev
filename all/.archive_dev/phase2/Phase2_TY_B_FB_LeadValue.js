//TY BB

// Facebook Lead tracking
if (typeof document.cdnParameters !== "undefined") {
    if (document.cdnParameters.FB_pixel_ids != '') {
    fbq('track', 'Lead', {
      value: 10.00,
      currency: 'GBP'
    });
  }
}
// Facebook Lead tracking
