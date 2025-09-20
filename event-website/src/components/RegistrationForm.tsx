'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';

interface FormData {
  fullName: string;
  email: string;
  phone?: string;
  eventId?: number | string;
  ticketId?: number | string;
  additionalNotes?: string;
  terms: boolean;
}

const registrationSchema = z.object({
  fullName: z.string().min(1, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  eventId: z.union([z.string(), z.number()], {
    required_error: 'Please select an event',
    invalid_type_error: 'Please select an event',
  }).refine((v) => String(v).length > 0, { message: 'Please select an event' }),
  ticketId: z.union([z.string(), z.number()], {
    required_error: 'Please select a ticket type',
    invalid_type_error: 'Please select a ticket type',
  }).refine((v) => String(v).length > 0, { message: 'Please select a ticket type' }),
  phone: z.string().optional(),
  additionalNotes: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and privacy policy' }),
  }),
});

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [events, setEvents] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdRef, setCreatedRef] = useState<string | null>(null);
  const [createdPayload, setCreatedPayload] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { terms: false },
    mode: 'onSubmit',
  });

  const selectedEventId = watch('eventId');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoadingEvents(true);
      const res = await api.listEvents({ published_only: true, per_page: 50 });
      if ('data' in res && active) {
        setEvents(res.data.data || []);
      }
      setLoadingEvents(false);
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!selectedEventId) {
        setTickets([]);
        return;
      }
      setLoadingTickets(true);
      const res = await api.listTickets(String(selectedEventId));
      if ('data' in res && active) {
        setTickets(res.data);
      }
      setLoadingTickets(false);
    })();
    return () => { active = false; };
  }, [selectedEventId]);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setSubmitting(true);
    try {
      const [first_name, ...rest] = data.fullName.trim().split(' ');
      const last_name = rest.join(' ') || 'N/A';
      const eventId = Number(data.eventId);
      const ticketId = Number(data.ticketId);
      if (!eventId || !ticketId) {
        setError('Please select an event and a ticket.');
        return;
      }
      const res = await api.createRegistration(eventId, ticketId, {
        first_name,
        last_name,
        email: data.email,
      });
      if ('error' in res) {
        setError(res.error);
        return;
      }
      const reg = res.data;
      const payload = JSON.stringify({ reference: reg.reference, event_id: reg.event_id, ticket_id: reg.ticket_id, email: reg.email });
      setCreatedRef(reg.reference);
      setCreatedPayload(payload);
      setIsSubmitted(true);
    } catch (e: any) {
      setError(e?.message || 'Failed to submit registration.');
    } finally {
      setSubmitting(false);
    }
  };


  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">Check your email for confirmation and event details.</p>

        {createdRef && (
          <div className="bg-gray-50 border rounded-lg p-4 text-left max-w-xl mx-auto mb-6">
            <div className="text-sm text-gray-700 mb-2"><strong>Reference:</strong> <span className="font-mono">{createdRef}</span></div>
            {createdPayload && (
              <div>
                <div className="text-sm text-gray-700 mb-1">QR JSON Payload (for testing):</div>
                <pre className="text-xs bg-white border rounded p-3 overflow-x-auto">{createdPayload}</pre>
              </div>
            )}
            <div className="mt-3 text-sm">
              Tip: You can test check-in at <a href="/checkin" className="text-purple-700 underline">/checkin</a> by scanning the QR or pasting the JSON/reference.
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <a href="/checkin" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">Go to Check-In</a>
          <button
            onClick={() => { setIsSubmitted(false); setCreatedRef(null); setCreatedPayload(null); }}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Register Another Attendee
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded">{error}</div>
      )}
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          Step {currentStep} of 3: {
            currentStep === 1 ? 'Personal Information' :
            currentStep === 2 ? 'Ticket Selection' : 'Additional Details'
          }
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Ticket Selection */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Event *
              </label>
              <select
                {...register('eventId', { required: 'Please select an event' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>
                  {loadingEvents ? 'Loading events...' : 'Choose an event'}
                </option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
              {errors.eventId && (
                <p className="mt-1 text-sm text-red-600">{String(errors.eventId.message)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Ticket Type *
              </label>
              {loadingTickets && (
                <div className="text-sm text-gray-600">Loading tickets...</div>
              )}
              {!loadingTickets && tickets.length === 0 && selectedEventId && (
                <div className="text-sm text-gray-600">No tickets available for this event.</div>
              )}
              <div className="space-y-3">
                {tickets.map((ticket) => {
                  const available = (ticket.quantity ?? 0) - (ticket.sold ?? 0);
                  const disabled = ticket.is_active === false || available <= 0;
                  return (
                    <label key={ticket.id} className={`flex items-center p-4 border rounded-lg cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                      <input
                        {...register('ticketId', { required: 'Please select a ticket type' })}
                        type="radio"
                        value={ticket.id}
                        className="mr-3"
                        disabled={disabled}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{ticket.type}</div>
                        <div className="text-sm text-gray-600">${ticket.price} • {available} left</div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.ticketId && (
                <p className="mt-1 text-sm text-red-600">{String(errors.ticketId.message)}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Additional Details */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                {...register('additionalNotes')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Any dietary restrictions, accessibility needs, or special requests..."
              />
            </div>

            <div>
              <label className="flex items-start space-x-3">
                <input
                  {...register('terms', { required: 'You must accept the terms and conditions' })}
                  type="checkbox"
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-purple-600 hover:underline">
                    terms and conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-600 hover:underline">
                    privacy policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Complete Registration'}
          </button>
        )}
      </div>
    </form>
  );
}