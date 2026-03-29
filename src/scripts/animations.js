import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.config({ force3D: true })
ScrollTrigger.config({ limitCallbacks: true })

export function initHero() {
  gsap.from('.hero__label', {
    opacity: 0, y: 20, duration: 1, delay: 2.4, ease: 'power2.out'
  })
  gsap.from('.hero__title', {
    opacity: 0, y: 40, duration: 1.2, delay: 2.6, ease: 'power3.out'
  })
  gsap.from('.hero__subtitle', {
    opacity: 0, y: 30, duration: 1, delay: 2.9, ease: 'power2.out'
  })
  gsap.from('.hero__actions', {
    opacity: 0, y: 20, duration: 1, delay: 3.1, ease: 'power2.out'
  })
}

export function initTypewriter() {
  const words   = ['cuentan tu historia.', 'transforman tu vida.', 'definen tu estilo.']
  const target  = document.getElementById('heroTypewriter')
  let wordIndex = 0
  let charIndex = 0
  let deleting  = false

  if (!target) return

  setTimeout(() => typeLoop(), 3800)

  function typeLoop() {
    const current = words[wordIndex]
    if (!deleting) {
      target.textContent = current.slice(0, charIndex + 1)
      charIndex++
      if (charIndex === current.length) {
        setTimeout(() => { deleting = true; typeLoop() }, 2800)
        return
      }
    } else {
      target.textContent = current.slice(0, charIndex - 1)
      charIndex--
      if (charIndex === 0) {
        deleting  = false
        wordIndex = (wordIndex + 1) % words.length
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 90)
  }
}

export function initEsencia() {
  const img = document.querySelector('.esencia__image')
  if (img) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        img.classList.add('is-visible')
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(img)
  }

  gsap.from('.esencia__text-col > *', {
    scrollTrigger: { trigger: '.esencia', start: 'top 75%' },
    opacity: 0, x: 30, duration: 0.9, stagger: 0.15, ease: 'power2.out'
  })

  function animateCounter(el) {
    const val    = parseInt(el.getAttribute('data-val') ?? '0')
    const plus   = el.getAttribute('data-plus') === 'true'
    const suffix = el.getAttribute('data-suffix') ?? ''
    const obj    = { v: 0 }
    gsap.to(obj, {
      v: val, duration: 2, ease: 'power3.out',
      onUpdate() { el.textContent = (plus ? '+' : '') + Math.round(obj.v) + suffix },
      onComplete() { el.textContent = (plus ? '+' : '') + val + suffix }
    })
  }

  document.querySelectorAll('.esencia__ind-num').forEach(el => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { animateCounter(el); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(el)
  })
}

export function initServicios() {
  gsap.from('.srv__header > *', {
    scrollTrigger: { trigger: '.srv', start: 'top 75%' },
    opacity: 0, y: 20, duration: 0.8, stagger: 0.12, ease: 'power2.out'
  })
  gsap.from('.srv__card', {
    scrollTrigger: { trigger: '.srv__cards', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power2.out'
  })
}

export function initPortafolio() {
  gsap.from('.port__card', {
    scrollTrigger: { trigger: '.port__grid', start: 'top 80%' },
    opacity: 0, y: 30, duration: 0.8, stagger: 0.08, ease: 'power2.out'
  })
}

export function initContacto() {
  gsap.from('.contact__info > *', {
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    opacity: 0, x: -24, duration: 0.9, stagger: 0.12, ease: 'power2.out'
  })
  gsap.from('.contact__form-wrap', {
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    opacity: 0, y: 30, duration: 0.9, delay: 0.2, ease: 'power2.out'
  })
}

export function initParallax() {
  gsap.to('.hero__image', {
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true
    },
    y: 80, ease: 'none'
  })

  gsap.to('.esencia__image', {
    scrollTrigger: {
      trigger: '.esencia', start: 'top bottom', end: 'bottom top', scrub: true
    },
    y: 60, ease: 'none'
  })

  gsap.utils.toArray('.srv__card-img').forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img, start: 'top bottom', end: 'bottom top', scrub: true
      },
      y: 30, ease: 'none'
    })
  })
}