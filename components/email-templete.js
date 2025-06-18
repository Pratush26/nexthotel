import React from 'react';

export const EmailTemplate = ({data}) => (
  <div>
    <h1>Hi, {data.name}!</h1>
    <p>Your Booking at Meghlokh resort of room- {data.roomNo.join(", ")} is Confirmed.</p>
    <p>Thank you for choosing our service.</p>
  </div>
);