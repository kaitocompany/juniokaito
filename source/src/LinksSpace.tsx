"use client";

import {
  ArrowRight,
  ExternalLink,
  FileText,
  Lightbulb,
  LockKeyhole,
  MessageCircle,
  Users,
  X,
} from "lucide-react";
import type { ElementType, PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./links.module.css";

type Body = { x:number; y:number; width:number; height:number };
type Mode = "social" | "shop";
type ShopTab = "created" | "recommended";
type HintKind = "social" | ShopTab;
type DetailTab = "about" | "prices" | "receive";
type SpaceItem = {
  label:string;
  href:string;
  Icon:ElementType;
  tone:string;
  x:number;
  y:number;
  kind:"social" | "product";
  eyebrow?:string;
  action?:string;
};

const socialItems: SpaceItem[] = [];

const createdItems: SpaceItem[] = [
  { kind:"product", label:"Sessão de direcionamento", eyebrow:"vendas online", action:"saiba mais", href:"https://app.kaitocompany.com/", Icon:Lightbulb, tone:"direction", x:.5, y:.53 },
];

const recommendedItems: SpaceItem[] = [];

const clamp = (n:number, min:number, max:number) => Math.max(min, Math.min(max, n));

function ProductDetailsModal({ tab, setTab, onClose }: { tab:DetailTab; setTab:(tab:DetailTab)=>void; onClose:()=>void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event:KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return <div className={styles.modalBackdrop} onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}>
    <section className={styles.productModal} role="dialog" aria-modal="true" aria-labelledby="direction-title">
      <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Fechar detalhes"><X /></button>
      <header className={styles.modalHeader}>
        <span className={styles.modalIcon}><Lightbulb /></span>
        <div>
          <span className={styles.modalBadge}>Vendas online</span>
          <h2 id="direction-title">Sessão de direcionamento</h2>
        </div>
      </header>

      <p className={styles.modalScript}>Entender, direcionar e executar</p>

      <div className={styles.detailTabs} role="tablist" aria-label="Detalhes da sessão">
        <button type="button" role="tab" aria-selected={tab==="about"} className={tab==="about"?styles.detailTabActive:""} onClick={()=>setTab("about")}>Sobre</button>
        <button type="button" role="tab" aria-selected={tab==="prices"} className={tab==="prices"?styles.detailTabActive:""} onClick={()=>setTab("prices")}>Preços</button>
        <button type="button" role="tab" aria-selected={tab==="receive"} className={tab==="receive"?styles.detailTabActive:""} onClick={()=>setTab("receive")}>O que você recebe</button>
      </div>

      <div className={styles.detailPanel} role="tabpanel">
        {tab === "about" && <div className={styles.guidedSteps}>
          <article className={`${styles.guidedCard} ${styles.compactAboutCard}`}>
            <div className={styles.stepCopy}>
              <div className={styles.compactCardHeading}>
                <h3>Conversa inicial</h3>
                <span className={`${styles.stepPrice} ${styles.freePrice}`}>Grátis</span>
              </div>
              <p>Uma conversa rápida e objetiva para entender seu momento e o que você precisa.</p>
              <small className={styles.stepHighlight}><MessageCircle /> Inicie uma conversa no chat.</small>
            </div>
          </article>
          <a className={styles.modalCta} href="https://app.kaitocompany.com/" target="_blank" rel="noreferrer">Iniciar conversa grátis <ArrowRight /></a>
          <p className={styles.modalSecurity}><LockKeyhole /> Depois você decide se quer avançar.</p>
        </div>}

        {tab === "prices" && <div className={styles.priceList}>
          <article className={`${styles.stepCard} ${styles.priceCard}`}>
            <span className={styles.stepNumber}>1</span>
            <div className={styles.stepCopy}><h3>Conversa inicial</h3></div>
            <span className={`${styles.stepPrice} ${styles.freePrice}`}>Grátis</span>
          </article>
          <article className={`${styles.stepCard} ${styles.priceCard}`}>
            <span className={styles.stepNumber}>2</span>
            <div className={styles.stepCopy}><h3>Sessão de direcionamento</h3></div>
            <span className={styles.stepPrice}>R$ 79</span>
          </article>
          <article className={`${styles.stepCard} ${styles.priceCard}`}>
            <span className={styles.stepNumber}>3</span>
            <div className={styles.stepCopy}>
              <h3>Suporte na execução</h3>
              <p>Personalizado para sua necessidade.</p>
            </div>
            <span className={`${styles.stepPrice} ${styles.rangePrice}`}>Entre R$ 100 e R$ 2.600</span>
          </article>
        </div>}

        {tab === "receive" && <div className={styles.receiveGroups}>
          <section className={`${styles.receiveGroup} ${styles.receiveFree}`}>
            <header className={styles.receiveGroupHeader}>
              <span className={styles.receiveLabel}>Grátis</span>
              <small>Primeiro contato</small>
            </header>
            <div className={styles.receiveItem}>
              <MessageCircle />
              <div>
                <strong>Conversa inicial</strong>
                <span>Uma conversa rápida para entender seu momento.</span>
              </div>
            </div>
          </section>

          <section className={`${styles.receiveGroup} ${styles.receivePaid}`}>
            <header className={styles.receiveGroupHeader}>
              <span className={styles.receiveLabel}>Pago</span>
              <small>Ao decidir avançar</small>
            </header>
            <div className={styles.receiveItem}>
              <Lightbulb />
              <div>
                <strong>Sessão de direcionamento</strong>
                <span>Uma sessão focada na sua realidade.</span>
              </div>
            </div>
            <div className={styles.receiveItem}>
              <FileText />
              <div>
                <strong>Documento personalizado</strong>
                <span>Passo a passo definido para você.</span>
              </div>
            </div>
            <div className={styles.receiveItem}>
              <Users />
              <div>
                <strong>Suporte na execução</strong>
                <span>Opção de contratar acompanhamento personalizado.</span>
              </div>
            </div>
          </section>
        </div>}
      </div>

    </section>
  </div>;
}

export default function LinksSpace() {
  const arena = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLAnchorElement|null)[]>([]);
  const bodies = useRef<Body[]>([]);
  const drag = useRef({ index:-1, dx:0, dy:0, startX:0, startY:0, moved:false });
  const suppressClick = useRef(new Set<number>());
  const [mode, setMode] = useState<Mode>("social");
  const [shopTab, setShopTab] = useState<ShopTab>("created");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailTab, setDetailTab] = useState<DetailTab>("about");
  const [hintVisible, setHintVisible] = useState(true);
  const [hintToken, setHintToken] = useState(0);
  const [hintKind, setHintKind] = useState<HintKind>("social");
  const hintTimer = useRef<number | null>(null);

  const items = useMemo(() => {
    if (mode === "social") return socialItems;
    return shopTab === "created" ? createdItems : recommendedItems;
  }, [mode, shopTab]);

  const limits = useCallback((box:DOMRect) => {
    const isMobile = box.width <= 720;
    return {
      isMobile,
      top:isMobile ? (mode === "shop" ? 132 : 34) : (mode === "shop" ? 142 : 38),
      bottom:mode === "social" ? 220 : (isMobile ? 74 : 78),
    };
  }, [mode]);

  const arrange = useCallback(() => {
    const box = arena.current?.getBoundingClientRect();
    if (!box) return;
    const { isMobile, top, bottom } = limits(box);
    const isProduct = mode === "shop";

    bodies.current = items.map((item, i) => {
      const width = nodes.current[i]?.offsetWidth || (isProduct ? (isMobile ? 146 : 184) : (isMobile ? 96 : 126));
      const height = nodes.current[i]?.offsetHeight || (isProduct ? (isMobile ? 158 : 188) : (isMobile ? 108 : 142));
      let x = box.width * item.x;
      let y = box.height * item.y;

      if (isProduct && items.length === 1) {
        x = (box.width-width)/2;
        y = top + Math.max(24, (box.height-top-bottom-height)/2);
      } else if (isMobile && isProduct) {
        x = i%2 === 0 ? 18 : box.width-width-18;
        y = top + Math.min(62, Math.max(24, (box.height-top-bottom-height)/3));
      } else if (isMobile) {
        x = i%2 === 0 ? 24 : box.width-width-24;
        const rows = Math.max(0, box.height-top-bottom-height);
        y = top + Math.floor(i/2) * rows/2;
      }

      return {
        x:clamp(x, 6, box.width-width-6),
        y:clamp(y, top, box.height-height-bottom),
        width,
        height,
      };
    });

    bodies.current.forEach((body,i) => {
      const node=nodes.current[i];
      if(node) node.style.transform=`translate3d(${body.x}px,${body.y}px,0)`;
    });
  }, [items, limits, mode]);

  useEffect(() => {
    hintTimer.current = window.setTimeout(() => setHintVisible(false), 30000);
    return () => {
      if (hintTimer.current !== null) window.clearTimeout(hintTimer.current);
    };
  }, []);

  useEffect(() => {
    nodes.current = nodes.current.slice(0, items.length);
    const first = requestAnimationFrame(arrange);
    const resize = () => arrange();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(first); window.removeEventListener("resize", resize); };
  }, [arrange, items.length]);

  const down = (e:PointerEvent<HTMLAnchorElement>, index:number) => {
    const body=bodies.current[index], box=arena.current?.getBoundingClientRect();
    if(!body||!box) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current={index,dx:e.clientX-box.left-body.x,dy:e.clientY-box.top-body.y,startX:e.clientX,startY:e.clientY,moved:false};
    e.currentTarget.dataset.dragging="true";
  };

  const move = (e:PointerEvent<HTMLAnchorElement>, index:number) => {
    if(drag.current.index!==index) return;
    const body=bodies.current[index], box=arena.current?.getBoundingClientRect();
    if(!body||!box) return;
    const { top, bottom } = limits(box);
    if(Math.hypot(e.clientX-drag.current.startX,e.clientY-drag.current.startY)>4) drag.current.moved=true;
    body.x=clamp(e.clientX-box.left-drag.current.dx,5,box.width-body.width-5);
    body.y=clamp(e.clientY-box.top-drag.current.dy,top,box.height-body.height-bottom);
    const node=nodes.current[index];
    if(node) node.style.transform=`translate3d(${body.x}px,${body.y}px,0)`;
  };

  const up = (e:PointerEvent<HTMLAnchorElement>, index:number) => {
    if(drag.current.index!==index) return;
    if(drag.current.moved) suppressClick.current.add(index);
    delete e.currentTarget.dataset.dragging;
    drag.current.index=-1;
  };

  const showHint = (kind:HintKind) => {
    setHintKind(kind);
    setHintVisible(true);
    setHintToken(current => current + 1);
    if (hintTimer.current !== null) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHintVisible(false), 30000);
  };

  const openShop = () => {
    setMode("shop");
    showHint(shopTab);
  };

  const openSocial = () => {
    setMode("social");
    showHint("social");
  };

  return <main className={styles.page}>
    <div className={styles.grain} aria-hidden="true" />

    {mode === "shop" && <section className={styles.intro} aria-label="Loja de Junior Kaito">
      <div className={styles.shopSwitch} role="tablist" aria-label="Conteúdo da loja">
        <button type="button" role="tab" aria-selected={shopTab === "created"} className={shopTab === "created" ? styles.selected : ""} onClick={()=>{setShopTab("created");showHint("created")}}>Criei</button>
        <button type="button" role="tab" aria-selected={shopTab === "recommended"} className={shopTab === "recommended" ? styles.selected : ""} onClick={()=>{setShopTab("recommended");showHint("recommended")}}>Recomendo</button>
      </div>
    </section>}

    <div className={styles.arena} ref={arena} aria-label={mode === "social" ? "Redes sociais de Junior Kaito" : "Loja de Junior Kaito"}>
      {mode === "shop" && <span className={`${styles.doodle} ${styles.d1}`} aria-hidden="true">✦</span>}
      {items.map((item,i) => {
        const {label,href,Icon,tone}=item;
        const external=href.startsWith("http");
        return <a
          key={`${mode}-${shopTab}-${label}`}
          href={href}
          target={item.kind === "social" && external?"_blank":undefined}
          rel={item.kind === "social" && external?"noreferrer":undefined}
          ref={node=>{nodes.current[i]=node}}
          draggable={false}
          className={`${styles.card} ${item.kind === "product" ? styles.productCard : styles.socialCard} ${styles[tone]}`}
          onPointerDown={e=>down(e,i)}
          onPointerMove={e=>move(e,i)}
          onPointerUp={e=>up(e,i)}
          onPointerCancel={e=>up(e,i)}
          onClick={e=>{
            if(suppressClick.current.has(i)){e.preventDefault();suppressClick.current.delete(i);return;}
            if(item.kind === "product"){e.preventDefault();setDetailTab("about");setDetailsOpen(true);}
          }}
          aria-label={`${label} — arraste ou toque para ${item.kind === "product" ? "ver detalhes" : "abrir"}`}>
          {item.kind === "social" ? <span className={styles.socialFloat} style={{animationDelay:`-${i * .55}s`}}>
            <span className={styles.appIcon}><Icon/></span>
            <strong>@juniokaito</strong>
          </span> : <>
            <span className={styles.productVisual}><Icon/></span>
            <span className={styles.eyebrow}>{item.eyebrow}</span>
            <strong>{label}</strong>
            <span className={styles.productAction}>{item.action}<ExternalLink/></span>
          </>}
        </a>;
      })}
    </div>

    {mode === "social" && hintVisible && <a
      key={hintToken}
      className={styles.followBalloon}
      href="whatsapp://channel/0029Vb71RPC8vd1UfyhnBz0o"
      aria-label="Seguir @juniokaito no canal do WhatsApp">
      <span>Em todas as redes</span>
      <strong>@juniokaito</strong>
      <span className={styles.followAction}>Seguir no WhatsApp</span>
    </a>}

    <nav className={styles.modeSwitch} aria-label="Alternar entre Início e Loja">
      {mode === "shop" && hintVisible && <div key={hintToken} className={styles.shopHint} role="status">
        <Lightbulb aria-hidden="true" />
        <span>{hintKind === "created"
          ? "Conheça meu serviço de vendas online. Toque no card para ver os detalhes e preços."
          : "Aqui entram produtos e serviços que eu realmente recomendo. Novas indicações aparecem quando houver algo que vale a pena."}</span>
      </div>}
      <button type="button" className={mode === "social" ? styles.selected : ""} aria-pressed={mode === "social"} onClick={openSocial}>Início</button>
      <button type="button" className={mode === "shop" ? styles.selected : ""} aria-pressed={mode === "shop"} onClick={openShop}>Loja</button>
    </nav>
    <p className={styles.locationIdentity}>São Paulo, SP</p>
    {detailsOpen && <ProductDetailsModal tab={detailTab} setTab={setDetailTab} onClose={()=>setDetailsOpen(false)} />}
  </main>;
}
