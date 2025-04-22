import { useState } from 'react';
import { Activity, Clock, Heart, HelpCircle, Zap, Hospital, MessageCircle, PlusCircle, BarChart2, Users } from 'lucide-react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('hospitals');

  return (
    <section id="how" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-red-600">How It Works</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            We make the process of blood donation smoother and smarter — for both donors and hospitals.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg p-1 bg-slate-100 shadow-sm">
            <button
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition ${
                activeTab === 'hospitals' 
                  ? 'bg-white text-red-600 shadow-md' 
                  : 'hover:bg-white/50 text-slate-700'
              }`}
              onClick={() => setActiveTab('hospitals')}
            >
              <Hospital size={20} />
              <span className="font-medium">For Hospitals</span>
            </button>
            <button
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition ${
                activeTab === 'donors' 
                  ? 'bg-white text-red-600 shadow-md' 
                  : 'hover:bg-white/50 text-slate-700'
              }`}
              onClick={() => setActiveTab('donors')}
            >
              <Heart size={20} />
              <span className="font-medium">For Donors</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {/* Hospital Content */}
          <div className={`transition-all duration-500 ${activeTab === 'hospitals' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 right-0'}`}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    <PlusCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">Join the Network</h3>
                    <p className="text-slate-600">
                      Hospitals easily connect with our platform to manage and access their own donor lists.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">Smart Donor Management</h3>
                    <p className="text-slate-600">
                      Add new donors through a seamless interface. Send out reminders, alerts, and manage your donation drives effortlessly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    <BarChart2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">AI-Driven Insights</h3>
                    <p className="text-slate-600">
                      Use our AI tools to predict donation likelihood, optimize your outreach, and ensure timely responses to blood needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-100 rounded-lg text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">24/7 Support</h3>
                    <p className="text-slate-600">
                      Need help? Hospitals can contact our team anytime to resolve issues, get clarification, or suggest improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donors Content */}
          <div className={`transition-all duration-500 ${activeTab === 'donors' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 right-0'}`}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition h-full">
                    <div className="absolute -top-4 -left-2 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                    <div className="pt-4 pl-6">
                      <h3 className="text-xl font-semibold mb-3 text-slate-800">No Sign-Up Needed</h3>
                      <p className="text-slate-600">
                        You don't need to register. Just let us know you're interested in donating blood.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="relative">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition h-full">
                    <div className="absolute -top-4 -left-2 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                    <div className="pt-4 pl-6">
                      <h3 className="text-xl font-semibold mb-3 text-slate-800">Chatbot & Support Team</h3>
                      <p className="text-slate-600">
                        Talk to our friendly chatbot or contact our team — we'll guide you to the nearest hospital that needs your blood type.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="relative">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition h-full">
                    <div className="absolute -top-4 -left-2 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
                    <div className="pt-4 pl-6">
                      <h3 className="text-xl font-semibold mb-3 text-slate-800">Fast & Impactful</h3>
                      <p className="text-slate-600">
                        Head to the suggested hospital and donate. Your contribution could save a life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-red-50 p-6 rounded-xl border border-red-100 flex items-center gap-6">
              <div className="p-4 bg-red-100 rounded-full text-red-600">
                <Heart size={32} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-1">Every Drop Counts</h4>
                <p className="text-slate-700">
                  Our AI matches your blood type with hospitals in urgent need, maximizing the impact of your generous donation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}