import React from 'react';
import { useLanguage } from '../LanguageContext';

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  hero: {
    textAlign: 'center',
    backgroundColor: '#2c7a4b',
    color: 'white',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
  },
  heroTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  heroSubtitle: { fontSize: '1.1rem', opacity: 0.9 },
  sectionTitle: {
    fontSize: '1.5rem', fontWeight: 'bold', color: '#2c7a4b',
    margin: '2rem 0 1rem 0', borderBottom: '3px solid #2c7a4b', paddingBottom: '0.5rem',
  },
  card: {
    backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1rem',
    borderLeft: '5px solid #2c7a4b',
  },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' },
  cardIcon: { fontSize: '2rem' },
  cardTitle: { fontSize: '1.2rem', fontWeight: 'bold', color: '#2c7a4b' },
  cardSubtitle: { fontSize: '0.9rem', color: '#888', fontWeight: 'normal' },
  cardBody: { color: '#555', fontSize: '0.95rem', lineHeight: '1.6' },
  featureTag: {
    display: 'inline-block', backgroundColor: '#eaf7ef', color: '#2c7a4b',
    borderRadius: '20px', padding: '0.3rem 0.8rem', fontSize: '0.85rem',
    fontWeight: 'bold', margin: '0.3rem 0.3rem 0 0', border: '1px solid #2c7a4b',
  },
  personaCard: {
    backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1rem',
  },
  personaName: { fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.3rem' },
  personaDesc: { color: '#555', fontSize: '0.95rem', lineHeight: '1.6' },
  highlight: {
    backgroundColor: '#fff3cd', border: '1px solid #f4a116',
    borderRadius: '10px', padding: '1rem 1.5rem', marginBottom: '2rem',
    color: '#7a5000', fontSize: '0.95rem', lineHeight: '1.6',
  },
};

const facets = [
  {
    icon: '📶',
    title: 'Access to Reliable Technology',
    subtitle: 'Facet 1',
    description: 'Low-SES users often rely on older devices, shared computers, or unstable internet connections. Technology that assumes fast, reliable internet excludes these users.',
    features: ['🐢 Low-Bandwidth Mode', 'Simplified card view saves data', 'No heavy images or animations in low-bandwidth mode', 'Fast-loading plain text layout'],
    color: '#cc7000',
  },
  {
    icon: '📚',
    title: 'Communication Literacy & Education',
    subtitle: 'Facet 2',
    description: 'Users vary in language fluency, literacy level, and familiarity with technical vocabulary. Software that uses jargon or complex language creates barriers for low-SES users.',
    features: ['🇪🇸 English/Spanish toggle', 'Plain language "simple descriptions" for every resource', 'No jargon in UI — e.g. "Walk-in OK" not "Ambulatory intake available"', 'Clear labels on all buttons and forms'],
    color: '#1a6896',
  },
  {
    icon: '💪',
    title: 'Technology Self-Efficacy',
    subtitle: 'Facet 3',
    description: 'Low-SES individuals often have lower confidence in using technology, especially unfamiliar features. They may give up or blame themselves when something goes wrong.',
    features: ['🔠 Large Text toggle for readability', 'AI chatbot guides users in plain language', '"Get Help" button always visible', 'Clear error messages that don\'t blame the user', 'Simple one-click category filters'],
    color: '#5a2d82',
  },
  {
    icon: '🔒',
    title: 'Attitudes toward Privacy & Security',
    subtitle: 'Facet 4',
    description: 'Low-SES users are more likely to have experienced privacy violations and are more cautious about sharing personal information with technology.',
    features: ['🔐 JWT authentication — secure token-based login', '🔑 bcrypt password hashing — passwords never stored in plain text', '"No ID needed" tags — users know upfront what\'s required', 'No unnecessary personal data collected to browse resources', 'Transparent about what information is stored'],
    color: '#cc0000',
  },
  {
    icon: '⚠️',
    title: 'Attitudes toward Technology Risks',
    subtitle: 'Facet 5',
    description: 'Low-SES users have less time to waste on technology that fails or wastes their time. They avoid features that feel risky or uncertain.',
    features: ['Walk-in availability shown upfront — no wasted trips', 'Hours displayed clearly on every resource card', '"Open Now" / "Closed Now" status on real places', 'Call button on detail page — direct action, no guessing', '211 emergency fallback always mentioned in chatbot'],
    color: '#888',
  },
  {
    icon: '🤝',
    title: 'Perceived Control & Attitude toward Authority',
    subtitle: 'Facet 6',
    description: 'Low-SES users often feel they have less control over outcomes and are less likely to ask authority figures for help when things go wrong.',
    features: ['AI chatbot — non-judgmental help available 24/7', 'No login required to browse resources', 'Users can search and find help independently', 'Back button on all pages — always easy to undo', 'No ID required tags reduce fear of authority'],
    color: '#2c7a4b',
  },
];

const personas = [
  {
    name: '👤 Dav — Low-SES Persona',
    color: '#cc0000',
    description: 'Dav is 30, works full-time at a grocery store, and attends community college. Dav has low technology self-efficacy, relies on an older phone with unreliable internet, and is cautious about sharing personal information. Dav benefits most from Low-Bandwidth Mode, plain language descriptions, and the Spanish toggle.',
  },
  {
    name: '👤 Ash — Middle SES Persona',
    color: '#f4a116',
    description: 'Ash is between Dav and Fee — situationally affected by some but not all low-SES challenges. Ash benefits from clear labels, walk-in availability tags, and the AI chatbot for guidance.',
  },
  {
    name: '👤 Fee — High-SES Persona',
    color: '#2c7a4b',
    description: 'Fee has reliable technology access, high digital literacy, and is comfortable using new features. Fee benefits from the full resource cards, detail pages, real places search, and the admin dashboard.',
  },
];

function SESMagInfo() {
  const { largeText } = useLanguage();

  return (
    <div style={{ ...styles.container, fontSize: largeText ? '1.1rem' : '1rem' }}>
      <div style={styles.hero}>
        <div style={styles.heroTitle}>🔍 SESMag Principles in ResourceConnect</div>
        <div style={styles.heroSubtitle}>
          How this app is designed to be inclusive for users across all socioeconomic backgrounds
        </div>
      </div>

      <div style={styles.highlight}>
        <strong>What is SESMag?</strong> SocioEconomicMag (SESMag) is a usability inspection method for evaluating
        software's socioeconomic inclusivity. It uses research-based personas and six facets to identify
        "SES-inclusivity bugs" — ways software may exclude low-SES users. ResourceConnect was built
        with all six SESMag facets in mind.
      </div>

      <div style={styles.sectionTitle}>The 6 SESMag Facets & How We Address Them</div>

      {facets.map((facet, i) => (
        <div key={i} style={{ ...styles.card, borderLeftColor: facet.color }}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>{facet.icon}</span>
            <div>
              <div style={{ ...styles.cardTitle, color: facet.color }}>{facet.title}</div>
              <div style={styles.cardSubtitle}>{facet.subtitle}</div>
            </div>
          </div>
          <div style={styles.cardBody}>
            <p style={{ marginBottom: '0.8rem' }}>{facet.description}</p>
            <strong style={{ color: '#333' }}>How ResourceConnect addresses this:</strong>
            <div style={{ marginTop: '0.5rem' }}>
              {facet.features.map((f, j) => (
                <span key={j} style={{ ...styles.featureTag, borderColor: facet.color, color: facet.color, backgroundColor: '#f9f9f9' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div style={styles.sectionTitle}>The 3 SESMag Personas</div>

      {personas.map((persona, i) => (
        <div key={i} style={{ ...styles.personaCard, borderLeft: `5px solid ${persona.color}` }}>
          <div style={{ ...styles.personaName, color: persona.color }}>{persona.name}</div>
          <div style={styles.personaDesc}>{persona.description}</div>
        </div>
      ))}

      <div style={styles.sectionTitle}>Summary of All Features</div>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              '🐢 Low-Bandwidth Mode',
              '🇪🇸 English/Spanish Toggle',
              '🔠 Large Text Toggle',
              '💬 AI Chatbot in Plain Language',
              '🔐 JWT Authentication',
              '🔑 bcrypt Password Hashing',
              '👤 Admin/User Roles',
              '🏥 Real Places Search',
              '🗺️ Google Maps Integration',
              '✅ Walk-in Available Tags',
              '🪪 No ID Required Tags',
              '🕐 Hours Displayed Clearly',
              '📋 Plain Language Descriptions',
              '🔍 Category Filters',
              '🔎 Search Bar',
              '📞 Direct Call Button',
              '📍 Location-based Search',
              '🛡️ Admin Dashboard',
            ].map((feature, i) => (
              <span key={i} style={styles.featureTag}>{feature}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SESMagInfo;