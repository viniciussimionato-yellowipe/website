import Link from 'next/link';

/** 404 dentro de um idioma. Texto neutro porque o not-found não recebe params. */
export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-site py-24">
        <p className="eyebrow text-gold">404</p>
        <h1 className="mt-3 font-display text-[44px] font-semibold">
          Página não encontrada · Page not found
        </h1>
        <p className="mt-4 text-[17px] text-body">
          A página que procura não existe ou mudou de endereço.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/pt/" className="btn-navy">
            Yellowipe PT
          </Link>
          <Link href="/br/" className="btn-navy">
            Yellowipe BR
          </Link>
          <Link href="/en/" className="btn-navy">
            Yellowipe EN
          </Link>
        </div>
      </div>
    </section>
  );
}
