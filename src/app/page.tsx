"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, Settings, TrendingUp, Lightbulb, 
  Cpu, Activity, Network, Zap, Headset, 
  Fish, TreePine, Factory, ArrowRight,
  MapPin, Globe, Mail, CheckCircle2, ChevronRight, X, RotateCw,
  Loader2, AlertCircle
} from 'lucide-react';

function MiningTruck({ size = 24, className = '', strokeWidth = 2, ...props }: { size?: number | string; className?: string; strokeWidth?: number | string; [key: string]: any }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M2.5 9 5 14.5h9.5l1-7h4L22 4H8.5L2.5 9z" />
      <path d="M14.5 14.5h4v-3.5h-2.5" />
      <line x1="18.5" y1="14.5" x2="20.5" y2="14.5" />
      <circle cx="6.5" cy="18.5" r="2.75" />
      <circle cx="16.5" cy="18.5" r="2.75" />
      <line x1="9.25" y1="18.5" x2="13.75" y2="18.5" />
    </svg>
  );
}

interface Solution {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  longDesc: string;
  image: string;
  features: string[];
}

const solutionsData: Solution[] = [
  { 
    icon: Cpu, 
    title: "Ingeniería y Automatización", 
    desc: "Desarrollo de ingeniería, control de procesos, PLC, HMI, instrumentación y puesta en marcha.",
    longDesc: "Desarrollamos proyectos de ingeniería llave en mano desde la fase conceptual hasta la puesta en marcha. Diseñamos arquitecturas de control robustas y escalables para optimizar tus procesos productivos y asegurar la continuidad operacional.",
    image: "/ingenieria.jpg",
    features: ["Programación de PLC (Siemens, Rockwell, Schneider)", "Desarrollo de HMI a medida", "Diseño de redes de control industrial", "Puestas en marcha en terreno y soporte continuo"]
  },
  { 
    icon: Activity, 
    title: "SCADA y Digitalización", 
    desc: "Supervisión, historización, reportabilidad, dashboards, integración OT/IT y VPC para SCADAs en la nube.",
    longDesc: "Implementamos sistemas de supervisión y adquisición de datos de última generación. Transformamos variables de planta en tableros de información estratégica en tiempo real, facilitando la toma de decisiones basada en datos.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    features: ["Sistemas SCADA locales e híbridos (WinCC, Ignition, atvise)", "Dashboards KPIs en tiempo real", "Historización y base de datos de proceso", "Migración de SCADA tradicionales a la nube (VPC)"]
  },
  { 
    icon: Network, 
    title: "Integración y Comunicaciones", 
    desc: "Integración de equipos, redes industriales, OPC UA, bases de datos y conexión con sistemas corporativos.",
    longDesc: "Conectamos el mundo operativo (OT) con el corporativo (IT). Nos aseguramos de que toda tu maquinaria e instrumentación hable un mismo lenguaje y entregue información valiosa para tus sistemas de gestión (ERP, SAP, MES).",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    features: ["Integración mediante OPC UA y Modbus", "Configuración de redes industriales seguras", "Conexión de bases de datos de proceso", "Protocolos de ciberseguridad industrial"]
  },
  { 
    icon: Zap, 
    title: "Tableros y Energía", 
    desc: "Integración y construcción de tableros de control, fuerza, variadores, medición y eficiencia energética.",
    longDesc: "Diseñamos e integramos armarios eléctricos y tableros de control bajo estrictas normas de seguridad. Ofrecemos soluciones enfocadas en la eficiencia energética y la reducción de costos operativos.",
    image: "/tableros.jpg",
    features: ["Tableros de fuerza y control (PLC)", "Sistemas de distribución y fuerza", "Variadores de frecuencia y partidores suaves", "Monitoreo y medición de consumo eléctrico"]
  },
  { 
    icon: Headset, 
    title: "Soporte 24/7", 
    desc: "Monitoreo remoto, diagnóstico, continuidad operacional y acompañamiento técnico posterior a la puesta en servicio.",
    longDesc: "Ofrecemos un servicio permanente de monitoreo, diagnóstico y asistencia técnica remota para responder ágilmente ante cualquier contingencia. Nos convertimos en una extensión de tu equipo técnico.",
    image: "/soporte.jpg",
    features: ["Monitoreo remoto de variables críticas", "Soporte telefónico y por videollamada 24/7", "Diagnóstico temprano de fallas de control", "Planes de mantenimiento preventivo y correctivo"]
  },
  { 
    icon: RotateCw, 
    title: "Control de movimiento en servomotores", 
    desc: "Expertos en control y sincronización de ejes y accionamientos.",
    longDesc: "Diseñamos y parametrizamos sistemas de control de movimiento (Motion Control) de alta precisión. Sincronizamos ejes para procesos complejos de embalaje, corte al vuelo, posicionamiento rápido y coordinación multi-axial.",
    image: "/servomotor.png",
    features: ["Sincronización de ejes (Electronic Camming, Gearing)", "Parametrización de servo-accionamientos (Siemens, Rockwell, Yaskawa)", "Sistemas de corte al vuelo y posicionamiento rápido", "Control de torque, velocidad y posición con lazo cerrado"]
  }
];

export default function Home() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setFormFeedback('Por favor completa todos los campos requeridos.');
      return;
    }

    setFormStatus('loading');
    setFormFeedback('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '1b357ed3-4c91-4868-a132-19d96c7bf6fd',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Nuevo contacto desde www.kevprocess.com - ${formData.name}`,
          from_name: 'Web Kevprocess'
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Error al procesar el mensaje');
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setFormFeedback('No se pudo enviar automáticamente en este momento. Por favor escríbenos directamente a contacto@kevprocess.com');
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Kevprocess Logo" 
              width={240} 
              height={55} 
              priority 
              className="h-12 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#capacidades" className="hover:text-cyan transition-colors">Capacidades</a>
            <a href="#sectores" className="hover:text-cyan transition-colors">Sectores</a>
            <a href="#casos" className="hover:text-cyan transition-colors">Casos de Éxito</a>
            <a href="#contacto" className="px-5 py-2.5 bg-navy text-white rounded hover:bg-navy-light transition-all">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION - Modern Isometric Presentation */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 px-6 overflow-hidden bg-white">
        {/* Subtle background matrix/dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_50%,#000_60%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 text-left pt-2 lg:pt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black leading-[1.12] text-[#0A192F] tracking-tight mb-6">
              Soluciones industriales para continuidad operacional.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg leading-relaxed font-normal">
              Supervisión, integración y modernización tecnológica. Integramos ingeniería, automatización y digitalización para asegurar la continuidad operacional y el óptimo desempeño de planta.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#capacidades" 
                className="px-6 py-3.5 bg-[#1D6A6E] hover:bg-[#155457] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center text-sm sm:text-base"
              >
                Nuestras Soluciones
              </a>
              <a 
                href="#contacto" 
                className="px-7 py-3.5 bg-white border border-[#1D6A6E] text-[#1D6A6E] hover:bg-[#1D6A6E]/5 font-bold rounded-lg shadow-sm hover:border-[#155457] hover:text-[#155457] transition-all duration-200 text-center text-sm sm:text-base"
              >
                Hablemos
              </a>
            </div>
          </div>
          
          {/* Right Column: 3D Isometric Screen Cascade */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[650px] transform hover:scale-[1.01] transition-transform duration-500 ease-out">
              <Image 
                src="/hero-screens.png" 
                alt="Plataforma de visualización, monitoreo 24/7 e integración OT/IT Kevprocess" 
                width={650} 
                height={534} 
                priority 
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* VALUE PROPOSITION BAR */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
          {[
            { icon: ShieldCheck, title: "CONFIABILIDAD", desc: "Operación continua" },
            { icon: Network, title: "INTEGRACIÓN", desc: "Sistemas conectados" },
            { icon: TrendingUp, title: "EFICIENCIA", desc: "Procesos optimizados" },
            { icon: Lightbulb, title: "INNOVACIÓN", desc: "Tecnología avanzada" }
          ].map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center gap-4 ${i !== 0 ? 'md:pl-6' : ''}`}>
              <div className="w-12 h-12 rounded bg-slate-50 flex items-center justify-center text-cyan shrink-0">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPACIDADES Y SOLUCIONES */}
      <section id="capacidades" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:w-2/3 mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Capacidades y Soluciones</h2>
            <p className="text-slate-600 text-lg">
              Integramos ingeniería, automatización y digitalización para mejorar continuidad operacional, trazabilidad y desempeño de planta.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutionsData.map((sol, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedSolution(sol)}
                className="group p-8 bg-white border border-slate-200 rounded shadow-sm hover:shadow-xl hover:border-cyan/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan group-hover:text-white transition-colors text-cyan">
                    <sol.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{sol.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{sol.desc}</p>
                </div>
                <div className="flex items-center text-sm font-bold text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  Saber más <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORES */}
      <section id="sectores" className="py-24 px-6 bg-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Sectores que Atendemos</h2>
              <p className="text-slate-300">
                Llevamos la excelencia técnica y operativa a los sectores más exigentes de la industria productiva.
              </p>
            </div>
            <a href="#contacto" className="text-cyan font-bold flex items-center gap-2 hover:text-white transition-colors">
              Consulta por tu sector <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: MiningTruck, title: "Minería" },
              { icon: Fish, title: "Alimentos y Pesquero" },
              { icon: TreePine, title: "Maderero" },
              { icon: Factory, title: "Manufactura" }
            ].map((sector, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-10 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <sector.icon size={40} className="text-emerald mb-4" strokeWidth={1.5} />
                <h4 className="font-bold text-center">{sector.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO */}
      <section id="casos" className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Casos de Éxito</h2>
            <p className="text-slate-600">Experiencia aplicada en control, supervisión, integración y continuidad operacional.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "SCADA planta de RILES", desc: "Desarrollo de sistema SCADA para supervisión y operación de planta de tratamiento de RILES.", tech: "Siemens WinCC Unified" },
              { num: "02", title: "Control Carguío Alto Horno", desc: "Implementación de control y supervisión para operación crítica de carguío en alto horno.", tech: "Siemens S7-1500 · HMI Unified Comfort · SCADA WinCC" },
              { num: "03", title: "Pesaje, registro y acceso", desc: "Automatización del proceso con trazabilidad, integración operativa y conexión con SAP.", tech: "PLC Siemens · Software atvise" },
              { num: "04", title: "Integración de tableros", desc: "Desarrollo e integración de solución de control con arquitectura confiable para operación industrial.", tech: "Schneider Electric · Rittal" }
            ].map((caso, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-navy">{caso.title}</h3>
                  <span className="text-2xl font-black text-slate-100">{caso.num}</span>
                </div>
                <p className="text-slate-600 text-sm mb-6">{caso.desc}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded text-xs text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan"></span>
                  {caso.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELACIÓN DE LARGO PLAZO & CLIENTES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Relación de Largo Plazo</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Más que ejecutar proyectos, buscamos convertirnos en un aliado técnico permanente para nuestros clientes industriales.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {[
              { step: 1, title: "Base instalada", desc: "Conocimiento técnico de activos, procesos y restricciones operacionales." },
              { step: 2, title: "Roadmap tecnológico", desc: "Priorización de mejoras según riesgo, retorno, criticidad y continuidad." },
              { step: 3, title: "Ejecución confiable", desc: "Proyectos, ampliaciones, migraciones, tableros, integración y pruebas." },
              { step: 4, title: "Soporte y evolución", desc: "Monitoreo 24/7, reportabilidad, mantenimiento y mejora continua." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 text-navy font-black text-xl flex items-center justify-center mb-6 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-navy mb-3">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
                {/* Connector line for desktop */}
                {i !== 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-slate-200 -z-10"></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-slate-200">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">Partners Tecnológicos</h3>
              <div className="flex flex-wrap gap-3">
                {['SIEMENS', 'SCHNEIDER ELECTRIC', 'AVEVA', 'PHOENIX CONTACT', 'DELTA ELECTRONICS', 'ATVISE', 'RITTAL', 'VESTER BUSINESS'].map(partner => (
                  <span key={partner} className="px-4 py-2 border border-slate-200 rounded text-sm text-slate-600 font-medium bg-slate-50">{partner}</span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">Clientes Destacados</h3>
              <div className="flex flex-wrap gap-2">
                {['Arauco', 'CMPC', 'CMP', 'Nutrisco', 'Alimar', 'Huachipato', 'Camanchaca', 'Aserraderos JCE', 'AZA', 'Carozzi', 'Aclara'].map(cliente => (
                  <span key={cliente} className="px-3 py-1.5 rounded text-xs text-slate-500 bg-white border border-slate-200">{cliente}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACTO */}
      <footer id="contacto" className="bg-navy pt-20 pb-10 px-6 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <div className="flex items-center mb-8">
              <Image 
                src="/logo.png" 
                alt="Kevprocess Logo" 
                width={240} 
                height={55} 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-slate-300 mb-8 max-w-sm">
              Tu aliado estratégico en automatización, control e integración para la industria moderna.
            </p>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="text-cyan" size={20} />
                <span>Victoria 984, San Pedro de la Paz</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-cyan" size={20} />
                <span>www.kevprocess.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-cyan" size={20} />
                <span>contacto@kevprocess.com</span>
              </div>
            </div>
          </div>
          
          <div className="bg-navy-light p-8 rounded border border-white/10">
            <h3 className="text-2xl font-bold mb-2">Iniciemos un proyecto</h3>
            <p className="text-slate-400 text-sm mb-6">
              Completa el formulario y te responderemos a la brevedad.
            </p>

            {formStatus === 'success' ? (
              <div className="bg-emerald/10 border border-emerald/30 p-6 rounded-lg text-center space-y-3">
                <CheckCircle2 className="text-emerald mx-auto" size={44} />
                <h4 className="text-lg font-bold text-white">¡Mensaje enviado con éxito!</h4>
                <p className="text-slate-300 text-sm">
                  Hemos recibido tu consulta. Nos pondremos en contacto contigo a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="text-xs text-cyan hover:underline pt-2 font-semibold inline-block"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Nombre</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-navy border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors placeholder:text-slate-500" 
                      placeholder="Tu nombre" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-navy border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors placeholder:text-slate-500" 
                      placeholder="tu@empresa.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold uppercase">Mensaje</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-navy border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan transition-colors placeholder:text-slate-500" 
                    placeholder="¿En qué te podemos ayudar?"
                  ></textarea>
                </div>

                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 text-rose-300 text-xs bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <AlertCircle size={16} className="shrink-0 text-rose-400" />
                    <span>{formFeedback}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-cyan hover:bg-emerald text-navy font-bold py-3 rounded transition-colors flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} Kevprocess Automation & Process. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>

      {/* SOLUTION MODAL */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-white rounded shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedSolution(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-slate-100 text-slate-500 hover:text-navy transition-colors border border-slate-200"
            >
              <X size={20} />
            </button>

            {/* Left side: Image */}
            <div className="relative w-full md:w-1/2 h-48 md:h-auto min-h-[200px] bg-slate-100 shrink-0">
              <img 
                src={selectedSolution.image} 
                alt={selectedSolution.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
            </div>

            {/* Right side: Content */}
            <div className="p-8 md:p-10 flex-1 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-cyan font-bold text-xs uppercase tracking-wider mb-3">
                  <span className="p-1 rounded bg-cyan/10">
                    {React.createElement(selectedSolution.icon, { size: 14 })}
                  </span>
                  Solución Industrial
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">
                  {selectedSolution.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedSolution.longDesc}
                </p>

                <h4 className="text-xs font-bold text-navy uppercase tracking-widest mb-3">
                  Características principales
                </h4>
                <ul className="space-y-2 mb-6">
                  {selectedSolution.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-emerald shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-2">
                <button 
                  onClick={() => setSelectedSolution(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded transition-colors text-sm"
                >
                  Cerrar
                </button>
                <a 
                  href="#contacto" 
                  onClick={() => setSelectedSolution(null)}
                  className="px-5 py-2.5 bg-cyan hover:bg-cyan/90 text-navy font-bold rounded transition-colors text-center text-sm"
                >
                  Cotizar Solución
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
