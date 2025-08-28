export default function NewsletterSignup() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center mb-12 md:mb-32 px-4">
      <p className="text-center text-md md:text-lg mb-8 max-w-[20rem] md:max-w-[25rem] font-header">
        Subscribe for insider access to discover our new collections, exclusive
        events and more.
      </p>
      <form className="w-full flex flex-col flex-row items-center justify-center gap-2">
        <div className="border-b border-neutral-400 w-[15rem] md:w-[20rem] px-2.5 py-2.5 text-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="borderless-input bg-transparent w-full text-center transition text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-2 py-2 border-b border-neutral-400 text-neutral-800 text-sm tracking-wide hover:border-black transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
