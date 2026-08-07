const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
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

      success_url: "http://localhost:8888/success",

      cancel_url: "http://localhost:8888/",
    });

    return {
      statusCode: 200,

      body: JSON.stringify({
        url: session.url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,

      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
