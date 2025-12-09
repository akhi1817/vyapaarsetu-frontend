import { Mail, Phone, Globe, Braces } from 'lucide-react';

export function Variation6() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {/* Front Side */}
      <div className="w-[400px] h-60 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="h-full flex">
          {/* Left section with color */}
          <div className="w-32 bg-linear-to-b from-blue-600 to-blue-700 p-6 flex flex-col justify-between items-center text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
              <Braces className="w-6 h-6 text-white" />
            </div>
            
            <div className="text-center -rotate-90 whitespace-nowrap text-xs tracking-widest">
              WEB DEVELOPER
            </div>
          </div>

          {/* Right section with info */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="text-blue-600 text-xs mb-4">Vyapaarsetu Business Solutions</div>
              <h1 className="text-slate-900 mb-1 leading-tight">Akhilesh Ramesh</h1>
              <h1 className="text-slate-900 mb-4 leading-tight">Kumbhar</h1>
            </div>

            <div className="space-y-2">
              <div className="text-slate-600 text-sm flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                <span>Creating digital experiences</span>
              </div>
              <div className="text-slate-600 text-sm flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                <span>Modern web solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side */}
      <div className="w-[400px] h-60 bg-white rounded-2xl shadow-xl p-8 border border-slate-200 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-30"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="text-slate-400 text-xs mb-1">CONTACT ME</div>
            <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-transparent rounded"></div>
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Call / WhatsApp</div>
                <div className="text-slate-900">+91 8177819283</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Email Address</div>
                <div className="text-slate-900 text-sm">akhileshkumbhar2207@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Portfolio Website</div>
                <div className="text-slate-900 text-xs break-all">vyapaarsetu-business-solutions.vercel.app</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
