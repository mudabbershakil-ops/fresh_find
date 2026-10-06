import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, Compass, ShieldCheck, Heart, Users, MapPin, 
  Leaf, Award, Sparkles, ArrowRight, RefreshCw, Scale 
} from 'lucide-react';


export default function About() {
  var pillars = [
    {
      id: 'terroir',
      number: '01',
      title: '150-Mile Terroir',
      tagline: 'Hyper-Local Sourcing Mandate',
      description: 'Every affiliated vendor cultivates, gathers, or crafts their produce within a strict 150-mile radius of our market pavilions. We eliminate multi-thousand-mile industrial freight, preserving living soil enzymes and peak nutritional density.',
      icon: MapPin,
      badge: '100% Bioregional'
    },
    {
      id: 'access',
      number: '02',
      title: 'Universal Community Access',
      tagline: 'Double Up Food Bucks & SNAP Equity',
      description: 'Wholesome, soil-grown nourishment belongs to all neighbors. We mandate central EBT/SNAP card terminals at every pavilion with a 1:1 token match (up to $20 per visit) through local Double Up Food Bucks partnerships.',
      icon: Heart,
      badge: 'Food Equity'
    },
    {
      id: 'zero-waste',
      number: '03',
      title: 'Zero-Waste Soil Stewardship',
      tagline: 'Compost Loops & Surplus Gleaning',
      description: 'Single-use plastic bags are retired across all stalls in favor of biodegradable burlap, organic cotton totes, and pulp trays. Unsold heirloom produce is gleaned each twilight for community kitchen cold pantries.',
      icon: RefreshCw,
      badge: 'Closed-Loop'
    }
  ];

  var team  = [
    {
      name: 'Elena Rostova',
      role: 'Lead Agrarian Curator & Soil Ecologist',
      bio: 'Former organic soil researcher at Pacific Agrosystems. Elena visits our farmsteads weekly, verifying heirloom seed lineages, soil microbiome vitality, and organic compost standards.',
      location: 'Heritage Valley Station',
      avatarInitial: 'ER',
      focus: 'Heirloom Seed Vitality'
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Community Equity & SNAP Access',
      bio: 'Advocate for grassroots urban food systems. Marcus pioneered our universal token exchange kiosks and coordinated matching grants with regional nutrition assistance programs.',
      location: 'Riverdale Commons',
      avatarInitial: 'MV',
      focus: 'Nutrition Equity'
    },
    {
      name: 'Dr. Aris Thorne',
      role: 'Horticultural Botanist & Seasonal Almanac Editor',
      bio: 'Author of "The Living Furrow". Dr. Thorne compiles our seasonal harvest calendars, chronicling microclimate flushes from coastal marine layer orchards to mountain fungal forays.',
      location: 'Highland Botanical Grove',
      avatarInitial: 'AT',

      focus: 'Phenology & Phenotypes'
    },
    {
      name: 'Sora Takahashi',
      role: 'Market Logistics & Field Pavilions Coordinator',
      bio: 'Urban planner specializing in multi-modal transit and pedestrian plazas. Sora orchestrates zero-emissions stall setups, bicycle valets, and municipal street closures.',
      location: 'Wharf Pavilion Hub',
      avatarInitial: 'ST',
      focus: 'Pavilion Operations'
    }
  ];

  var impactMetrics= [
    { value: '6', label: 'Certified Pavilions', detail: 'Across the regional bioregion' },
    { value: '48+', label: 'Independent Farmsteads', detail: 'Family-owned & generational growers' },
    { value: '$120K+', label: 'SNAP Matching Funds', detail: 'Distributed to community shoppers' },
    { value: '150 mi', label: 'Maximum Sourcing Radius', detail: 'True zero-freight terroir' }
  ];

  return (

    <div className="bg-[#F7F5ED] min-h-screen text-[#1C241B]">
      
      <div className="border-b border-crisp bg-[#EDEAE0]/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[#5C685B]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#2D5A27] transition">FreshFind</Link>
            <span>/</span>
            <span className="text-[#1C241B] font-semibold">About Our Movement</span>

          </div>
          <span className="hidden sm:inline text-[#2D5A27] font-semibold">Field Dispatch Volume VII</span>
        </div>
      </div>

      
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-crisp relative overflow-hidden bg-radial-gradient">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2D5A27]/10 border border-[#2D5A27]/30 text-[#2D5A27] text-xs font-mono uppercase tracking-widest rounded-full font-bold">
            <Sprout className="w-3.5 h-3.5" />
            <span>The FreshFind Manifesto</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C241B] leading-[1.1]">
            Rooted in Community & <br className="hidden sm:inline" />
            <span className="italic text-[#2D5A27]">Slow Food Heritage</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5C685B] font-sans leading-relaxed max-w-2xl mx-auto">
            FreshFind is a non-commercial, field-tested guide created to reconnect regional eaters directly with smallholder family farms, open-air trading squares, and seasonal soil rhythms.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/markets"
              className="btn-primary text-xs sm:text-sm px-6 py-3 shadow-tactile cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Pavilions</span>
            </Link>
            <Link
              to="/produce"
              className="btn-secondary text-xs sm:text-sm px-6 py-3 cursor-pointer"
            >
              <Leaf className="w-4 h-4 text-[#2D5A27]" />
              <span>Seasonal Matrix</span>
            </Link>
          </div>
        </div>
      </section>

      
      <section className="border-b border-crisp bg-[#1C241B] text-[#F7F5ED] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {impactMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#F3E8B1] block">
                {metric.value}
              </span>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F7F5ED]">
                {metric.label}
              </p>
              <p className="text-[11px] font-mono text-[#D6D3C7]/70">
                {metric.detail}
              </p>
            </div>
          ))}

        </div>
      </section>

      
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-crisp max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E2725B] font-bold block">
              Our Agrarian Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C241B] leading-tight">
              Why We Bypass the Industrial Cold Chain
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#5C685B] leading-relaxed font-sans">
              <p>
                In the modern grocery ecosystem, fresh produce travels an average of 1,500 miles, harvested weeks premature, artificially gassed in dark holds, and stripped of vital phytonutrients before it ever reaches a consumer's kitchen.
              </p>
              <p>
                FreshFind was chartered by an alliance of independent soil growers, urban organizers, and culinary historians who believed our region could do better. By cataloging real-time market schedules, peak seasonal matrices, and verified vendor charters in an open-access directory, we restore genuine human trust between cultivator and diner.
              </p>
              <p>
                Every heirloom melon, stone-milled loaf, and bunch of peppery watercress listed in our field guide is harvested within 24 hours of market opening. You know whose hands tilled the earth, how the soil was amended, and what seeds were planted.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#2D5A27] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
              <span>Certified TechWiz 7 Open-Access Architecture • No Commercial Ads</span>

            </div>
          </div>

          
          <div className="lg:col-span-6">
            <div className="bg-[#EDEAE0] p-8 sm:p-10 border-2 border-[#1C241B] shadow-[6px_8px_0px_0px_rgba(28,36,27,0.15)] relative">
              <div className="w-10 h-10 bg-[#2D5A27] text-[#F3E8B1] flex items-center justify-center font-editorial text-2xl font-bold mb-4">
                “
              </div>
              <blockquote className="font-editorial text-xl sm:text-2xl text-[#1C241B] italic leading-snug">
                Eating is an agricultural act. When you buy direct from a regional farmer, you vote for living topsoil, watershed preservation, and the survival of heirloom seed biodiversity.
              </blockquote>
              <div className="mt-6 pt-4 border-t border-[#D6D3C7] flex items-center justify-between">
                <div>
                  <p className="font-sans font-bold text-sm text-[#1C241B]">Field Charter Principle IV</p>
                  <p className="font-mono text-xs text-[#5C685B]">Slow Food Commons Bioregion</p>
                </div>
                <Sprout className="w-6 h-6 text-[#2D5A27]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EDEAE0]/40 border-b border-crisp">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2D5A27] font-bold block">
              Core Guidelines
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C241B]">
              The Three Pillars of FreshFind
            </h2>
            <p className="text-xs sm:text-sm text-[#5C685B]">
              Every market listed in our index signs our charter, committing to transparency, equity, and environmental care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar) => {

              let Icon  = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-[#F7F5ED] border border-crisp p-6 sm:p-7 shadow-tactile card-editorial flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">

                      <span className="font-mono text-xs font-bold text-[#E2725B] bg-[#E2725B]/10 px-2.5 py-0.5 rounded-full">
                        PILLAR {pillar.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C685B] bg-[#EDEAE0] px-2 py-0.5 border border-[#D6D3C7]">
                        {pillar.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2D5A27] text-[#F3E8B1] flex items-center justify-center rounded-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-editorial text-xl font-bold text-[#1C241B] leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-[11px] font-mono text-[#5C685B]">
                          {pillar.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C685B] font-sans leading-relaxed pt-2">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-crisp flex items-center gap-2 text-xs font-mono text-[#2D5A27] font-semibold">
                    <CheckCircle2Icon className="w-4 h-4 text-[#2D5A27]" />
                    <span>Charter Enforced</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-crisp max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E2725B] font-bold block">
              Field Curators & Organizers
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C241B]">
              The Naturalists Behind the Field Guide
            </h2>
            <p className="text-xs sm:text-sm text-[#5C685B]">

              Passionate botanists, soil researchers, and community advocates maintaining our seasonal intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-crisp p-5 sm:p-6 shadow-tactile card-editorial flex flex-col justify-between"

              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-[#2D5A27] text-[#F3E8B1] flex items-center justify-center font-mono font-bold text-sm border-2 border-[#1E3D1A]">

                      {member.avatarInitial}
                    </div>
                    <span className="text-[10px] font-mono text-[#2D5A27] font-semibold bg-[#2D5A27]/10 px-2 py-0.5 rounded-full">
                      {member.focus}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#1C241B]">
                      {member.name}

                    </h3>
                    <p className="text-xs text-[#E2725B] font-mono font-medium">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#5C685B] font-sans leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-crisp flex items-center gap-1.5 text-[11px] font-mono text-[#5C685B]">
                  <MapPin className="w-3.5 h-3.5 text-[#2D5A27]" />
                  <span>{member.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#1C241B] text-[#F7F5ED] text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <Sprout className="w-8 h-8 text-[#F3E8B1] mx-auto" />
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F5ED]">
            Experience Your Bioregion Firsthand
          </h2>
          <p className="text-xs sm:text-sm text-[#D6D3C7]/80 max-w-md mx-auto">
            Discover which stalls are operating this weekend, browse harvest guides, or chat with our offline Field Guide Bot.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/markets"
              className="btn-primary text-xs px-5 py-2.5 shadow-tactile cursor-pointer"
            >
              Browse Pavilion Schedules &rarr;
            </Link>
            <Link
              to="/contact"
              className="btn-secondary text-xs px-5 py-2.5 cursor-pointer text-white bg-[#2D5A27]/60 border-[#2D5A27] hover:bg-[#2D5A27]"
            >
              Connect with Field Office

            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2Icon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"

    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
