const WHATSAPP_NUMBER = '393384671019';

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.look-card');
const strip = document.getElementById('looks-strip');
const prevBtn = document.getElementById('look-prev');
const nextBtn = document.getElementById('look-next');
const toast = document.getElementById('toast');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    cards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
    });

    strip.scrollTo({ left: 0, behavior: 'smooth' });
  });
});

document.querySelectorAll('.choose-look').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.look-card');
    const look = card.dataset.look;
    const message = `Ciao! Ho visto il vostro lookbook e mi piace il ${look}. Vorrei capire se è adatto a me e avere informazioni per un appuntamento.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1600);
    window.open(url, '_blank', 'noopener');
  });
});

const scrollAmount = () => Math.min(strip.clientWidth * 0.88, 420);
prevBtn?.addEventListener('click', () => strip.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
nextBtn?.addEventListener('click', () => strip.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
