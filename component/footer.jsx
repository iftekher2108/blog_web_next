'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Blog</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              A modern, clean blog platform built with Next.js, Tailwind CSS, and DaisyUI for the best reading experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="link link-hover">Home</a></li>
              <li><a href="#" className="link link-hover">About</a></li>
              <li><a href="#" className="link link-hover">Articles</a></li>
              <li><a href="#" className="link link-hover">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="link link-hover">Technology</a></li>
              <li><a href="#" className="link link-hover">Design</a></li>
              <li><a href="#" className="link link-hover">Business</a></li>
              <li><a href="#" className="link link-hover">Tutorials</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="btn btn-sm btn-circle btn-ghost hover:btn-primary transition-all">
                f
              </a>
              <a href="#" className="btn btn-sm btn-circle btn-ghost hover:btn-primary transition-all">
                𝕏
              </a>
              <a href="#" className="btn btn-sm btn-circle btn-ghost hover:btn-primary transition-all">
                in
              </a>
              <a href="#" className="btn btn-sm btn-circle btn-ghost hover:btn-primary transition-all">
                ★
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-4"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
          <p>&copy; {currentYear} Blog. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="link link-hover">Privacy Policy</a>
            <a href="#" className="link link-hover">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
