import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  CreditCard,
  Send,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutBook,
    setCheckoutBook,
    createOrder,
    submitPaymentReference,
    siteSettings,
    setActiveCustomerEmail
  } = useCMS();

  // Workflow steps:
  // 1: Customer details & Order Review
  // 2: JazzCash Payment Instructions & Selection (Payment Done vs Pay Later)
  // 3: Payment Reference Submission (if Payment Done)
  // 4: Final Confirmation with WhatsApp link
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');

  // Order State
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [trxReference, setTrxReference] = useState('');
  const [proofFile, setProofFile] = useState<string>('');
  const [copiedDetails, setCopiedDetails] = useState(false);

  if (!checkoutBook) return null;

  const priceToPay = checkoutBook.salePricePkr && checkoutBook.salePricePkr > 0
    ? checkoutBook.salePricePkr
    : checkoutBook.pricePkr;

  const handleCopyPaymentDetails = () => {
    const textToCopy = `JazzCash Account: ${siteSettings.jazzCash.accountNumber}\nAccount Title: ${siteSettings.jazzCash.accountHolder}\nAmount: PKR ${priceToPay}\nOrder Reference: ${currentOrder?.orderNumber || 'SW-NEW'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 2500);
  };

  // Step 1 -> Step 2: Validate and Create persistent Order in DB
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please provide a valid email address for delivery.');
      return;
    }

    // Create the persistent order
    const created = createOrder({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      book: checkoutBook
    });

    setCurrentOrder(created);
    setActiveCustomerEmail(created.customerEmail);
    setStep(2);
  };

  // Step 2: Option A -> Customer clicks "Payment Done"
  const handleChoosePaymentDone = () => {
    setStep(3);
  };

  // Step 2: Option B -> Customer clicks "Pay Later"
  const handleChoosePayLater = () => {
    setStep(4);
  };

  // Step 3 -> Step 4: Submit Transaction ID
  const handleSubmitTrx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder) return;

    if (!trxReference.trim()) {
      setFormError('Please enter your JazzCash Transaction ID (e.g. JC8923471).');
      return;
    }

    submitPaymentReference(currentOrder.id, trxReference, proofFile);
    setStep(4);
  };

  // Generate WhatsApp Message URL
  const getWhatsAppUrl = () => {
    if (!currentOrder) return '#';
    const statusText = currentOrder.status === 'under_review' ? 'Payment Submitted (Under Review)' : 'Pending Payment';
    const trxText = trxReference ? `\nTransaction Reference: ${trxReference}` : '';

    const text = `Assalam-o-Alaikum Soch Wale,
I have placed a book order on your platform.

*Order Details:*
• Order No: ${currentOrder.orderNumber}
• Customer Name: ${currentOrder.customerName}
• Customer Email: ${currentOrder.customerEmail}
• Book Title: ${currentOrder.bookTitle}
• Amount: PKR ${currentOrder.amountPkr}
• Status: ${statusText}${trxText}

Please verify my JazzCash payment and activate my PDF download access. Thank you!`;

    const cleanPhone = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleOpenWhatsApp = () => {
    const url = getWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setCheckoutBook(null);
    setStep(1);
    setFormError('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl bg-white border border-neutral-300 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
            <span id="checkout-modal-title" className="text-sm font-mono uppercase tracking-wider text-neutral-900 font-semibold">
              {step === 1 && 'Step 1 of 3: Order Details'}
              {step === 2 && 'Step 2 of 3: JazzCash Payment'}
              {step === 3 && 'Step 2 of 3: Submit Transaction ID'}
              {step === 4 && 'Step 3 of 3: Order Confirmation'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {/* Book Summary Card (Always Visible) */}
          <div className="flex items-center gap-4 p-4 bg-neutral-50 border border-neutral-200 rounded-sm mb-6">
            <img
              src={checkoutBook.coverImage}
              alt={checkoutBook.title}
              className="w-14 h-20 object-cover shadow border border-neutral-200 rounded-xs flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                Digital Edition PDF
              </span>
              <h3 className="text-sm font-serif font-bold text-neutral-950 truncate">
                {checkoutBook.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                By {checkoutBook.author} · {checkoutBook.pagesCount} Pages
              </p>
              <div className="text-sm font-mono font-bold text-neutral-900 mt-1">
                Total: PKR {priceToPay}
              </div>
            </div>
          </div>

          {/* STEP 1: Customer Details Form */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <h4 className="text-base font-serif font-bold text-neutral-900 mb-1">
                  Customer & Delivery Information
                </h4>
                <p className="text-xs text-neutral-500 mb-4">
                  Enter your information so we can bind the licensed PDF to your account and send access instructions.
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Ahmad Raza"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Your PDF download entitlement will be granted directly to this email address.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  WhatsApp / Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 0300-1234567"
                  className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-neutral-950 text-white text-sm font-semibold hover:bg-black transition-colors rounded-xs flex items-center justify-center gap-2"
                >
                  <span>Continue to JazzCash Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: JazzCash Instructions & Payment Options */}
          {step === 2 && currentOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-500">
                    Order Created
                  </span>
                  <div className="text-sm font-mono font-bold text-neutral-900">
                    {currentOrder.orderNumber}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-500">
                    Amount Due
                  </span>
                  <div className="text-sm font-mono font-bold text-neutral-900">
                    PKR {currentOrder.amountPkr}
                  </div>
                </div>
              </div>

              {/* Official JazzCash Account Details Box */}
              <div className="p-4 bg-neutral-900 text-white rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                    JazzCash Payment Details
                  </span>
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
                    Manual Verification
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Account / Mobile Number</span>
                    <span className="text-lg font-mono font-bold text-white tracking-wider">
                      {siteSettings.jazzCash.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Account Title</span>
                    <span className="text-base font-semibold text-white">
                      {siteSettings.jazzCash.accountHolder}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed pt-2 border-t border-neutral-800">
                  {siteSettings.jazzCash.instructions}
                </p>

                <button
                  type="button"
                  onClick={handleCopyPaymentDetails}
                  className="w-full mt-2 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedDetails ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Account Information!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Payment Details</span>
                    </>
                  )}
                </button>
              </div>

              {/* Two Clear Options: Payment Done vs Pay Later */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleChoosePaymentDone}
                  className="w-full py-3.5 px-4 bg-neutral-950 text-white text-sm font-semibold hover:bg-black transition-colors rounded-xs flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>I Have Sent the Payment (Submit Transaction ID)</span>
                </button>

                <button
                  type="button"
                  onClick={handleChoosePayLater}
                  className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-medium transition-colors rounded-xs flex items-center justify-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Pay Later (Save Order as Pending)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Submit Transaction Reference Form */}
          {step === 3 && currentOrder && (
            <form onSubmit={handleSubmitTrx} className="space-y-4">
              <div>
                <h4 className="text-base font-serif font-bold text-neutral-900 mb-1">
                  Submit Transaction Verification
                </h4>
                <p className="text-xs text-neutral-500 mb-4">
                  Please provide the JazzCash Transaction ID (TID) received via SMS after sending PKR {currentOrder.amountPkr} to {siteSettings.jazzCash.accountNumber}.
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  JazzCash Transaction ID (TID / Ref) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={trxReference}
                  onChange={e => setTrxReference(e.target.value)}
                  placeholder="e.g. JC9823419082 or TID 12345678"
                  className="w-full px-3.5 py-2.5 text-sm font-mono border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900"
                />
              </div>

              {siteSettings.enableProofUpload && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Upload Payment Proof Screenshot <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setProofFile(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-neutral-500 file:mr-3 file:py-2 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
                  />
                  {proofFile && (
                    <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Screenshot attached
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-2.5 px-4 text-xs font-semibold text-neutral-700 hover:text-black border border-neutral-300 rounded-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-neutral-950 text-white text-xs font-semibold hover:bg-black transition-colors rounded-xs flex items-center justify-center gap-2"
                >
                  <span>Submit Reference & Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & WhatsApp Redirection */}
          {step === 4 && currentOrder && (
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto shadow">
                {currentOrder.status === 'under_review' ? (
                  <Clock className="w-7 h-7 text-amber-400" />
                ) : (
                  <Check className="w-7 h-7 text-emerald-400" />
                )}
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-neutral-950">
                  {currentOrder.status === 'under_review'
                    ? 'Payment Submitted for Verification'
                    : 'Order Saved Successfully'}
                </h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  {currentOrder.status === 'under_review'
                    ? 'Your transaction reference has been logged. The administrator (Usman Ali) will verify the funds and unlock your PDF access.'
                    : 'Your order is currently pending. You can send the payment anytime and notify us via WhatsApp.'}
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="bg-neutral-50 border border-neutral-200 p-4 rounded text-left space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-neutral-500">Order Number:</span>
                  <span className="font-bold text-neutral-900">{currentOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Customer:</span>
                  <span className="font-medium text-neutral-900">{currentOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Email:</span>
                  <span className="font-medium text-neutral-900">{currentOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Book:</span>
                  <span className="font-medium text-neutral-900">{currentOrder.bookTitle}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-neutral-500">Total Amount:</span>
                  <span className="font-bold text-neutral-900">PKR {currentOrder.amountPkr}</span>
                </div>
                {trxReference && (
                  <div className="flex justify-between font-mono pt-1 border-t border-neutral-200">
                    <span className="text-neutral-500">Transaction ID:</span>
                    <span className="font-semibold text-neutral-900">{trxReference}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-neutral-200">
                  <span className="text-neutral-500">Current Status:</span>
                  <span className="font-bold capitalize text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {currentOrder.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* WhatsApp Action Button with URL Encoded Pre-filled message */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xs shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Notify via WhatsApp (Fast Verification)</span>
                </button>

                <p className="text-[11px] text-neutral-400">
                  Clicking opens WhatsApp with pre-filled order details to administrator ({siteSettings.whatsappNumber}).
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs font-semibold text-neutral-700 hover:text-black hover:underline"
                  >
                    Done & Return to Website
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
