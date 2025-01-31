import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/userAction';

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400,
        });
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', body);

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const {
            id,
            first_name,
            last_name,
            email_addresses,
            image_url,
            username,
        } = evt.data;

        try {
            const res = await createOrUpdateUser({
                id,
                name: `${first_name || ''} ${last_name || ''}`.trim(),
                email: email_addresses[0]?.email_address,
                profileImage: image_url,
                username: username,
            });

            if (res) {
                return new Response(
                    JSON.stringify({ message: 'User is created or updated' }),
                    { status: 200 }
                );
            }
        } catch (error) {
            console.error('Error creating or updating user:', error);
            return new Response('Error occurred', {
                status: 500,
            });
        }
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data;

        try {
            const res = await deleteUser(id ?? '');

            if (res) {
                return new Response(
                    JSON.stringify({ message: 'User is deleted' }),
                    { status: 200 }
                );
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return new Response('Error occurred', {
                status: 500,
            });
        }
    }
}
