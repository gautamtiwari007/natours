/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51KNe1qLleNH9ikFivIGekVOxoDsl07drRAOGWk9RpfWreZo3g7VckW1u2ilzt0v3dfCZw4zgbzlXwpow6UqsKcBe00j9d5pF7T');

export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const session = await axios(
            `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
        );
        console.log(session);

        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};