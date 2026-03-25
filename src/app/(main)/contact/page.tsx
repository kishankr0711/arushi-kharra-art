import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-stone-900">Contact</h1>
          <p className="mt-4 text-stone-600">
            Interested in a piece? Get in touch.
          </p>
        </div>

        <form className="mt-12 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
            />
          </div>
          <Button type="submit" variant="art" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}