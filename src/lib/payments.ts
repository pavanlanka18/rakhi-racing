// Typed shape for the future payment integration. Today the checkout flow is
// mocked locally; these signatures match what a Razorpay (or Stripe) integration
// would expose so the call sites don't need to change when wired up.

export type RazorpayOrderResponse = {
  orderId: string;
  amount: number; // paise
  currency: 'INR';
  keyId: string;
};

export type VerifySignatureInput = {
  orderId: string;
  paymentId: string;
  signature: string;
};

export async function createRazorpayOrder(
  amountPaise: number,
): Promise<RazorpayOrderResponse> {
  // TODO: wire to backend POST /api/v1/payment/razorpay/order
  throw new Error('Payment not configured');
}

export async function verifyRazorpaySignature(
  _input: VerifySignatureInput,
): Promise<boolean> {
  // TODO: wire to backend POST /api/v1/payment/razorpay/verify
  throw new Error('Payment not configured');
}
