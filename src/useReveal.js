import { useEffect } from 'react'

// Fades sections in as they scroll into view
export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.12 }
    )
    const watch = (root) => root.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    watch(document)
    // Lazy-loaded sections mount later — pick up their .reveal elements too
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.nodeType !== 1) return
      if (n.matches('.reveal:not(.in)')) io.observe(n)
      watch(n)
    })))
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
