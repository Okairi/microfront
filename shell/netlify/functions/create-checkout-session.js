import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { products } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: products.map((product) => ({
        price_data: {
          currency: "pen",

          product_data: {
            name: product.name,
          },

          unit_amount: product.price * 100,
        },

        quantity: product.quantity,
      })),

      mode: "payment",

      success_url: "https://microfront-shell.netlify.app/success",

      cancel_url: "https://microfront-shell.netlify.app/",
    });

    console.log("Stripe session:", session.id);
    console.log("Stripe URL:", session.url);

    return {
      statusCode: 200,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        url: session.url,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,

      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
}
