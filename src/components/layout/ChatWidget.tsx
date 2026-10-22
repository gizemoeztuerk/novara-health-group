import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/LanguageContext';
import { MessageCircle, Send, Sparkles } from 'lucide-react';

type ChatMsg = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  at: number;
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatWidget() {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>(() => [
    {
      id: makeId(),
      role: 'assistant',
      text: tr(
        'Hi! I am a fictional FAQ demo, not a live support agent. Please do not share personal or insurance information.',
        'Hallo! Ich bin eine fiktive FAQ-Demo, kein echter Support. Bitte keine persönlichen Daten oder Versicherungsdaten eingeben.'
      ),
      at: Date.now(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const canned = useMemo(
    () => [
      {
        match: ['claim', 'invoice', 'reimbursement', 'rechnung', 'leistung'],
        answer: tr(
          'The demo claim form is under Service → Claims → New. No files are submitted to a backend; use fictional data only.',
          'Das Demo-Formular finden Sie unter Service → Leistungen → Neu. Es werden keine Dateien an ein Backend übertragen; bitte nur Testdaten nutzen.'
        ),
      },
      {
        match: ['certificate', 'bescheinigung', 'mitglied', 'beitrag'],
        answer: tr(
          'A demonstration of certificate requests is available under Service → Forms & Requests. No request is actually transmitted.',
          'Eine Demo zur Bescheinigungsanfrage finden Sie unter Service → Formulare & Anträge. Es wird nichts tatsächlich übermittelt.'
        ),
      },
      {
        match: ['cancel', 'kündig', 'termination'],
        answer: tr(
          'You can explore the demo cancellation flow under Service → Personal Area. No actual cancellation will be processed.',
          'Den Demo-Kündigungsablauf finden Sie unter Service → Persönlicher Bereich. Eine echte Kündigung wird nicht bearbeitet.'
        ),
      },
    ],
    [tr]
  );

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('novara-open-chat', onOpen);
    return () => window.removeEventListener('novara-open-chat', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
    return () => window.clearTimeout(t);
  }, [open, messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    const userMsg: ChatMsg = { id: makeId(), role: 'user', text, at: Date.now() };
    setMessages((m) => [...m, userMsg]);

    // simple mock “routing”
    const lower = text.toLowerCase();
    const found = canned.find((c) => c.match.some((k) => lower.includes(k)));
    const replyText =
      found?.answer ??
      tr(
        'This is a scripted FAQ demo. Try asking about forms, documents, or claims. Do not enter personal information.',
        'Dies ist eine FAQ-Demo mit festen Antworten. Fragen Sie nach Formularen, Dokumenten oder Leistungen. Bitte keine persönlichen Daten eingeben.'
      );

    window.setTimeout(() => {
      const botMsg: ChatMsg = { id: makeId(), role: 'assistant', text: replyText, at: Date.now() };
      setMessages((m) => [...m, botMsg]);
    }, 450);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          className="h-12 rounded-full shadow-soft"
          onClick={() => setOpen(true)}
          aria-label={tr('Open chat', 'Chat öffnen')}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {tr('Chat', 'Chat')}
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <div className="flex h-full flex-col">
            <div className="border-b p-6">
              <SheetHeader>
                <div className="flex items-center justify-between gap-3">
                  <SheetTitle className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {tr('NOVARA FAQ Demo', 'NOVARA FAQ-Demo')}
                  </SheetTitle>
                  <Badge variant="secondary" className="w-fit mx-4">
                    {tr('Prototype', 'Prototyp')}
                  </Badge>
                </div>
                <SheetDescription>
                  {tr('We answer typical service questions and guide you to the right forms.', 'Wir beantworten typische Service-Fragen und leiten zu passenden Formularen.')}
                </SheetDescription>
              </SheetHeader>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                    m.role === 'user'
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'bg-muted/40 text-foreground'
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={tr('Type your message…', 'Nachricht schreiben…')}
                />
                <Button type="submit" className="shrink-0" aria-label={tr('Send message', 'Nachricht senden')}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">
                {tr('Tip: Ask about certificates, claims, cancellations, or forms.', 'Tipp: Fragen Sie nach Bescheinigungen, Leistung, Kündigung oder Formularen.')}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
