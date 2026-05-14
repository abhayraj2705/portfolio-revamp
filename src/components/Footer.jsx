import { motion } from "framer-motion";

export function Footer() {
  const socials = [
    { name: "github", href: "https://github.com/abhayraj2705" },
    { name: "linkedin", href: "https://linkedin.com/in/abhayraj-b" },
    { name: "email", href: "mailto:abhayraj27052005@gmail.com" },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-14">
        <div>
          <h2 className="section-title mb-4">let's talk</h2>
          <p className="text-primary/80 lowercase text-[1.08rem] max-w-sm leading-relaxed">
            building something interesting? reach out at{" "}
            <a href="mailto:abhayraj27052005@gmail.com" className="link-underline text-primary font-medium">email</a>{" "}
            or connect on{" "}
            <a href="https://linkedin.com/in/abhayraj-b" target="_blank" rel="noreferrer" className="link-underline text-primary font-medium">linkedin</a>.
          </p>
          <p className="text-secondary/40 text-xs font-mono lowercase mt-3 tracking-wide">
            +91 78029 14425
          </p>
        </div>
        
        <div className="flex gap-2.5">
          {socials.map((s, i) => (
            <motion.a 
              key={s.name}
              href={s.href}
              target={s.name !== "email" ? "_blank" : undefined}
              rel={s.name !== "email" ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-full border border-secondary/15 font-mono text-xs lowercase text-secondary/70 hover:border-accent hover:text-accent hover:bg-accent/[0.04] transition-all duration-300"
            >
              {s.name}
            </motion.a>
          ))}
        </div>
      </div>
      
      <div className="text-[11px] font-mono text-secondary/30 flex flex-col sm:flex-row sm:justify-between items-center gap-3 lowercase pt-6 border-t border-secondary/8 tracking-wide">
        <p>© {new Date().getFullYear()} abhayraj b</p>
        <p className="flex items-center gap-1.5">
          built with
          <span className="inline-block animate-pulse text-accent/60">♥</span>
          in pune
        </p>
      </div>
    </motion.footer>
  );
}
