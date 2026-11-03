import type { CSSProperties, ReactNode } from 'react';
import type { Model } from '@/content/schema';
import { BrandTree } from './BrandTree';

/**
 * Ilustração V4 do topo da página de modelo (docs/design/modelo-v2.dc.html):
 * quem trabalha (Yellowipe) → o trabalho → o resultado (a empresa cliente).
 * Só CSS: o ciclo de 9 s repete-se sozinho; com movimento reduzido mostra logo o
 * estado final. Estilos em app/model-page.css (.mv-stage).
 */
type Viz = Model['page']['pt']['viz'];
type Props = {
  viz: Viz;
  label: string;
  texts: { yellowipe: string; client: string };
};

export function ModelViz({ viz, label, texts }: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex w-full max-w-[500px] justify-end justify-self-end max-[960px]:justify-center max-[960px]:justify-self-center"
    >
      <div className="mv-stage">
        <div className="mv-in">
          <div className="vz-legend absolute top-3.5 right-[18px] z-[6]" aria-hidden="true">
            <span>
              <i className="lg-y" />
              {texts.yellowipe}
            </span>
            <span>
              <i className="lg-c" />
              {texts.client}
            </span>
          </div>
          <Scene viz={viz} client={texts.client} />
        </div>
      </div>
    </div>
  );
}

const n = (i: number) => ({ '--n': i }) as CSSProperties;

function Scene({ viz, client }: { viz: Viz; client: string }) {
  const actor = (status: ReactNode) => (
    <div className="d-actor">
      <BrandTree className="yt" />
      <span className="d-tx">
        <b>{viz.actor}</b>
        <small>{viz.actorNote}</small>
      </span>
      {status}
    </div>
  );
  const out = (icon: ReactNode) => (
    <div className="d-out">
      <span className="d-out-bg" aria-hidden="true" />
      <span className="d-ok-k">{client}</span>
      <div className="d-out-g">{viz.waiting}</div>
      <div className="d-out-d">
        {icon}
        <span className="d-tx">
          <b>{viz.doneTitle}</b>
          <small>{viz.doneNote}</small>
        </span>
      </div>
      <BrandTree className="yt yt-grow yt-out" />
    </div>
  );

  if (viz.scene === 'contrate') {
    const [chosen] = viz.candidates;
    return (
      <div className="d d-c" aria-hidden="true">
        {actor(
          <span className="d-st">
            <span className="d-st-a">
              <span className="typing">
                <i />
                <i />
                <i />
              </span>
              {viz.working}
            </span>
            <span className="d-st-b">{viz.ready}</span>
          </span>,
        )}
        <span className="d-wire d-w1">
          <i className="d-pk" />
        </span>
        <div className="d-work">
          <div className="d-wh">
            <span className="d-k">{viz.job}</span>
            <span className="d-steps">
              <span className="d-sl">
                <i />
              </span>
              {viz.stages.map((s, i) => (
                <span key={s} className="d-sd" style={n(i)}>
                  {s}
                </span>
              ))}
            </span>
          </div>
          <div className="d-rows">
            {viz.candidates.map((c, i) => (
              <div key={c.initials} className={`d-row d-r${i + 1}`}>
                {i === 0 && <span className="d-hl" aria-hidden="true" />}
                <span className="av av-c">{c.initials}</span>
                <span className="d-tx">
                  <b>{c.name}</b>
                  <small>{c.meta}</small>
                </span>
                <span className={i === 0 ? 'd-pill d-pill-w' : 'd-pill'}>{c.stage}</span>
              </div>
            ))}
          </div>
        </div>
        <span className="d-wire d-w2">
          <i className="d-pk" />
        </span>
        <span className="av av-c d-fly d-fly-c">{chosen!.initials}</span>
        {out(<span className="av av-c av-ok">{chosen!.initials}</span>)}
      </div>
    );
  }

  if (viz.scene === 'reforce') {
    return (
      <div className="d d-r" aria-hidden="true">
        {actor(
          <span className="d-st d-st-av">
            {viz.consultants.map((c, i) => (
              <span key={c} className={`av av-y d-src d-src-${i + 1}`}>
                {c}
              </span>
            ))}
          </span>,
        )}
        <span className="d-wire d-w1">
          <i className="d-pk" />
        </span>
        <div className="d-work">
          <div className="d-wh">
            <span className="d-k">{viz.team}</span>
            <span className="d-k d-k-r">{viz.sprint}</span>
          </div>
          <div className="d-team">
            {viz.members.map((m) => (
              <span key={m} className="av av-c">
                {m}
              </span>
            ))}
            <span className="d-slot d-slot-1" />
            <span className="d-slot d-slot-2" />
          </div>
          <div className="d-capr">
            <span className="d-k">{viz.capacity}</span>
            <span className="d-capv">
              <span className="c1">60%</span>
              <span className="c2">80%</span>
              <span className="c3">100%</span>
            </span>
          </div>
          <div className="d-seg">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} />
            ))}
            <i className="y y1" />
            <i className="y y1" />
            <i className="y y2" />
            <i className="y y2" />
          </div>
          <div className="d-thr">
            <span className="d-k">{viz.deliveries}</span>
            <span className="d-bars">
              {[34, 38, 36].map((h, i) => (
                <i key={i} style={{ '--h': `${h}%` } as CSSProperties} />
              ))}
              {[58, 74, 88].map((h, i) => (
                <i key={h} className="g" style={{ '--h': `${h}%`, '--n': i } as CSSProperties} />
              ))}
            </span>
          </div>
        </div>
        <span className="d-wire d-w2">
          <i className="d-pk" />
        </span>
        {viz.consultants.map((c, i) => (
          <span key={c} className={`av av-y d-fly d-fly-r${i + 1}`}>
            {c}
          </span>
        ))}
        {out(<span className="d-big">100%</span>)}
      </div>
    );
  }

  return (
    <div className="d d-b" aria-hidden="true">
      {actor(
        <span className="d-st d-st-av">
          <span className="av av-y av-pm">{viz.lead}</span>
          <span className="d-mini">
            {viz.disciplines.map((d) => (
              <span key={d.initials} className="av av-y av-xs">
                {d.initials}
              </span>
            ))}
          </span>
        </span>,
      )}
      <span className="d-wire d-w1">
        <i className="d-pk" />
      </span>
      <div className="d-work">
        <div className="d-wh">
          <span className="d-k">{viz.product}</span>
          <span className="d-spr">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="d-bgrid">
          <div className="d-disc">
            {viz.disciplines.map((d, i) => (
              <span key={d.initials} className="d-di" style={n(i)}>
                <span className="av av-y av-xs">{d.initials}</span>
                {d.label}
              </span>
            ))}
          </div>
          <div className="d-win">
            <div className="d-wbar">
              <i />
              <i />
              <i />
              <span className="d-live">{viz.live}</span>
            </div>
            <div className="d-wcv">
              <span className="d-bk d-bk-nav" />
              <span className="d-bk d-bk-hero">
                <i className="d-data" />
              </span>
              {[0, 1, 2].map((i) => (
                <span key={i} className="d-bk d-bk-c">
                  <i className="d-data" />
                  <b className="d-q">✓</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="d-wire d-w2">
        <i className="d-pk d-pk-sq" />
      </span>
      {out(<span className="d-prod" />)}
    </div>
  );
}
