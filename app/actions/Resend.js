import { EmailTemplate } from '@/components/email-templete';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SuccessEmail(info) {
    try {
        const { name, email, roomNo } = info;

        const { data, error } = await resend.emails.send({
            from: 'Meghlokh Resort <onboarding@resend.dev>',
            to: [email],
            subject: 'Booking Confirmation',
            react: <EmailTemplate data={{ name, roomNo }} />, // Correct JSX usage
            text: `Hi ${name},\nYour booking at Meghlokh Resort of room(s) ${roomNo.join(", ")} is confirmed.\nThank you for choosing our service.`,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
    }
}
