import React, { useState } from 'react';
import { ThumbsUp, Maximize2 } from 'lucide-react';
import { SectionSakuraHeader } from './DecorativeBranches';

export default function EngineeringCultureGallery({ onSelectImage }) {
  const [likes, setLikes] = useState({
    anti_slop: 42,
    toilet_hacker: 89,
    frieren: 64,
    mayuri: 53,
    matrix: 38,
  });

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const cultureCards = [
    {
      id: 'anti_slop',
      title: 'Bad Design is Better Than AI Slop',
      tagline: 'Handcrafted engineering over synthetic filler',
      image: '/assets/culture/anti-ai-slop-retro.jpg',
      badge: 'Core Philosophy',
      caption:
        'Why handcrafted code, real pytest suites, and human benchmarks win every time. If a system was not built by an engineer struggling through terminal crashes at midnight, it has no soul.',
      tags: ['#AntiSlop', '#HumanEngineer', '#AuthenticCraft'],
    },
    {
      id: 'toilet_hacker',
      title: 'The 3:14 AM Incident Response',
      tagline: 'PagerDuty waits for no one',
      image: '/assets/culture/on-call-toilet-hacker.jpg',
      badge: 'On-Call Reality',
      caption:
        'Reigen Arataka energy: PagerDuty fires in production, an S3 ACL drifted public, and you are hotfixing Lambda boto3 scripts with sunglasses on from whatever location you happen to be standing or sitting in.',
      tags: ['#DevSecOpsOnCall', '#ZeroDowntime', '#TrenchLife'],
    },
    {
      id: 'frieren',
      title: 'The 1,000-Year Python Journey',
      tagline: 'Mastering syntax one millennium at a time',
      image: '/assets/culture/frieren-python.jpg',
      badge: 'Language Craft',
      caption:
        'Frieren quietly studying Python AST nodes to optimize the Aegis-2B regex trie parser. Even thousand-year-old mages need to understand Python list comprehensions and memory references.',
      tags: ['#Frieren', '#Python312', '#Aegis2B'],
    },
    {
      id: 'mayuri',
      title: 'Tutturu: Bash Scripts That Run Production',
      tagline: 'The unheralded glue of cloud infrastructure',
      image: '/assets/culture/mayuri-bash.jpg',
      badge: 'POSIX Power',
      caption:
        'Mayuri Shiina holding up the true foundation of modern DevOps: sed, awk, grep, and POSIX pipes gluing AWS CLI automation together across CachyOS Linux workstations.',
      tags: ['#SteinsGate', '#BashAutomation', '#CachyOS'],
    },
    {
      id: 'matrix',
      title: 'Zero-Trust Anomaly in the Crowd',
      tagline: 'Finding the rogue API signature in enterprise traffic',
      image: '/assets/culture/matrix-anomaly.jpg',
      badge: 'Threat Hunting',
      caption:
        'Zero-trust security in one frame: isolating the single unauthorized IAM role escalation in a crowd of mundane corporate API requests. Signal over noise.',
      tags: ['#ThreatHunting', '#ZeroTrust', '#CloudTrail'],
    },
  ];

  return (
    <section
      id="culture"
      className="py-20 border-t transition-colors duration-300"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Sakura Branch Adornment */}
        <div className="mb-14">
          <SectionSakuraHeader category="Real Developer Reality" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-none display">
            In The Trenches<br />
            <span style={{ color: 'var(--brand-coral)' }}>Culture & Memes.</span>
          </h2>
          <p className="text-sm mt-3 max-w-xl opacity-75">
            Behind the telemetry graphs and cloud architectures is a real student engineer in the trenches: debugging on call, refusing AI-generated fluff, and finding joy in terminal craft.
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultureCards.map((card) => (
            <div
              key={card.id}
              className="editorial-card rounded-2xl p-5 border flex flex-col justify-between group hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Image Container with Enlarge Trigger */}
                <div
                  onClick={() => onSelectImage(card.image, card.title)}
                  className="rounded-xl overflow-hidden border aspect-[4/3] mb-4 cursor-pointer relative group/img flex items-center justify-center"
                  style={{
                    background: 'var(--paper-deep)',
                    borderColor: 'var(--line)',
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-mono text-white">
                    <Maximize2 className="w-4 h-4" style={{ color: 'var(--brand-coral)' }} />
                    <span>Click to Enlarge</span>
                  </div>
                </div>

                {/* Badge & Upvote Button */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                    style={{
                      background: 'var(--surface-soft)',
                      borderColor: 'var(--line)',
                      color: 'var(--brand-coral)',
                    }}
                  >
                    {card.badge}
                  </span>

                  <button
                    onClick={(e) => handleLike(card.id, e)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all hover:scale-105"
                    style={{
                      background: 'var(--surface-soft)',
                      borderColor: 'var(--line)',
                    }}
                    title="Give a nod to real engineering"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" style={{ color: 'var(--brand-coral)' }} />
                    <span>{likes[card.id]}</span>
                  </button>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-base font-bold mb-1 leading-snug">
                  {card.title}
                </h3>
                <p
                  className="text-xs font-mono mb-2"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  {card.tagline}
                </p>
                <p className="text-xs leading-relaxed mb-4 opacity-80">
                  {card.caption}
                </p>
              </div>

              {/* Tags */}
              <div
                className="pt-3 border-t flex flex-wrap gap-1.5"
                style={{ borderColor: 'var(--line)' }}
              >
                {card.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border opacity-75"
                    style={{
                      background: 'var(--surface-soft)',
                      borderColor: 'var(--line)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
