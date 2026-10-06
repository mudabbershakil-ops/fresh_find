import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, Sprout, ShieldCheck, ArrowRight, Loader2, AlertCircle 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData]= useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage]= useState(null);

  var subjects = [
    'General Inquiry',
    'Vendor & Stall Application',
    'Market Community Feedback',
    'Technical Support & Suggestions'
  ];

  let handleChange  = (e) => {
    const { name, value }  = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  var handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(`Thank you, ${formData.name}! Your message has been routed to our regional market coordinator.`);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 900);
  };

  return (
    <div className="bg-[#F7F5ED] min-h-screen text-[#1C241B]">
      
      <div className="border-b border-crisp bg-[#EDEAE0]/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[#5C685B]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#2D5A27] transition">FreshFind</Link>
            <span>/</span>
            <span className="text-[#1C241B] font-semibold">Contact Field Office</span>
          </div>
          <span className="text-[#2D5A27] font-semibold hidden sm:inline">Inquiries & Stall Charters</span>
        </div>
      </div>

      
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-crisp bg-radial-gradient">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2D5A27]/10 border border-[#2D5A27]/30 text-[#2D5A27] text-xs font-mono uppercase tracking-widest rounded-full font-bold">
            <Mail className="w-3.5 h-3.5" />

            <span>Field Communications</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#1C241B]">
            Connect with the <span className="italic text-[#2D5A27]">Field Office</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C685B] font-sans leading-relaxed max-w-2xl mx-auto">
            Have questions about seasonal availability, vendor qualification standards, or municipal SNAP programs? Our regional coordinators are here to help.
          </p>
        </div>
      </section>


      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-[#1C241B] p-6 sm:p-10 shadow-[6px_8px_0px_0px_rgba(28,36,27,0.15)] rounded-sm">
              <div className="mb-6">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C241B]">
                  Send a Dispatch
                </h2>
                <p className="text-xs sm:text-sm text-[#5C685B] mt-1 font-sans">
                  Fill out the form below. Dispatches are reviewed within 24 business hours.
                </p>
              </div>

              {submittedMessage && (
                <div className="mb-6 p-4 bg-[#2D5A27]/10 border-2 border-[#2D5A27] text-[#1E3D1A] rounded-sm flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#2D5A27]">
                      Dispatch Sent Successfully
                    </h4>
                    <p className="text-xs sm:text-sm mt-0.5 font-sans leading-relaxed">
                      {submittedMessage}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1.5 font-semibold">
                      Your Full Name <span className="text-[#E2725B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Roland Thorne"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5ED]/40 border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none rounded-sm transition font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1.5 font-semibold">
                      Email Address <span className="text-[#E2725B]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="roland@soilcraft.org"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5ED]/40 border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none rounded-sm transition font-sans"
                    />

                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1.5 font-semibold">
                    Inquiry Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5ED]/40 border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none rounded-sm transition font-sans cursor-pointer"
                  >
                    {subjects.map((subj, idx) => (
                      <option key={idx} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1.5 font-semibold">
                    Message / Field Notes <span className="text-[#E2725B]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your farmstead, feedback on weekend stalls, or questions regarding SNAP double tokens..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F5ED]/40 border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none rounded-sm transition font-sans leading-relaxed"

                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-xs sm:text-sm px-6 py-3 shadow-tactile-sm cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message to Field Office</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#EDEAE0] border border-crisp p-6 sm:p-7 shadow-tactile space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#D6D3C7]">
                <div className="w-8 h-8 bg-[#2D5A27] text-[#F3E8B1] flex items-center justify-center rounded-sm">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#1C241B]">
                    Field Coordinates
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C685B]">
                    Regional Administration
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1C241B]">Regional Field Headquarters</p>
                    <p className="text-[#5C685B] leading-relaxed">
                      412 Heritage Arcade, Pavilion Suite 3B<br />
                      Historic Old Town Plaza District
                    </p>

                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1C241B]">Operational Hours</p>
                    <p className="text-[#5C685B] leading-relaxed">
                      Mon – Fri: 8:30 AM – 5:00 PM<br />
                      Sat Field Station: 7:30 AM – 3:00 PM<br />
                      Sun: Emergency Market Hotline Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1C241B]">Direct Dispatch</p>
                    <p className="text-[#5C685B] font-mono">
                      dispatch@freshfind.local
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1C241B]">Community Phone</p>
                    <p className="text-[#5C685B] font-mono">
                      +1 (555) 749-3663
                    </p>
                  </div>
                </div>
              </div>

            </div>

            
            <div className="bg-[#1C241B] text-[#F7F5ED] border border-[#2D5A27] p-6 shadow-tactile space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#F3E8B1]" />
                <h4 className="font-editorial text-lg font-bold text-[#F7F5ED]">
                  Need Instant Answers?
                </h4>
              </div>
              <p className="text-xs text-[#D6D3C7]/90 leading-relaxed font-sans">
                Our pre-scripted offline Botanical Field Guide assistant is ready right now to answer questions on pet policies, hours, EBT matching, or parking options.
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-mono text-[#F3E8B1] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E2725B] animate-pulse" />
                  <span>Click the green "Field Guide Bot" launcher at the bottom-right corner!</span>
                </span>
              </div>
            </div>

            
            <div className="bg-white border border-crisp p-5 text-xs text-[#5C685B] space-y-2">

              <div className="flex items-center gap-1.5 text-[#2D5A27] font-bold font-mono uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Vendor Charter Rule</span>
              </div>
              <p className="leading-relaxed">
                Applying to vend? Review our 150-mile bioregion sourcing criteria and organic pledge before submitting your stall portfolio.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-[#2D5A27] font-bold hover:underline pt-1 text-[11px] font-mono"
              >
                <span>Read the Three Pillars</span>
                <ArrowRight className="w-3 h-3" />

              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
