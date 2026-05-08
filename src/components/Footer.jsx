import { motion } from "framer-motion";

export function Footer() {
  const socials = [
    { name: "github", href: "#" },
    { name: "linkedin", href: "#" },
    { name: "twitter", href: "#" },
    { name: "email", href: "mailto:hello@example.com" },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div className="space-y-3">
          <h2 className="section-title mb-3">contact</h2>
          <p className="text-secondary lowercase text-[1.1rem] max-w-md">
            interested in working together? read my{" "}
            <a href="#" className="link-underline text-primary font-semibold">resume</a>{" "}
            or book a slot at{" "}
            <a href="#" className="link-underline text-primary font-semibold">cal.com</a>.
          </p>
        </div>
        
        <div className="flex gap-4 stagger-children">
          {socials.map(s => (
            <a 
              key={s.name}
              href={s.href} 
              className="px-4 py-2 rounded-full border border-secondary/20 font-mono text-sm lowercase text-secondary hover:border-accent hover:text-accent hover:bg-accent/5 hover:shadow-[0_0_15px_rgba(5,150,105,0.1)] transition-all duration-300"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
      
      <div className="text-sm font-mono text-secondary/40 flex flex-col sm:flex-row sm:justify-between items-center gap-4 lowercase pt-6 border-t border-secondary/10">
        <p>© {new Date().getFullYear()} mit licensed</p>
        <p className="flex items-center gap-2">
          built with
          <span className="inline-block animate-pulse text-accent">♥</span>
          by abhayraj
        </p>
      </div>
    </motion.footer>
  );
}
