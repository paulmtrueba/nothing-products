import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Check, AlertCircle, Mail, User, MessageSquare } from 'lucide-react';
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="py-20 bg-sand bg-opacity-20">
      <div className="container mx-auto px-4 md:px-6">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate">
              Get In <span className="text-aqua">Touch</span>
            </h2>
            <p className="text-xl text-slate max-w-3xl mx-auto">
              Have questions about our microplastic-free products or want to
              learn more? We'd love to hear from you.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-mist rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-aqua p-8 md:p-12 text-mist flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      Contact Information
                    </h3>
                    <p className="mb-8">
                      We're committed to answering all your questions about our
                      microplastic-free silicone products.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-6 w-6 mr-4 mt-1" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:hello@nothing.com" className="text-aqua-light hover:text-mist">
                            hello@nothing.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 flex flex-col items-center">
                    <img src="/logo2.png" alt="Nothing Logo" className="w-48 h-48 mb-4" />
                    <p className="text-center text-mist text-opacity-90 font-medium">
                      Free From Microplastics
                    </p>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  {isSubmitted ? <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="bg-aqua-light rounded-full p-4 mb-4">
                        <Check className="h-8 w-8 text-aqua" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate mb-2">
                        Thank You!
                      </h3>
                      <p className="text-slate mb-6">
                        Your message has been sent successfully. We'll get back
                        to you as soon as possible.
                      </p>
                      <button onClick={() => setIsSubmitted(false)} className="px-6 py-2 bg-aqua text-mist rounded-md hover:bg-opacity-90 transition-colors">
                        Send Another Message
                      </button>
                    </div> : <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                          <p>{error}</p>
                        </div>}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate mb-1">
                          Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate text-opacity-60 h-5 w-5" />
                          <input id="name" type="text" className={`pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-slate border-opacity-20'}`} placeholder="Your name" {...register('name', {
                        required: 'Name is required'
                      })} />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate text-opacity-60 h-5 w-5" />
                          <input id="email" type="email" className={`pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-slate border-opacity-20'}`} placeholder="your.email@example.com" {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })} />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate mb-1">
                          Subject
                        </label>
                        <input id="subject" type="text" className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-colors ${errors.subject ? 'border-red-500' : 'border-slate border-opacity-20'}`} placeholder="How can we help you?" {...register('subject', {
                      required: 'Subject is required'
                    })} />
                        {errors.subject && <p className="mt-1 text-sm text-red-600">
                            {errors.subject.message}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate mb-1">
                          Message
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 text-slate text-opacity-60 h-5 w-5" />
                          <textarea id="message" rows={5} className={`pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-colors ${errors.message ? 'border-red-500' : 'border-slate border-opacity-20'}`} placeholder="Your message..." {...register('message', {
                        required: 'Message is required'
                      })} />
                        </div>
                        {errors.message && <p className="mt-1 text-sm text-red-600">
                            {errors.message.message}
                          </p>}
                      </div>
                      <div>
                        <button type="submit" disabled={isSubmitting} className={`w-full flex items-center justify-center px-6 py-3 bg-aqua text-mist rounded-md font-medium hover:bg-opacity-90 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                          {isSubmitting ? <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-mist" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </> : <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>}
                        </button>
                      </div>
                    </form>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}