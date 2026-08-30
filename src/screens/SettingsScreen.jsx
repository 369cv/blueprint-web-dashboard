import { useState } from 'react';
import { SettingsRow, Avatar, Button } from '../design-system/index.js';

const SETTINGS_INFO = {
  editProfile: { title: 'Edit profile', body: 'This would open a form to update your name, email, and profile photo, connected to your account backend.' },
  manageSub: { title: 'Manage subscription', body: 'This would open a billing portal to cancel, change plan, or update your payment method.' },
  upgradePlan: { title: 'Upgrade plan', body: 'This would show a plan comparison — Creator, Growth, and Scale — with upgrade or downgrade actions.' },
  restorePurchases: { title: 'Restore Purchases', body: 'This would re-sync purchases made in the mobile App Store back to your account.' },
  helpCenter: { title: 'Help Center', body: 'Guides on saving videos, writing scripts, generating avatars, and scheduling posts.' },
  faqs: { title: 'FAQs', body: 'Answers to the most common questions about billing, avatars, and content rights.' },
  mcp: { title: 'Blueprint MCP', body: 'Connect Blueprint to Claude or Codex so any AI agent can save videos, write scripts, and generate content on your behalf.' },
  featureRequests: { title: 'Feature requests', body: 'Vote on upcoming features or suggest your own — the team reviews requests weekly.' },
  promote: { title: 'Get paid to promote Blueprint', body: 'Join the affiliate program and earn a recurring commission for every creator you refer.' },
  contact: { title: 'Contact us', body: 'Reach the Blueprint team at support@blueprint.co — average response time is under 4 hours.' },
  terms: { title: 'Terms of Service', body: 'The legal terms governing your use of Blueprint.' },
  privacy: { title: 'Privacy Policy', body: 'How Blueprint collects, stores, and uses your data and saved content.' },
};

export default function SettingsScreen({ onSignOut, connectedAccounts }) {
  const accounts = connectedAccounts || [];
  const [infoKey, setInfoKey] = useState(null);
  const [deleteStep, setDeleteStep] = useState(null);
  const info = SETTINGS_INFO[infoKey];
  const open = (key) => setInfoKey(key);

  return (
    <div style={{ maxWidth: 640, position: 'relative' }}>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>SETTINGS</div>
      <div style={{ font: '800 40px/1.05 var(--font-sans)', marginBottom: 24 }}>
        Your <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>account</em>
      </div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>ACCOUNT</div>
      <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 20, borderBottom: '1px solid var(--color-border)' }}>
          <Avatar initial="S" size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '700 16px var(--font-sans)' }}>Savage</div>
            <div style={{ font: '400 13.5px var(--font-sans)', color: 'var(--color-text-secondary)' }}>baha@bahasavage.com</div>
          </div>
          <div style={{ padding: '4px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-gold-border)', color: 'var(--color-gold)', font: '700 11px var(--font-sans)' }}>PRO</div>
        </div>
        <SettingsRow icon="settings" title="Edit profile" subtitle="Name, email, and photo" onClick={() => open('editProfile')} />
        <SettingsRow icon="zap" title="Manage subscription" subtitle="Cancel, change plan, or update payment" onClick={() => open('manageSub')} />
      </div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>PLAN</div>
      <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, overflow: 'hidden' }}>
        <SettingsRow icon="zap" title="Upgrade plan" subtitle="Compare Creator, Growth and Scale" onClick={() => open('upgradePlan')} />
      </div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>INTEGRATIONS</div>
      <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, overflow: 'hidden' }}>
        {accounts.map(({ name, connected }, i) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: i < accounts.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: connected ? 'var(--color-success)' : 'var(--color-danger)' }} />
            <span style={{ flex: 1, font: '600 14px var(--font-sans)' }}>{name}</span>
            <span style={{ font: '600 12px var(--font-sans)', color: connected ? 'var(--color-success)' : 'var(--color-danger)' }}>{connected ? 'Connected' : 'Reconnect'}</span>
          </div>
        ))}
      </div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>SUPPORT</div>
      <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, overflow: 'hidden' }}>
        <SettingsRow icon="compass" title="Help Center" subtitle="Guides and walkthroughs" onClick={() => open('helpCenter')} />
        <SettingsRow icon="fileText" title="FAQs" onClick={() => open('faqs')} />
        <SettingsRow icon="zap" title="Blueprint MCP" subtitle="Connect to Claude or Codex" onClick={() => open('mcp')} />
        <SettingsRow icon="sparkles" title="Feature requests" subtitle="Vote on what we build next" onClick={() => open('featureRequests')} />
        <SettingsRow icon="trendingUp" title="Get paid to promote Blueprint" onClick={() => open('promote')} />
        <SettingsRow icon="bell" title="Contact us" onClick={() => open('contact')} />
      </div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>OTHER</div>
      <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <SettingsRow icon="fileText" title="Terms of Service" onClick={() => open('terms')} />
        <SettingsRow icon="lock" title="Privacy Policy" onClick={() => open('privacy')} />
        <SettingsRow icon="refreshCw" title="Restore Purchases" subtitle="Sync mobile App Store purchases" onClick={() => open('restorePurchases')} />
        <SettingsRow icon="chevronLeft" title="Sign out" onClick={onSignOut} />
        <SettingsRow icon="x" title="Delete account" subtitle="Permanently removes all data" danger onClick={() => setDeleteStep('confirm')} />
      </div>

      {info && (
        <div onClick={() => setInfoKey(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 400, background: '#fff', borderRadius: 20, padding: 28, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ font: '700 18px var(--font-sans)', marginBottom: 10 }}>{info.title}</div>
            <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 20 }}>{info.body}</div>
            <Button variant="secondary" onClick={() => setInfoKey(null)} style={{ width: '100%' }}>
              Close
            </Button>
          </div>
        </div>
      )}

      {deleteStep && (
        <div onClick={() => setDeleteStep(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 400, background: '#fff', borderRadius: 20, padding: 28, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
            {deleteStep === 'confirm' ? (
              <div>
                <div style={{ font: '700 18px var(--font-sans)', color: 'var(--color-danger)', marginBottom: 8 }}>Delete your account?</div>
                <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 20 }}>This permanently removes your scripts, saved videos, avatars, and voices. This can't be undone.</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="secondary" style={{ flex: 1 }} onClick={() => setDeleteStep(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" style={{ flex: 1 }} onClick={() => setDeleteStep('done')}>
                    Confirm
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', font: '700 18px var(--font-sans)' }}>✓</div>
                <div style={{ font: '700 17px var(--font-sans)', marginBottom: 18 }}>Account deleted</div>
                <Button variant="secondary" style={{ width: '100%' }} onClick={() => setDeleteStep(null)}>
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
