export default function FullWidthTextSection() {
  return (
    <section
      className="w-full bg-black bg-cover bg-center py-32 flex items-center justify-center"
      style={{ backgroundImage: "url(/images/sky-bg.jpg)" }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center px-4">
        <div className="text-white text-sm uppercase tracking-wider mb-8">
          Meet NINE CARATS
        </div>
        <h2 className="text-white text-2xl md:text-4xl leading-tight mb-10">
          We are pioneering
          <br />
          <span className="italic font-normal">
            sustainable diamond jewelry
          </span>
          <br />
          with exceptional craftsmanship
        </h2>
        <a
          href="#"
          className="mt-2 px-2 py-2 border-b border-neutral-400 text-white text-sm tracking-wide hover:border-white transition"
        >
          Read our story
        </a>
      </div>
    </section>
  );
}
